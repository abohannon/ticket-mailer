import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import UserAuth from '../components/UserAuth';
import PrivateRoute from '../components/PrivateRoute';
import isLoggedIn from '../helpers/is_logged_in';

class Routes extends Component {
  componentDidMount() {
    console.log('==== Routes mounted!');
  }

  // TODO: NEED TO FIX authed PROPS

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/login" component={UserAuth} />
          <Route exact path="/signup" component={UserAuth} />
          <PrivateRoute exact path="/" component={Dashboard} authed={isLoggedIn()} />
        </div>
      </BrowserRouter>
    );
  }
}

export default Routes;
