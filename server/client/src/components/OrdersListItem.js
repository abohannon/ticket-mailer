import React, { Component } from 'react';
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
    const { orderNumber, customerName, customerEmail } = this.props;
    return (
      <TableRow hoverable>
        <TableRowColumn>#{orderNumber}</TableRowColumn>
        <TableRowColumn>{customerName}</TableRowColumn>
        <TableRowColumn>{customerEmail}</TableRowColumn>
        <TableRowColumn>Unsent. <a href="/">Send?</a></TableRowColumn>
      </TableRow>
    );
  }
}

export default OrdersListItem;
