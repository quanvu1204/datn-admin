import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

import { RouteGuard } from '../../common/utils/routeGuards';

interface PrivateRouteProps extends RouteProps {
    guards: RouteGuard[];
}

const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({ component, guards, ...rest }) => {
    /*
        Decide what to render into the route
     */
    const getRenderer = (guards: RouteGuard[], Component: any, props: any) => {
        for (const guard of guards) {
            if (!guard.requestDone) {
                // if guard request isn't done then render nothing and wait for requestDone to change
                return null;
            } else if (guard.failCondition) {
                // if guard request is done then check if failCondition matches
                // and if it does then either redirect to onFail or display nothing
                if (guard.onFail) {
                    if (typeof guard.onFail === 'string') {
                        return <Redirect to={guard.onFail} />;
                    } else {
                        (guard as any).onFail();
                        return null;
                    }
                } else {
                    return null;
                }
            }
        }

        return <Component {...props} />;
    };

    return <Route {...rest} render={(props) => getRenderer(guards, component, props)} />;
};

export default PrivateRoute;
