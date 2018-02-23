import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { ACCENT_BLUE } from '../style/constants';

const styles = {
  spinnerContainerStyle: {
    position: 'relative',
    display: 'inline-block',
  },
};

const Spinner = () => (
  <div className="spinner" style={styles.spinnerContainerStyle}>
    <RefreshIndicator
      size={50}
      top={20}
      left={50}
      status="loading"
      loadingColor={ACCENT_BLUE}
    />
  </div>
);

export default Spinner;
