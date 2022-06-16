import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes as RRoutes
} from "react-router-dom";

import Header from '../components/Header';
import { Counter } from '../screens/Counter/Counter';
import Login from '../screens/Login';

const Routes: React.FC = () => {
    return (
        <Router>
            <div>
                <Header />
                <RRoutes>
                    <Route path="/" element={<Counter />} />
                    <Route path="/login" element={<Login />} />
                </RRoutes>
            </div>
        </Router>
    );
};

export default Routes;