import React from 'react';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const TourListItem = () => (
  <TableRow hoverable>
    <TableRowColumn>Anthony Green</TableRowColumn>
    <TableRowColumn>Sex Music Tour</TableRowColumn>
    <TableRowColumn><a href="#">Upgrade</a> | <a href="#">Ticket</a></TableRowColumn>
    <TableRowColumn>0/100</TableRowColumn>
  </TableRow>
);

export default TourListItem;
