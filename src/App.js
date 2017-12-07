import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './css/App.css';
import Sidebar from './components/sidebar';
import TourList from './components/tour-list';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      state: null,
    };
  }
  render() {
    // fetch('http://localhost:3050/api/collections')
    //   .then((response) => {
    //     if (response.status !== 200) {
    //       console.log('There was a problem with the response.', response.status);
    //     } else {
    //       return response.json();
    //     }
    //   }).then((data) => {
    //     console.log(data);
    //   }).catch(err => console.log(err));
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
