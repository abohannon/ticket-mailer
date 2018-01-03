import React, { Component } from 'react';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class OrdersListItem extends Component {
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
