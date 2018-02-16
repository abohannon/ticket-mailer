import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
  formStyle: {
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
  errorText: {
    color: 'rgb(195, 0, 0)',
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

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch(loginUser(this.state));

    this.setState({
      email: '',
      password: '',
    });
  }

  render() {
    const {
      container,
      formStyle,
      fieldStyle,
      hintStyle,
      inputStyle,
      underlineStyle,
      buttonStyle,
      topText,
      errorText,
    } = LoginFormStyles();

    return (
      <div style={container}>
        <p style={topText}>Please login</p>
        <form onSubmit={this.handleSubmit} style={formStyle}>
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
          { this.props.user.loginUserRejected &&
            <p style={errorText}>Incorrect Login Info</p>
          }
          <RaisedButton
            type="submit"
            style={buttonStyle}
            label="Login"
            backgroundColor={ACCENT_BLUE}
            labelColor={WHITE}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.userAuth });

export default Radium(connect(mapStateToProps)(withRouter(LoginForm)));
