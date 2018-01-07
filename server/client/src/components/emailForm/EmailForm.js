import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import EmailTextField from './EmailTextField';
import formFields from './formFields';

const EmailFormStyles = () => ({
  formContainer: {
    display: 'flex',
    width: 960,
    maxWidth: 960,
    minWidth: 350,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

class EmailForm extends Component {
  renderFields() {
    return formFields.map(({ label, name, multiLine }) => <Field key={name} component={EmailTextField} type="text" label={label} name={name} multiLine={multiLine} />);
  }

  render() {
    const {
      formContainer,
      flexRow,
      buttonContainer,
    } = EmailFormStyles();

    const { checkIn, startTime, pickup, shipping, shippingDate, digital, digitalDate } = formFields;

    const { history } = this.props;

    return (
      <div className="email-form__container" style={formContainer}>
        <form onSubmit={this.props.handleSubmit(this.props.onFormSubmit)}>
          <div style={flexRow}>
            <Field component={EmailTextField} type="text" label={checkIn.label} name={checkIn.name} />
            <Field component={EmailTextField} type="text" label={startTime.label} name={startTime.name} />
          </div>
          <div>
            <Field component={EmailTextField} type="text" label={pickup.label} name={pickup.name} />
          </div>
          <div style={flexRow}>
            <Field component={EmailTextField} type="text" label={shipping.label} name={shipping.name} />
            <Field component={EmailTextField} type="text" label={shippingDate.label} name={shippingDate.name} />
          </div>
          <div style={flexRow}>
            <Field component={EmailTextField} type="text" label={digital.label} name={digital.name} />
            <Field component={EmailTextField} type="text" label={digitalDate.label} name={digitalDate.name} />
          </div>
          <div className="email-form__button-container" style={buttonContainer}>
            <FlatButton label="Go Back" onClick={history.goBack} />
            <FlatButton label="Next" type="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'emailForm',
  destroyOnUnmount: false, // TODO: NOT WORKING
})(withRouter(EmailForm));
