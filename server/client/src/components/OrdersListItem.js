import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class OrdersListItem extends Component {
  static propTypes = {
    orderNumber: PropTypes.number.isRequired,
    customerName: PropTypes.string.isRequired,
    customerEmail: PropTypes.string.isRequired,
  }

  render() {
    const { orderNumber, customerName, customerEmail, id } = this.props;
    const orderUrl = `https://dogdev.myshopify.com/admin/orders/${id}`;
    return (
      <TableRow hoverable>
        <TableRowColumn>
          <Link to={orderUrl} target="_blank">#{orderNumber}</Link></TableRowColumn>
        <TableRowColumn>{customerName}</TableRowColumn>
        <TableRowColumn>{customerEmail}</TableRowColumn>
        <TableRowColumn>Unsent. <a href="/">Send?</a></TableRowColumn>
      </TableRow>
    );
  }
}

export default OrdersListItem;
