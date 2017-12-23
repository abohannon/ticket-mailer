import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authed, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      console.log('Private Route Props', props, authed);

      return authed
        ? <Component {...props} />
        : <Redirect to="/login" />;
    }
    }
  />
);

export default withRouter(PrivateRoute);

// props => (
//   authed
//     ? <Component {...props} />
//     : <Redirect to="/login" />
// );
