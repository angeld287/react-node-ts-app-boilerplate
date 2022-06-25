import React from 'react';
import { render, RenderResult } from '../../utils/test-utils';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Login from './index';

let component: RenderResult;

describe("Login Test Suite", () => {

    beforeEach(() => {
        //before each tests initialize the component
        component = render(
            <Provider store={store}>
                <Login />
            </Provider>
        )
    });

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


    test('It must respond "E-mail cannot be blank" when email is blank', () => {


    });
});