import React, { Component } from 'react';
import Radium from 'radium';
import MailIcon from 'material-ui/svg-icons/communication/mail-outline';
import { LIGHT_BLUE } from '../style/constants';
import LoginForm from './LoginForm';

const LoginStyles = () => ({
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


class Login extends Component {
  componentDidMount() {
    console.log('Login mounted!');
  }

  render() {
    const {
      container,
    } = LoginStyles();

    return (
      <div style={container}>
        <MailIcon style={{ height: 56, width: 56, color: LIGHT_BLUE }} />
        <h1>TICKET MAILER</h1>
        <p>Please login</p>
        <LoginForm />
      </div>
    );
  }
}

export default Radium(Login);
