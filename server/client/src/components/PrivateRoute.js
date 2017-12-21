import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authed, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      authed === true // TODO: NEED TO FIX THIS
        ? <Component {...props} />
        : <Redirect to="/login" />
    )}
  />
);

export default PrivateRoute;
