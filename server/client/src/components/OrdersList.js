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
import { ACCENT_BLUE } from '../style/constants';
import Header from './Header';
import OrdersListItem from './OrdersListItem';
import ErrorMessage from './ErrorMessage';
import { fetchOrders } from '../actions';

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
  componentDidMount() {
    console.log('==== OrdersList mounted!');
    const variantId = this.props.user.currentTour.payload.variantId;
    this.props.dispatch(fetchOrders(variantId));
  }

  renderContent() {
    const { header, buttonContainer, refreshIndicator } = OrdersListStyles();
    const { history } = this.props;
    const {
      fetchOrdersSuccess,
      fetchOrdersRejected,
      fetchOrdersPending,
    } = this.props.tourData;
    const variantId = this.props.user.currentTour.payload.variantId;
    const tourName = this.props.user.currentTour.payload.tourTitle;
    let variantTitle = 'Bundle Orders';
    let vendorName = '';
    let showDate = '';

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
      const ordersList = Array.from(fetchOrdersSuccess.payload);
      if (fetchOrdersSuccess.payload.length > 0) {
        variantTitle = `${
          this.props.user.currentTour.payload.variantTitle
        } Orders`;
        vendorName = ordersList[0].line_items[0].vendor;
        showDate = this.props.user.currentTour.payload.dateTitle;
      }
      return (
        <div>
          <Header
            pageTitle={variantTitle}
            showDate={showDate}
            tourName={tourName}
            vendorName={vendorName}
          />
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Order #</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordersList.map(order => (
                <OrdersListItem
                  key={order.id}
                  id={order.id}
                  orderNumber={order.order_number}
                  customerName={order.shipping_address.name}
                  customerEmail={order.email}
                />
              ))}
            </TableBody>
          </Table>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tourData: state.shopifyFetch,
  user: state.userAuth,
});

export default Radium(connect(mapStateToProps)(OrdersList));
