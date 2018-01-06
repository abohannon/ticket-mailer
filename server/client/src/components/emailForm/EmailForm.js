import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import EmailTextField from './EmailTextField';
import formFields from './formFields';

const EmailFormStyles = () => ({
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
      buttonContainer,
    } = EmailFormStyles();

    const { history } = this.props;

    return (
      <div className="email-form__container">
        <form onSubmit={this.props.handleSubmit((values) => {
          console.log('Submit Form');
          console.log(values);
        })}
        >
          {this.renderFields()}
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
})(withRouter(EmailForm));
