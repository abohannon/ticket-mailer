import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUser } from '../actions';
import Sidebar from './Sidebar';
import TourList from './TourList';
import DatesList from './DatesList';
import OrdersList from './OrdersList';

class Dashboard extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  componentDidMount() {
    console.log('==== Dashboard mounted!');
    this.props.dispatch(fetchUser());
  }

  renderContent() {
    const { pathname } = this.props.location;
    if (pathname === '/') {
      return <TourList />;
    } else if (pathname.includes('/dates')) {
      return <DatesList pathname={pathname} />;
    } else if (pathname.includes('/orders')) {
      return <OrdersList pathname={pathname} />;
    }
    return <TourList />;
  }

  render() {
    console.log('Dashboard props', this.props);
    return (
      <div className="dashboard--container">
        <Sidebar history={this.props.history} />
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.userAuth });

export default connect(mapStateToProps)(withRouter((Dashboard)));
