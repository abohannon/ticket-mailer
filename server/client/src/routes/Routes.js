import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import UserAuth from '../components/UserAuth';
import PrivateRoute from '../components/PrivateRoute';

class Routes extends Component {
  componentDidMount() {
    console.log('Routes mounted!');
  }

  isAuthed = () => {
    if (window.sessionStorage.userId) {
      return true;
    }
    return false;
  }

  render() {
    console.log(this.isAuthed());
    return (
      <BrowserRouter>
        <div>
          {/* <Route exact path="/" component={Dashboard} /> */}
          <Route exact path="/login" component={UserAuth} />
          <Route exact path="/signup" component={UserAuth} />
          <PrivateRoute exact path="/" component={Dashboard} authed={this.isAuthed()} />
        </div>
      </BrowserRouter>
    );
  }
}

export default Routes;
