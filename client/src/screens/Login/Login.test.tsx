import React from 'react';
import { render, RenderResult, functions, fireEvent, screen, waitFor, act } from '../../utils/test-utils';
import { Provider } from 'react-redux';
//import { store } from '../../app/store';
import userSessionReducer from '../../features/userSession/userSessionSlice';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import handlers from './Handlers';

import Login from './index';
import { configureStore } from '@reduxjs/toolkit';

let component: RenderResult;

const store = configureStore({
    reducer: { userSession: userSessionReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

const server = setupServer(...handlers)

describe("Login Test Suite", () => {
    beforeAll(() => server.listen({
        onUnhandledRequest: ({ headers, method, url }) => {
            if (headers.get("User-Agent") !== "supertest") {
                throw new Error(`Unhandled ${method} request to ${url}`);
            }
        },
    }));

    beforeEach(() => {
        act(() => {
            component = render(
                <Provider store={store}>
                    <Login />
                </Provider>
            )
        });

        server.resetHandlers()
    });

    afterAll(() => server.close())

    test('It must render the component correcly', () => {
        const { asFragment } = component;
        expect(asFragment()).toMatchSnapshot();
    })

    test('It must display basic login components', () => {
        const { getByText } = component;

        expect(getByText(/Username/i)).toBeInTheDocument();
        expect(getByText(/Password/i)).toBeInTheDocument();
        expect(getByText(/Login/i)).toBeInTheDocument();
    });


    test('It must respond "E-mail cannot be blank." when email is blank.', async () => {

        functions.writeInInputFoundByPlaceHolder(null, /Username/i, "");
        functions.writeInInputFoundByPlaceHolder(null, /Password/i, "admin2807");

        await act(() => {
            fireEvent.click(screen.getByText(/Login/i));
        });

        await waitFor(() => {
            expect(screen.getByText("E-mail cannot be blank.")).toBeInTheDocument();
        });
    });

    test('It must respond "E-mail is not valid" when email is invalid.', async () => {

        functions.writeInInputFoundByPlaceHolder(null, /Username/i, "existingadmin");
        functions.writeInInputFoundByPlaceHolder(null, /Password/i, "admin2807");

        fireEvent.click(screen.getByText(/Login/i));

        await waitFor(() => {
            expect(screen.getByText("E-mail is not valid.")).toBeInTheDocument();
        });
    });

    test('It should respond "Password cannot be blank" when password is blank.', async () => {

        functions.writeInInputFoundByPlaceHolder(null, /Username/i, "existingadmin@test.com");
        functions.writeInInputFoundByPlaceHolder(null, /Password/i, "");

        fireEvent.click(screen.getByText(/Login/i));

        await waitFor(() => {
            //verify if validation message is shown
            expect(screen.getByText("Password cannot be blank.")).toBeInTheDocument();
        });
    });

    test('It should respond "Password length must be atleast 8 characters." when password is invalid', async () => {

        functions.writeInInputFoundByPlaceHolder(null, /Username/i, "existingadmin@test.com");
        functions.writeInInputFoundByPlaceHolder(null, /Password/i, "admin");

        fireEvent.click(screen.getByText(/Login/i));

        await waitFor(() => {
            //verify if validation message is shown
            expect(screen.getByText("Password length must be atleast 8 characters.")).toBeInTheDocument();
        });
    });

    test('It should respond "Invalid Username or Password." when password is invalid', async () => {

        functions.writeInInputFoundByPlaceHolder(null, /Username/i, "existingadmin@test.com");
        functions.writeInInputFoundByPlaceHolder(null, /Password/i, "badPass");

        fireEvent.click(screen.getByText(/Login/i));

        await waitFor(() => {
            //verify if validation message is shown
            expect(screen.getByText("Invalid Username or Password.")).toBeInTheDocument();
        });
    });
});