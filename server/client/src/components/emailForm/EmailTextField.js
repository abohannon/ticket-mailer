import React from 'react';
import TextField from 'material-ui/TextField';

export default ({ input, label, multiLine }) => (
  <div style={{ margin: 8 }}>
    <TextField floatingLabelText={label} multiLine={multiLine} {...input} />
  </div>
);
