import React, { Component } from 'react';
import Radium from 'radium';
import MailIcon from 'material-ui/svg-icons/communication/mail-outline';
import { LIGHT_BLUE } from '../style/constants';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

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
  componentDidMount() {
    console.log('UserAuth mounted!');
  }

  renderContent() {
    switch (this.props.location.pathname) {
      case '/login':
        return <LoginForm />;
      case '/signup':
        return <SignupForm />;
      default:
        return <LoginForm />;
    }
  }

  render() {
    console.log(this.props);
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

export default Radium(UserAuth);
