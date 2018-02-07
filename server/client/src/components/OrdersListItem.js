import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { updateTour } from '../actions';

class OrdersListItem extends Component {
  static propTypes = {
    orderNumber: PropTypes.number.isRequired,
    customerName: PropTypes.string.isRequired,
    customerEmail: PropTypes.string.isRequired,
  }

  handleClick = (customerName) => {
    this.props.openModal();
    this.props.updateCustomer(customerName);
  }

  sendTourInfo = (tourState) => {
    const previousTourState = this.props.user.currentTour.payload;
    this.props.dispatch(updateTour({ ...previousTourState, ...tourState }));
  }

  render() {
    const {
      orderNumber,
      customerName,
      customerEmail,
      id,
      path,
      variantId,
      variantTitle,
      dateTitle,
      vendor,
    } = this.props;

    const tourState = { variantId, variantTitle, dateTitle, vendor };
    const orderUrl = `https://dogdev.myshopify.com/admin/orders/${id}`;
    return (
      <TableRow hoverable>
        <TableRowColumn>
          <Link to={orderUrl} target="_blank">#{orderNumber}</Link></TableRowColumn>
        <TableRowColumn>{customerName}</TableRowColumn>
        <TableRowColumn>{customerEmail}</TableRowColumn>
        { path === '/all-orders'
          ? <TableRowColumn><Link to="/orders" onClick={() => this.sendTourInfo(tourState)}>View Date</Link></TableRowColumn>
          :
          <TableRowColumn><Link to="#" onClick={() => this.handleClick(customerName)}>Send Email</Link></TableRowColumn>
        }
      </TableRow>
    );
  }
}

export default connect()(OrdersListItem);
