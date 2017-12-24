import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dashboard from '../components/Dashboard';
import UserAuth from '../components/UserAuth';
import PrivateRoute from '../components/PrivateRoute';

class Routes extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  componentDidMount() {
    console.log('==== Routes mounted!');
  }

  render() {
    const { isAuthorized } = this.props.user;
    console.log('Routes props', this.props);
    console.log('Routes isAuthorized', isAuthorized);
    return (
      <Switch>
        {/* <Route exact path="/" component={Dashboard} /> */}
        <Route path="/login" component={UserAuth} authed={isAuthorized} />
        <Route path="/signup" component={UserAuth} />
        <PrivateRoute path="/" component={Dashboard} authed={isAuthorized} />
      </Switch>
    );
  }
}
const mapStateToProps = state => ({ user: state.userAuth });
export default withRouter(connect(mapStateToProps)(Routes));
