import React from 'react';
import { render, RenderResult, functions, fireEvent, screen, waitFor, act } from '../../utils/test-utils';
import Register from './index'
let component: RenderResult;

describe("Login Test Suite", () => {

    beforeEach(() => {
        if (component)
            component.unmount()

        act(() => {
            component = render(<Register />)
        });
    });

    test('It must render the component correcly', () => {
        expect(component.asFragment()).toMatchSnapshot();
    })

    test('It must display basic register components', () => {
        expect(component.getByText(/Email/i)).toBeInTheDocument();
        expect(component.getByText(/Username/i)).toBeInTheDocument();
        expect(component.getByText(/Phone Number/i)).toBeInTheDocument();
        expect(component.getByText(/Password/i)).toBeInTheDocument();
        expect(component.getByText(/Confirm your password/i)).toBeInTheDocument();
        expect(component.getByText(/Fullname/i)).toBeInTheDocument();
        expect(component.getByText(/Gender/i)).toBeInTheDocument();

        expect(component.getByText(/Sign Up/i)).toBeInTheDocument();
    });
});