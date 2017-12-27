import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUser } from '../actions';
import Sidebar from './Sidebar';
import TourList from './TourList';
import DatesList from './DatesList';

class Dashboard extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    console.log('==== Dashboard mounted!');
    this.props.dispatch(fetchUser());
  }

  renderContent() {
    switch (this.props.location.pathname) {
      case '/':
        return <TourList />;
      case '/dates':
        return <DatesList />;
      default:
        return <TourList />;
    }
  }

  render() {
    console.log('Dashboard props', this.props);
    return (
      <div className="dashboard--container">
        <Sidebar />
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.userAuth });

export default connect(mapStateToProps)(Dashboard);
