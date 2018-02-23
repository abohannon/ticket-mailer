import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './style/App.css';
import Dashboard from './components/Dashboard';
import UserAuth from './components/UserAuth';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  componentDidMount() {
    console.log('==== App mounted!');
  }

  render() {
    const { isAuthorized } = this.props.user;
    return (
      <MuiThemeProvider>
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route path="/login" component={UserAuth} authed={isAuthorized} />
              <Route path="/signup" component={UserAuth} />
              <PrivateRoute path="/" component={Dashboard} authed={isAuthorized} />
            </Switch>
          </BrowserRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({ user: state.userAuth });

export default connect(mapStateToProps)(App);
