import React, { Component } from 'react';
import Sidebar from './Sidebar';
import TourList from './TourList';

class Dashboard extends Component {
  componentDidMount() {
    console.log('Dashboard mounted!');
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

export default Dashboard;
