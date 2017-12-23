import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import UserAuth from '../components/UserAuth';
import PrivateRoute from '../components/PrivateRoute';

class Routes extends Component {
  componentDidMount() {
    console.log('==== Routes mounted!');
  }

  render() {
    const { isAuthorized } = this.props.user;
    console.log('From Routes Component', this.props);
    console.log('From Routes Component', isAuthorized);
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={UserAuth} />
          <Route path="/signup" component={UserAuth} />
          <PrivateRoute path="/" component={Dashboard} authed={isAuthorized} />
        </Switch>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => ({ user: state.userAuth });
export default connect(mapStateToProps)(Routes);
