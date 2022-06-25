import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import Login from './index';

describe("Test", () => {
    test('renders learn react link', () => {
        const { getByText } = render(
            <Provider store={store}>
                <Login />
            </Provider>
        );

        expect(getByText(/Login/i)).toBeInTheDocument();
    });
});