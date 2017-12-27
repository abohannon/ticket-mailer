import React, { Component } from 'react';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class TourListItem extends Component {
  componentDidMount() {

  }

  render() {
    const {
      title,
    } = this.props;

    return (
      <TableRow hoverable>
        <TableRowColumn><a href="/">{title}</a></TableRowColumn>
      </TableRow>
    );
  }
}


export default TourListItem;
