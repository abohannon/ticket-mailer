import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as actions from '../actions';
import '../style/App.css';
import Routes from '../routes/Routes';

class App extends Component {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired,
    fetchProducts: PropTypes.func.isRequired,
  }

  componentDidMount() {
    console.log('==== App mounted!');
    this.props.fetchUser();
    this.props.fetchProducts();
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Routes />
        </div>
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = state => ({ shopifyProducts: state.shopifyFetch }); // TODO: Need this?

export default connect(mapStateToProps, actions)(App);
