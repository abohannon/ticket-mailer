import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import * as actions from '../actions';
import Dashboard from '../components/Dashboard';
import UserAuth from '../components/UserAuth';
import PrivateRoute from '../components/PrivateRoute';

class Routes extends Component {
  componentDidMount() {
    console.log('==== Routes mounted!');
  }

  render() {
    const currentUser = this.props.currentUser;
    console.log(currentUser);
    return (
      <BrowserRouter>
        <div>
          <PrivateRoute exact path="/" component={Dashboard} authed={currentUser} />
          <Route exact path="/login" component={UserAuth} />
          <Route exact path="/signup" component={UserAuth} />
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => ({ currentUser: state.userAuth });
export default connect(mapStateToProps, actions)(Routes);
