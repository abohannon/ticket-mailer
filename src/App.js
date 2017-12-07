import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './css/App.css';
import Sidebar from './components/sidebar';
import TourList from './components/tour-list';

class App extends Component {
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

export default App;
