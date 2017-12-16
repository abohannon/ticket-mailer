import React, { Component } from 'react';
import Radium from 'radium';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import { LIGHT_BLUE, DARK_BLUE, WHITE } from '../style/constants';

const SidebarStyles = () => ({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: DARK_BLUE,
    color: LIGHT_BLUE,
    height: '100vh',
  },
  listStyleTop: {
    width: 180,
  },
  listItemStyle: {
    color: LIGHT_BLUE,
  },
});


class Sidebar extends Component {
  componentDidMount() {
    console.log('Sidebar mounted!');
  }

  render() {
    const {
      sidebar,
      listStyleTop,
      listItemStyle,
    } = SidebarStyles();

    return (
      <div className="sidebar" style={sidebar}>
        <List style={listStyleTop}>
          <ListItem primaryText="Hello, Carynn." style={listItemStyle} />
          <ListItem primaryText="Home" style={listItemStyle} />
          <ListItem primaryText="Tours" style={listItemStyle} />
          <ListItem primaryText="Shows" style={listItemStyle} />
          <ListItem primaryText="Orders" style={listItemStyle} />
        </List>
        <List>
          <ListItem primaryText="Settings" style={listItemStyle} rightIcon={<SettingsIcon color={LIGHT_BLUE} />} />
          <ListItem primaryText="Log out" style={listItemStyle} />
        </List>
      </div>
    );
  }
}

export default Radium(Sidebar);
