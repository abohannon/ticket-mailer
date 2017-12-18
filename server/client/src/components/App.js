import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as actions from '../actions';
import '../style/App.css';
import Dashboard from './Dashboard';
import UserAuth from './UserAuth';

class App extends Component {
  static propTypes = {
    fetchProducts: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    console.log(this.props);
    return (
      <MuiThemeProvider>
        <div className="App">
          <BrowserRouter>
            <div>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/login" component={UserAuth} />
              <Route exact path="/signup" component={UserAuth} />
            </div>
          </BrowserRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = state => ({ shopifyFetch: state.shopifyFetch });

export default connect(mapStateToProps, actions)(App);
