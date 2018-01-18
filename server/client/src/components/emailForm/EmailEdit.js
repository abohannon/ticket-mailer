import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Radium from 'radium';
import Header from '../Header';
import EmailForm from './EmailForm';
import EmailFormReview from './EmailFormReview';

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
  }

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

const mapStateToProps = state => ({ user: state.userAuth });

export default Radium(
  reduxForm({ form: 'emailForm' })(connect(mapStateToProps)(EmailEdit)),
);
