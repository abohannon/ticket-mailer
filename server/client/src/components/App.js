import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as actions from '../actions';
import '../style/App.css';
import Dashboard from './Dashboard';
import Login from './Login';

class App extends Component {
  static propTypes = {
    fetchProducts: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <BrowserRouter>
            <div>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/login" component={Login} />
            </div>
          </BrowserRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(null, actions)(App);
