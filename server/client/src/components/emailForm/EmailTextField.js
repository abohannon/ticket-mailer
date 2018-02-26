import React from 'react';
import TextField from 'material-ui/TextField';
import { ACCENT_BLUE, LIGHT_BLUE } from '../../style/constants';

const styles = {
  hintStyle: {
    color: LIGHT_BLUE,
  },
  underlineStyle: {
    borderColor: ACCENT_BLUE,
  },
  floatingStyle: {
    color: LIGHT_BLUE,
  },
};

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
      hintStyle={styles.hintStyle}
      floatingLabelStyle={styles.floatingStyle}
      inputStyle={styles.inputStyle}
      underlineFocusStyle={styles.underlineStyle}
      {...input}
    />
    <div style={{ position: 'absolute', color: 'red', marginBottom: 16 }}>
      {touched && error}
    </div>
  </div>
);
