import React from 'react';
import { render, RenderResult, functions, fireEvent, screen, waitFor } from '../../utils/test-utils';
import { Provider } from 'react-redux';
//import { store } from '../../app/store';
import userSessionReducer, { initialState } from '../../features/userSession/userSessionSlice';
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import Login from './index';
import { configureStore } from '@reduxjs/toolkit';


let component: RenderResult;

//const preloadedState: any = initialState;

const store = configureStore({ reducer: { userSession: userSessionReducer } });

export const handlers = [
    rest.post('/api/auth/login', (req, res, ctx) => {
        return res(ctx.json({
            statusCode: "10000",
            message: "Success",
            data: {
                errors: [
                    {
                        message: "E-mail cannot be blank.",
                        value: "",
                        param: "username",
                        location: "body"
                    },
                    {
                        message: "E-mail is not valid.",
                        value: "",
                        param: "username",
                        location: "body"
                    }
                ]
            }
        }), ctx.delay(1000))
    })
]

const server = setupServer(...handlers)



describe("Login Test Suite", () => {
    beforeAll(() => server.listen())

    beforeEach(() => {
        //before each tests initialize the component
        component = render(
            <Provider store={store}>
                <Login />
            </Provider>
        )

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

        fireEvent.click(screen.getByText(/Login/i));

        await waitFor(() => {
            //verify if validation message is shown
            expect(screen.getByText("E-mail cannot be blank.")).toBeInTheDocument();
        });
    });
});