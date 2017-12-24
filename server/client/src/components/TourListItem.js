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
      vendor,
      title,
      variants,
    } = this.props;

    return (
      <TableRow hoverable>
        <TableRowColumn>{vendor}</TableRowColumn>
        <TableRowColumn>{title}</TableRowColumn>
        <TableRowColumn><a href="#">Bundle 1</a> | <a href="#">Bundle 2</a></TableRowColumn>
        <TableRowColumn>0/100</TableRowColumn>
      </TableRow>
    );
  }
}


export default TourListItem;
