import React from 'react';
import TextField from 'material-ui/TextField';

export default ({ input, label, multiLine, meta: { touched, error } }) => (
  <div style={{ margin: 8 }}>
    <TextField floatingLabelText={label} multiLine={multiLine} {...input} />
    <div style={{ position: 'absolute', color: 'red', marginBottom: 16 }}>
      {touched && error}
    </div>
  </div>
);
