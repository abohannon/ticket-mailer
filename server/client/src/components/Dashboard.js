import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import Sidebar from './Sidebar';
import TourList from './TourList';

class Dashboard extends Component {
  static propTypes = {
    fetchProducts: PropTypes.func.isRequired,
  }

  componentDidMount() {
    console.log('==== Dashboard mounted!');
    this.props.fetchProducts();
  }

  render() {
    return (
      <div className="dashboard--container">
        <Sidebar />
        <TourList />
      </div>
    );
  }
}

export default connect(null, actions)(Dashboard);
