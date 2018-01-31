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
    tour: PropTypes.string.isRequired,
  }

  render() {
    const { date, show, bundle, tour } = this.props;
    return (
      <TableRow hoverable>
        <TableRowColumn>{date}</TableRowColumn>
        <TableRowColumn>{show}</TableRowColumn>
        <TableRowColumn>{bundle}</TableRowColumn>
        <TableRowColumn>{tour}</TableRowColumn>
      </TableRow>
    );
  }
}

export default HistoryListItem;
