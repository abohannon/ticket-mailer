import React, { Component } from 'react';
import Radium from 'radium';
import { List, ListItem } from 'material-ui/List';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

const SidebarStyles = () => ({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#2b2d37',
    color: '#ADBEE0',
    height: '100vh',
  },
  listStyleTop: {
    width: 180,
  },
});

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      state: null,
    };
  }

  render() {
    const {
      sidebar,
      listStyleTop,
    } = SidebarStyles();

    return (
      <div className="sidebar" style={sidebar}>
        <List style={listStyleTop}>
          <ListItem primaryText="Hello, Carynn." style={{ color: '#ADBEE0' }} />
          <ListItem primaryText="Home" style={{ color: '#ADBEE0' }} />
          <ListItem primaryText="Tours" style={{ color: '#ADBEE0' }} />
          <ListItem primaryText="Shows" style={{ color: '#ADBEE0' }} />
          <ListItem primaryText="Orders" style={{ color: '#ADBEE0' }} />
        </List>
        <List>
          <ListItem primaryText="Settings" style={{ color: '#ADBEE0' }} rightIcon={<SettingsIcon color={'#ADBEE0'} />} />
          <ListItem primaryText="Log out" style={{ color: '#ADBEE0' }} />
        </List>
      </div>
    );
  }
}

export default Radium(Sidebar);
