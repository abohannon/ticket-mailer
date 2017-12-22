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
    console.log('Routes props', this.props.currentUser);
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/login" component={UserAuth} />
          <Route exact path="/signup" component={UserAuth} />
          <PrivateRoute exact path="/" component={Dashboard} authed={this.props.currentUser} />
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => ({ currentUser: state.userAuth });
export default connect(mapStateToProps, actions)(Routes);
