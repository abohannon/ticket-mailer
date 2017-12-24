import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchProducts, fetchUser } from '../actions';
import Sidebar from './Sidebar';
import TourList from './TourList';

class Dashboard extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    console.log('==== Dashboard mounted!');
    this.props.dispatch(fetchProducts());
    this.props.dispatch(fetchUser());
  }

  render() {
    console.log('Dashboard props', this.props);
    return (
      <div className="dashboard--container">
        <Sidebar />
        <TourList />
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.userAuth, products: state.shopifyFetch });

export default connect(mapStateToProps)(Dashboard);
