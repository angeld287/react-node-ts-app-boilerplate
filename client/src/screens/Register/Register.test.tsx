import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { Provider } from 'react-redux';
import { userRegisterSlice } from '../../features/userRegister/userRegisterSlice';
import { store } from '../../utils/redux-config';
import { render, RenderResult, functions, fireEvent, screen, waitFor, act } from '../../utils/test-utils';
import Register from './index'

let component: RenderResult;

describe("Login Test Suite", () => {

    beforeEach(() => {
        if (component)
            component.unmount()

        act(() => {
            component = render(
                <Provider store={store}>
                    <Register />
                </Provider>
            )
        });
    });

    test('It must render the component correcly', () => {
        expect(component.asFragment()).toMatchSnapshot();
    })

    test('It must display basic register components', () => {
        expect(component.getByText(/Email/i)).toBeInTheDocument();
        expect(component.getByText(/Username/i)).toBeInTheDocument();
        expect(component.getByText(/Phone Number/i)).toBeInTheDocument();
        expect(component.getAllByText(/Password/i)[0]).toBeInTheDocument();
        expect(component.getByText(/Confirm your password/i)).toBeInTheDocument();
        expect(component.getByText(/Fullname/i)).toBeInTheDocument();
        expect(component.getByText(/Gender/i)).toBeInTheDocument();

        expect(component.getByText(/Sign Up/i)).toBeInTheDocument();
    });

    test('It must respond "E-mail cannot be blank." when email is blank.', async () => {

        await act(() => {
            fireEvent.click(screen.getByText(/Sign Up/i));
        });

        await waitFor(() => {
            expect(screen.getByText("E-mail cannot be blank.")).toBeInTheDocument();
        });
    });

    test('It should respond "Username cannot be blank." when Username is blank.', async () => {

        functions.writeInInputFoundByPlaceHolder(null, /Email/i, "existingadmin@test.com");

        await act(() => {
            fireEvent.click(screen.getByText(/Sign Up/i));
        });

        await waitFor(() => {
            expect(screen.getByText("Username cannot be blank.")).toBeInTheDocument();
        });
    });
});