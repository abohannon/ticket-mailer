import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Header from './Header';
import HistoryListItem from './HistoryListItem';
import { fetchEmails } from '../actions';
import { ACCENT_BLUE } from '../style/constants';

const HistoryListStyles = () => ({
  container: {
    marginLeft: 180,
  },
  refreshIndicator: {
    position: 'relative',
    display: 'inline-block',
  },
});

class HistoryList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchEmails());
  }

  renderContent() {
    const { refreshIndicator } = HistoryListStyles();
    console.log('HistoryList Props', this.props);

    const {
      fetchEmailsPending,
      fetchEmailsRejected,
      fetchEmailsSuccess,
    } = this.props.user;

    if (fetchEmailsPending) {
      return (
        <div
          className="refresh-indicator"
          style={refreshIndicator}
        >
          <RefreshIndicator
            size={50}
            top={20}
            left={50}
            status="loading"
            loadingColor={ACCENT_BLUE}
          />
        </div>
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
