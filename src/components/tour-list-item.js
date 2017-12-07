import React from 'react';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const TourListItem = () => (
  <TableRow hoverable>
    <TableRowColumn>Anthony Green</TableRowColumn>
    <TableRowColumn><a href="#">Sex Music Tour</a></TableRowColumn>
    <TableRowColumn>0/100</TableRowColumn>
  </TableRow>
);

export default TourListItem;
