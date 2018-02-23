import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import Header from './Header';
import HistoryListItem from './HistoryListItem';
import Spinner from './Spinner';
import { fetchEmails } from '../actions';

const HistoryListStyles = () => ({
  container: {
    marginLeft: 180,
  },
});

class HistoryList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchEmails());
  }

  renderContent() {
    console.log('HistoryList Props', this.props);

    const {
      fetchEmailsPending,
      fetchEmailsRejected,
      fetchEmailsSuccess,
    } = this.props.user;

    if (fetchEmailsPending) {
      return (
        <Spinner />
      );
    } else if (fetchEmailsSuccess) {
      const emailList = fetchEmailsSuccess.payload;
      console.log(emailList);
      return (
        <div className="history-list">
          <Header
            pageTitle={'Sent Emails'}
          />
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Date</TableHeaderColumn>
                <TableHeaderColumn>Show</TableHeaderColumn>
                <TableHeaderColumn>Bundle</TableHeaderColumn>
                <TableHeaderColumn>Artist</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emailList.map((email, i) => (
                <HistoryListItem
                  key={i}
                  date={email.date}
                  show={email.show}
                  bundle={email.bundle}
                  vendor={email.vendor}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      );
    }
  }

  render() {
    const { container } = HistoryListStyles();
    return <div style={container}>{this.renderContent()}</div>;
  }
}

const mapStateToProps = state => ({ user: state.userAuth });

export default connect(mapStateToProps)(HistoryList);
