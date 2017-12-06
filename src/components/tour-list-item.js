import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const TourListItem = () => (
  <TableRow hoverable>
    <TableRowColumn>Anthony Green</TableRowColumn>
    <TableRowColumn><a href="#">Sex Music Tour</a></TableRowColumn>
    <TableRowColumn>Ongoing</TableRowColumn>
  </TableRow>
);

export default TourListItem;
