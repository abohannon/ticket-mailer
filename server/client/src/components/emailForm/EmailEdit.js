import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import Radium from 'radium';
import EmailForm from './EmailForm';

const EmailEditStyles = () => ({
  container: {
    marginLeft: 180,
  },
});

class EmailEdit extends Component {
  state = { showEmailReview: false }

  componentDidMount() {
    console.log('===== EmailEdit mounted!');
  }

  render() {
    const {
      container,
    } = EmailEditStyles();

    return (
      <div className="email-edit__container" style={container}>
        <EmailForm />
      </div>
    );
  }
}

export default Radium(reduxForm({ form: 'emailForm' })(EmailEdit));
