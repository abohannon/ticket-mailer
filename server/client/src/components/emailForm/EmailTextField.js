import React from 'react';
import TextField from 'material-ui/TextField';

export default ({
  input,
  label,
  multiLine,
  fullWidth,
  style,
  meta: { touched, error },
}) => (
  <div style={style}>
    <TextField
      floatingLabelText={label}
      multiLine={multiLine}
      fullWidth={fullWidth}
      {...input}
    />
    <div style={{ position: 'absolute', color: 'red', marginBottom: 16 }}>
      {touched && error}
    </div>
  </div>
);
