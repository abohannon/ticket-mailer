import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Radium from 'radium';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../actions';
import { ACCENT_BLUE, WHITE, LIGHT_BLUE } from '../style/constants';

const SignupFormStyles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  fieldStyle: {
    marginTop: 24,
  },
  hintStyle: {
    color: LIGHT_BLUE,
  },
  inputStyle: {
    color: LIGHT_BLUE,
  },
  underlineStyle: {
    borderColor: ACCENT_BLUE,
  },
  buttonStyle: {
    marginTop: 48,
  },
  topText: {
    textAlign: 'center',
  },
  bottomText: {
    textAlign: 'right',
  },
});

class SignupForm extends Component {
  static propTypes = {
    createUser: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    console.log('SignupForm mounted!');
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleSubmit = () => {
    this.props.createUser(this.state);

    this.setState({
      firstName: '',
      email: '',
      password: '',
    });

    console.log('Signup submitted!', this.state);
  }

  render() {
    const {
      container,
      fieldStyle,
      hintStyle,
      inputStyle,
      underlineStyle,
      buttonStyle,
      topText,
      bottomText,
    } = SignupFormStyles();

    return (
      <div style={container}>
        <p style={topText}>Please sign up</p>
        <TextField
          name="firstName"
          style={fieldStyle}
          hintText="First Name"
          hintStyle={hintStyle}
          inputStyle={inputStyle}
          underlineFocusStyle={underlineStyle}
          value={this.state.firstName}
          onChange={event => this.handleInputChange(event)}
        />
        <TextField
          name="email"
          style={fieldStyle}
          hintText="Email"
          hintStyle={hintStyle}
          inputStyle={inputStyle}
          underlineFocusStyle={underlineStyle}
          value={this.state.email}
          onChange={event => this.handleInputChange(event)}
        />
        <TextField
          name="password"
          style={fieldStyle}
          type="password"
          hintText="Password"
          hintStyle={hintStyle}
          inputStyle={inputStyle}
          underlineFocusStyle={underlineStyle}
          value={this.state.password}
          onChange={event => this.handleInputChange(event)}
        />
        <RaisedButton
          style={buttonStyle}
          label="Sign Up"
          backgroundColor={ACCENT_BLUE}
          labelColor={WHITE}
          onClick={this.handleSubmit}
        />
        <a href="/login" style={bottomText}><p><small>Have an account already? Click here to login.</small></p></a>

      </div>
    );
  }
}

export default Radium(connect(null, actions)(SignupForm));
