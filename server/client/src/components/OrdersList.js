import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Radium from 'radium';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import { ACCENT_BLUE, WHITE } from '../style/constants';
import Header from './Header';
import OrdersListItem from './OrdersListItem';
import ErrorMessage from './ErrorMessage';
import { fetchOrders, fetchEmail, sendEmail, clearEmailSendState } from '../actions';
import { formatDate } from '../helpers/formatDate';

const OrdersListStyles = () => ({
  container: {
    marginLeft: 180,
    position: 'relative',
    width: '100vw',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 24px 0px 24px',
  },
  refreshIndicator: {
    position: 'relative',
    display: 'inline-block',
  },
});

class OrdersList extends Component {
  state = {
    modalOpen: false,
    alertOpen: false,
    customer: '',
    customerIndex: '',
  };

  componentDidMount() {
    console.log('==== OrdersList mounted!');
    const { variantId, dateTitle } = this.props.user.currentTour.payload;
    this.props.dispatch(fetchOrders(variantId));
    this.props.dispatch(fetchEmail(dateTitle));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.sendEmailSuccess) this.handleAlertOpen();
  }

  componentWillUnmount() {
    this.props.dispatch(clearEmailSendState());
  }

  updateCustomer = (name, index) => {
    this.setState({
      customer: name,
      customerIndex: index,
    });
  }

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  handleAlertOpen = () => {
    this.setState({ alertOpen: true });
  }

  handleAlertClose = () => {
    this.setState({ alertOpen: false });
  }

  sendOneEmail = () => {
    this.props.dispatch(
      sendEmail(
        this.props.user.fetchEmailSuccess.payload,
        [this.props.tourData.fetchOrdersSuccess.payload[this.state.customerIndex]],
        this.props.user.currentTour.payload,
        this.props.history,
      ),
    );
    this.handleModalClose();
  }

  renderContent() {
    const { header, buttonContainer, refreshIndicator } = OrdersListStyles();
    const { history } = this.props;
    const {
      fetchOrdersSuccess,
      fetchOrdersRejected,
      fetchOrdersPending,
    } = this.props.tourData;
    const { fetchEmailSuccess } = this.props.user;
    const variantId = this.props.user.currentTour.payload.variantId;
    const tourName = this.props.user.currentTour.payload.tourTitle;
    let variantTitle = 'Bundle Orders';
    let vendorName = '';
    let showDate = '';
    let dateSent = 'never';
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleModalClose}
        labelStyle={{ color: ACCENT_BLUE }}
      />,
      <FlatButton
        label="Submit"
        primary
        onClick={this.sendOneEmail}
        labelStyle={{ color: WHITE }}
        backgroundColor={ACCENT_BLUE}
      />,
    ];

    if (fetchOrdersPending) {
      return (
        <div
          className="orders-list__refresh-indicator"
          style={refreshIndicator}
        >
          <RefreshIndicator
            size={50}
            top={20}
            left={50}
            status="loading"
            loadingColor={ACCENT_BLUE}
          />
        </div>
      );
    } else if (fetchOrdersSuccess) {
      if (fetchEmailSuccess) {
        dateSent = formatDate(new Date(this.props.user.fetchEmailSuccess.payload.dateSent));
      }
      const ordersList = Array.from(fetchOrdersSuccess.payload);
      if (fetchOrdersSuccess.payload.length > 0) {
        variantTitle = `${
          ordersList[0].line_items[0].variant_title
        } Orders`;
        vendorName = ordersList[0].line_items[0].vendor;
        showDate = ordersList[0].line_items[0].title;
      }
      const modalMessage = () => (
        dateSent === 'never'
          ? <p>This email has not been sent yet. Please send to all before emailing this customer.</p>
          : <p>Are you sure you want to send an email to <strong>{this.state.customer}</strong>?</p>
      );
      return (
        <div>
          <Header
            pageTitle={variantTitle}
            showDate={showDate}
            tourName={tourName}
            vendorName={vendorName}
            dateSent={dateSent}
          />
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Order #</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn />
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordersList.map((order, index) => (
                <OrdersListItem
                  key={order.id}
                  id={order.id}
                  orderNumber={order.order_number}
                  customerName={order.shipping_address.name}
                  customerEmail={order.email}
                  openModal={this.handleModalOpen}
                  closeModal={this.handleModalClose}
                  updateCustomer={this.updateCustomer}
                  variantId={variantId}
                  index={index}
                />
              ))}
            </TableBody>
          </Table>
          <Dialog
            title="Send Email Confirmation"
            actions={dateSent === 'never' ? null : actions}
            modal={false}
            open={this.state.modalOpen}
            onRequestClose={this.handleModalClose}
          >
            {modalMessage()}
          </Dialog>
        </div>
      );
    } else if (fetchOrdersRejected) {
      return (
        <div>
          <ErrorMessage />
        </div>
      );
    }
  }

  render() {
    console.log('OrdersList props', this.props);
    const { container } = OrdersListStyles();

    return (
      <div className="ordersList__container" style={container}>
        {this.renderContent()}
        <Snackbar
          open={this.state.alertOpen}
          message="Email Sent Successfully"
          autoHideDuration={4000}
          onRequestClose={this.handleAlertClose}
          bodyStyle={{ backgroundColor: ACCENT_BLUE }}
          contentStyle={{ color: 'white' }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tourData: state.shopifyFetch,
  user: state.userAuth,
});

export default Radium(connect(mapStateToProps)(OrdersList));
