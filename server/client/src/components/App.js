import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../css/App.css';
import Sidebar from './Sidebar';
import TourList from './TourList';
import * as actions from '../actions';

class App extends Component {
  static propTypes = {
    fetchCollections: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchCollections();
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Sidebar />
          <TourList />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(null, actions)(App);
