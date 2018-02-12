import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Radium from 'radium';
import PropTypes from 'prop-types';
import MailIcon from 'material-ui/svg-icons/communication/mail-outline';
import { LIGHT_BLUE } from '../style/constants';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { fetchUser } from '../actions';

const UserAuthStyles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#2b2d37',
    color: LIGHT_BLUE,
  },
});


class UserAuth extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    isAuthorized: PropTypes.bool,
    fetchedUserRejected: PropTypes.object,
    user: PropTypes.object.isRequired,
  }

  static defaultProps = {
    fetchedUserRejected: undefined,
    isAuthorized: false,
  }

  componentDidMount() {
    console.log('==== UserAuth mounted!');
    this.props.dispatch(fetchUser());
    console.log('User Auth props', this.props.user);
  }

  renderContent() {
    const { fetchedUserRejected, isAuthorized } = this.props.user;

    if (!isAuthorized) {
      switch (this.props.location.pathname) {
        case '/login':
          return <LoginForm />;
        case '/signup':
          return <SignupForm />;
        default:
          return <LoginForm />;
      }
    }
    return <p>LOADING...</p>;
  }

  render() {
    const { isAuthorized } = this.props.user;

    if (isAuthorized) {
      return <Redirect to="/" />;
    }

    const {
      container,
    } = UserAuthStyles();

    return (
      <div style={container}>
        <MailIcon style={{ height: 56, width: 56, color: LIGHT_BLUE }} />
        <h1>TICKET MAILER</h1>
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.userAuth });

export default Radium(connect(mapStateToProps)(withRouter(UserAuth)));
