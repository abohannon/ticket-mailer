import React, { Component } from 'react';
import Radium from 'radium';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TourListItem from './tour-list-item';

class TourList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      state: null,
    };
  }
  render() {
    return (

      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Artist</TableHeaderColumn>
            <TableHeaderColumn>Tour</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TourListItem />
        </TableBody>
      </Table>
    );
  }
}

export default Radium(TourList);
