import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withRouter } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import Arrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import EmailTextField from './EmailTextField';
import formFields from './formFields';
import { ACCENT_BLUE, WHITE } from '../../style/constants';

const EmailFormStyles = () => ({
  formContainer: {
    display: 'flex',
    width: 600,
    minWidth: 350,
    paddingLeft: 16,
  },
  formStyle: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: 600,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  blue: {
    backgroundColor: ACCENT_BLUE,
    color: WHITE,
  },
});

const validate = (values) => {
  const errors = {};
  const fields = ['checkin', 'start'];

  fields.forEach((name) => {
    if (!values[name]) {
      errors[name] = 'Required';
    }
  });

  return errors;
};

class EmailForm extends Component {
  componentDidMount() {
    console.log('EmailForm props', this.props);
  }

  render() {
    const {
      formContainer,
      formStyle,
      flexRow,
      buttonContainer,
      blue,
    } = EmailFormStyles();

    const {
      checkIn,
      startTime,
      eventNotes,
      pickup,
      shipping,
      shippingDate,
      digital,
      digitalDate,
    } = formFields;

    const { history } = this.props;

    const form = formFields.map(field => (
      <Field
        component={EmailTextField}
        type="text"
        label={field.label}
        name={field.name}
        multiLine={field.multiLine}
        fullWidth={field.fullWidth}
        style={field.style}
      />
    ));

    return (
      <div className="email-form__container" style={formContainer}>
        <form
          onSubmit={this.props.handleSubmit(this.props.onFormSubmit)}
          style={formStyle}
        >
          {form}
          {/* <div style={flexRow}>
            <Field
              component={EmailTextField}
              type="text"
              label={checkIn.label}
              name={checkIn.name}
            />
            <Field
              component={EmailTextField}
              type="text"
              label={startTime.label}
              name={startTime.name}
            />
            </div>
            <div>
            <Field
              component={EmailTextField}
              type="text"
              label={pickup.label}
              name={pickup.name}
              multiLine={pickup.multiLine}
            />
            </div>
            <div style={flexRow}>
            <Field
              component={EmailTextField}
              type="text"
              label={shipping.label}
              name={shipping.name}
              multiLine={shipping.multiLine}
            />
            <Field
              component={EmailTextField}
              type="text"
              label={shippingDate.label}
              name={shippingDate.name}
            />
            </div>
            <div style={flexRow}>
            <Field
              component={EmailTextField}
              type="text"
              label={digital.label}
              name={digital.name}
              multiLine={digital.multiLine}
            />
            <Field
              component={EmailTextField}
              type="text"
              label={digitalDate.label}
              name={digitalDate.name}
            />
          </div> */}
          <div className="email-form__button-container" style={buttonContainer}>
            <FlatButton label="Go Back" onClick={history.goBack} />
            <FlatButton
              label="Clear"
              style={{ marginRight: 'auto' }}
              onClick={() => this.props.reset()}
            />
            <FlatButton
              label="Next"
              labelPosition="before"
              icon={<Arrow />}
              type="submit"
              style={blue}
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({ tourData: state.shopifyFetch });

EmailForm = connect(mapStateToProps)(EmailForm);

export default reduxForm({
  form: 'emailForm',
  validate,
  destroyOnUnmount: false,
})(withRouter(EmailForm));
