import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Radium from 'radium';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { loginUser } from '../actions';
import { ACCENT_BLUE, WHITE, LIGHT_BLUE } from '../style/constants';

const LoginFormStyles = () => ({
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
    width: '100%',
  },
  topText: {
    textAlign: 'center',
  },
  bottomText: {
    textAlign: 'right',
  },
});

class LoginForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    console.log('==== LoginForm mounted!');
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleSubmit = () => {
    this.props.dispatch(loginUser(this.state));

    this.setState({
      email: '',
      password: '',
    });
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
    } = LoginFormStyles();

    const { isAuthorized } = this.props.user;

    if (isAuthorized) {
      return <Redirect to="/" />;
    }

    return (
      <div style={container}>
        <p style={topText}>Please login</p>
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
          label="Login"
          backgroundColor={ACCENT_BLUE}
          labelColor={WHITE}
          onClick={this.handleSubmit}
        />
        <a href="#" style={bottomText}><p><small>forgot?</small></p></a>

      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.userAuth });

export default Radium(connect(mapStateToProps)(withRouter(LoginForm)));
