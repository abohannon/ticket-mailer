import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import { sendEmail, fetchOrders } from '../../actions';
import formFields from './formFields';

const EmailFormReviewStyles = () => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
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

class EmailFormReview extends Component {
  componentDidMount() {
    console.log('==== EmailFormReview Mounted!');
    const variantId = this.props.user.currentTour.payload.variantId;
    this.props.dispatch(fetchOrders(variantId));
  }

  render() {
    console.log('EmailFormReview props', this.props);
    const { formContainer, flexRow, buttonContainer } = EmailFormReviewStyles();

    const { formValues, onCancel, tourData } = this.props;
    const { checkIn, startTime, pickup, shipping, shippingDate, digital, digitalDate } = formFields;

    return (
      <div style={formContainer}>
        <div>
          <h4>{checkIn.label}</h4>
          <p>{formValues.checkin}</p>
          <h4>{startTime.label}</h4>
          <p>{formValues.start}</p>
          <h4>{pickup.label}</h4>
          <p>{formValues.pickup}</p>
          <h4>{shipping.label}</h4>
          <p>{formValues.shipping}</p>
          <h4>{shippingDate.label}</h4>
          <p>{formValues.shippingDate}</p>
          <h4>{digital.label}</h4>
          <p>{formValues.digital}</p>
          <h4>{digitalDate.label}</h4>
          <p>{formValues.digitalDate}</p>
        </div>
        <div className="email-form__button-container" style={buttonContainer}>
          <FlatButton label="Go Back" onClick={onCancel} />
          <FlatButton
            label="Send to all"
            onClick={() => {
              this.props.dispatch(sendEmail(formValues, tourData.fetchOrdersSuccess.payload));
            }}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  formValues: state.form.emailForm.values,
  tourData: state.shopifyFetch,
  user: state.userAuth,
});

export default connect(mapStateToProps)(EmailFormReview);
