import React from 'react';
import './App.scss';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';

import PrivateRoute from './components/Route/PrivateRoute';
import Login from './pages/login/Login';
import { authGuard, unAuthGuard } from './common/utils/routeGuards';
import Home from './pages/home/Home';

const App = (): JSX.Element => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <PrivateRoute path={'/login'} component={Login} guards={[unAuthGuard]} />
                    <PrivateRoute path={'/'} component={Home} guards={[authGuard]} />
                    <Redirect to={'/login'} />
                </Switch>
            </BrowserRouter>
        </>
    );
};

export default App;
