import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class HistoryListItem extends Component {
  static propTypes = {
    date: PropTypes.string.isRequired,
    show: PropTypes.string.isRequired,
    bundle: PropTypes.string.isRequired,
    vendor: PropTypes.string.isRequired,
  }

  render() {
    const { date, show, bundle, vendor } = this.props;
    return (
      <TableRow hoverable>
        <TableRowColumn>{date}</TableRowColumn>
        <TableRowColumn>{show}</TableRowColumn>
        <TableRowColumn>{bundle}</TableRowColumn>
        <TableRowColumn>{vendor}</TableRowColumn>
      </TableRow>
    );
  }
}

export default HistoryListItem;
