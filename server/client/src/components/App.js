import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../style/App.css';
import Routes from '../routes/Routes';

class App extends Component {
  componentDidMount() {
    console.log('==== App mounted!');
  }

  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <div className="App">
            <Routes />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({ shopifyProducts: state.shopifyFetch }); // TODO: Need this?

export default connect(mapStateToProps)(App);
