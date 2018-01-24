import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIcon from 'material-ui/svg-icons/action/cached';
import { DARKEST_BLUE } from '../style/constants';
import { fetchProducts, fetchOrders } from '../actions';

const ErrorMessageStyles = () => ({
  container: {
    textAlign: 'center',
    marginTop: '20%',
  },
});

const handleFetch = (props) => {
  const { variantId, tourId } = props.user.currentTour.payload;
  const { match, dispatch } = props;

  if (match.path === '/orders') {
    return dispatch(fetchOrders(variantId));
  }

  if (match.path === '/dates') {
    return dispatch(fetchProducts(tourId));
  }
};

const ErrorMessage = (props) => {
  const { container } = ErrorMessageStyles();

  return (
    <div className="error-message" style={container}>
      <p>There was an error fetching your data.</p>
      <p>Please try again.</p>
      <RaisedButton
        label="Refresh"
        labelColor={DARKEST_BLUE}
        icon={<RefreshIcon />}
        style={{ marginTop: 16 }}
        onClick={() => handleFetch(props)}
      />
    </div>
  );
};

const mapStateToProps = state => ({ user: state.userAuth });

export default connect(mapStateToProps)(withRouter(ErrorMessage));
