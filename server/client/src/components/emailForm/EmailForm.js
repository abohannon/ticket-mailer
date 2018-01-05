import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import EmailFormField from './EmailFormField';
import formFields from './formFields';

class EmailForm extends Component {
  renderFields() {
    return formFields.map(({ label, name }) => <Field key={name} component={EmailFormField} type="text" label={label} name={name} />);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit((values) => {
          console.log('Submit Form');
          console.log(values);
        })}
        >
          {this.renderFields()}
          <FlatButton label="Save" type="submit" />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'emailForm',
})(EmailForm);
