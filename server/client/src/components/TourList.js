import React, { Component } from 'react';
import Radium from 'radium';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import TourListItem from './TourListItem';

const TourListStyles = () => ({
  header: {
    padding: '0px 24px 0px 24px',
  },
});

class TourList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      state: null,
    };
  }
  render() {
    const { header } = TourListStyles();
    return (
      <div className="tourList--container">
        <div className="header" style={header}>
          <h1>Ticket Mailer</h1>
        </div>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Artist</TableHeaderColumn>
              <TableHeaderColumn>Tour</TableHeaderColumn>
              <TableHeaderColumn>Bundle</TableHeaderColumn>
              <TableHeaderColumn>Sent</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TourListItem />
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Radium(TourList);
