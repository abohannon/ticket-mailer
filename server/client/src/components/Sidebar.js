import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { List, ListItem } from 'material-ui/List';
import ListIcon from 'material-ui/svg-icons/action/list';
import HistoryIcon from 'material-ui/svg-icons/action/restore';
import GroupIcon from 'material-ui/svg-icons/social/group';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';
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
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  listStyleTop: {
    width: 180,
  },
  listItemStyle: {
    color: LIGHT_BLUE,
  },
  greeting: {
    color: LIGHT_BLUE,
    padding: 32,
    textAlign: 'center',
  },
});

class Sidebar extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    payload: PropTypes.object,
    firstName: PropTypes.string,
  };

  static defaultProps = {
    payload: {},
    firstName: 'Friend',
  };

  componentDidMount() {
    console.log('==== Sidebar mounted!');
  }

  componentWillReceiveProps() {
    this.greeting();
  }

  handleLogout = () => {
    this.props.dispatch(logoutUser()).then(() => {
      this.props.history.push('/login');
    });
  };

  greeting = () => {
    if (this.props.user.fetchedUserSuccess !== undefined) {
      const { firstName } = this.props.user.fetchedUserSuccess.payload;
      return `Hello, ${firstName}.`;
    }
  };

  render() {
    console.log('Sidebar Props', this.props);
    const { sidebar, listStyleTop, listItemStyle, greeting } = SidebarStyles();

    const { history } = this.props;

    return (
      <div className="sidebar" style={sidebar}>
        <List style={listStyleTop}>
          <ListItem primaryText={this.greeting()} style={greeting} disabled />
          <ListItem
            primaryText="Tours"
            style={listItemStyle}
            leftIcon={<ListIcon color={LIGHT_BLUE} />}
            onClick={() => {
              history.push('/');
            }}
          />
          <ListItem
            primaryText="Orders"
            style={listItemStyle}
            leftIcon={<GroupIcon color={LIGHT_BLUE} />}
            onClick={() => {
              history.push('/all-orders');
            }}
          />
          <ListItem
            primaryText="History"
            style={listItemStyle}
            leftIcon={<HistoryIcon color={LIGHT_BLUE} />}
            onClick={() => {
              history.push('/history');
            }}
          />
        </List>
        <List>
          <ListItem
            primaryText="Log out"
            style={listItemStyle}
            leftIcon={<ExitIcon color={LIGHT_BLUE} />}
            onClick={this.handleLogout}
          />
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.userAuth });

export default Radium(connect(mapStateToProps)(Sidebar));
