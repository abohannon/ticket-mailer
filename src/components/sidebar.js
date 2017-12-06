import React, { Component } from 'react';
import Radium from 'radium';
import { List, ListItem } from 'material-ui/List';

const SidebarStyles = () => ({
  sidebar: {
    backgroundColor: '#2b2d37',
    color: '#ADBEE0',
    height: '100vh',
    width: 180,
  },
});

class Sidebar extends Component {
  render() {
    const {
      sidebar,
    } = SidebarStyles();

    return (
      <div>
        <List class="sidebar" style={sidebar} innerDivStyle={{ color: 'white' }}>
          <ListItem primaryText="Tours" style={{ color: '#ADBEE0' }} />
          <ListItem primaryText="Shows" style={{ color: '#ADBEE0' }} />
          <ListItem primaryText="Orders" style={{ color: '#ADBEE0' }} />
          <ListItem primaryText="Settings" style={{ color: '#ADBEE0' }} />
          <ListItem primaryText="Log out" style={{ color: '#ADBEE0' }} />

        </List>
      </div>
    );
  }
}

export default Radium(Sidebar);
