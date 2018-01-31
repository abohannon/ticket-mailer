import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import Header from './Header';

const HistoryListStyles = () => ({
  container: {
    marginLeft: 180,
  },
});

class HistoryList extends Component {
  render() {
    const { container } = HistoryListStyles();
    return (
      <div className="history-list" style={container}>
        <Header
          pageTitle={'Sent Emails'}
        />
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Date</TableHeaderColumn>
              <TableHeaderColumn>Tour</TableHeaderColumn>
              <TableHeaderColumn>Band</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody />
        </Table>
      </div>
    );
  }
}

export default HistoryList;
