import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Header from '../Header';
import EmailForm from './EmailForm';
import EmailFormReview from './EmailFormReview';
import { fetchEmail } from '../../actions';

const EmailEditStyles = () => ({
  container: {
    marginLeft: 180,
    width: '100%',
    overflow: 'hidden',
  },
});

class EmailEdit extends Component {
  state = { showEmailReview: false };

  componentDidMount() {
    console.log('===== EmailEdit mounted!');
    const showDate = this.props.user.currentTour.payload.dateTitle;
    this.props.dispatch(fetchEmail(showDate));
  }

  //   const {
  //   checkin,
  //   start,
  //   eventNotes,
  //   pickup,
  //   shipping,
  //   shippingDate,
  //   digital,
  //   digitalDate
  // } = this.props.user.fetchEmailSuccess.payload


  renderContent() {
    if (this.state.showEmailReview) {
      return (
        <EmailFormReview
          onCancel={() => this.setState({ showEmailReview: false })}
        />
      );
    }
    return (
      <EmailForm
        onFormSubmit={() => this.setState({ showEmailReview: true })}
        initialValues={this.props.user.fetchEmailSuccess ? this.props.user.fetchEmailSuccess.payload : null}
      />
    );
  }

  render() {
    const { container } = EmailEditStyles();

    const tourName = this.props.user.currentTour.payload.tourTitle;
    const showDate = this.props.user.currentTour.payload.dateTitle;

    return (
      <div className="email-edit__container" style={container}>
        <Header
          pageTitle={'Edit Email'}
          showDate={showDate}
          tourName={tourName}
        />
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userAuth,
  tourData: state.shopifyFetch,
});

export default reduxForm({
  form: 'emailForm',
  destroyOnUnmount: false,
})(connect(mapStateToProps)(EmailEdit));
