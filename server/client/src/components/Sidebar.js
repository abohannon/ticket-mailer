import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { List, ListItem } from 'material-ui/List';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import { LIGHT_BLUE, DARK_BLUE } from '../style/constants';
import { logoutUser } from '../actions';

const SidebarStyles = () => ({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: DARK_BLUE,
    color: LIGHT_BLUE,
    height: '100vh',
    position: 'fixed',
  },
  listStyleTop: {
    width: 180,
  },
  listItemStyle: {
    color: LIGHT_BLUE,
  },
});


class Sidebar extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    payload: PropTypes.object,
    firstName: PropTypes.string,
  }

  static defaultProps = {
    payload: {},
    firstName: 'Friend',
  }

  componentDidMount() {
    console.log('==== Sidebar mounted!');
  }

  componentWillReceiveProps() {
    this.greeting();
  }

  handleLogout = () => {
    this.props.dispatch(logoutUser())
      .then(() => {
        this.props.history.push('/login');
      });
  }

  greeting = () => {
    if (this.props.user.fetchedUserSuccess !== undefined) {
      const { firstName } = this.props.user.fetchedUserSuccess.payload;
      return `Hello, ${firstName}.`;
    }
  }

  render() {
    console.log('Sidebar Props', this.props);
    const {
      sidebar,
      listStyleTop,
      listItemStyle,
    } = SidebarStyles();

    const {
      history,
    } = this.props;


    return (
      <div className="sidebar" style={sidebar}>
        <List style={listStyleTop}>
          <ListItem primaryText={this.greeting()} style={listItemStyle} />
          <ListItem primaryText="Home" style={listItemStyle} />
          <ListItem primaryText="Tours" style={listItemStyle} onClick={() => { history.push('/'); }} />
          <ListItem primaryText="Shows" style={listItemStyle} onClick={() => { history.push('/dates'); }} />
          <ListItem primaryText="Orders" style={listItemStyle} />
        </List>
        <List>
          <ListItem primaryText="Settings" style={listItemStyle} rightIcon={<SettingsIcon color={LIGHT_BLUE} />} />
          <ListItem primaryText="Log out" style={listItemStyle} onClick={this.handleLogout} />
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.userAuth });

export default Radium(connect(mapStateToProps)(Sidebar));
