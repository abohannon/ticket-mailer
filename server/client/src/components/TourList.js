import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Radium from 'radium';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import { fetchCollections } from '../actions';
import TourListItem from './TourListItem';

const TourListStyles = () => ({
  container: {
    marginLeft: 180,
  },
  header: {
    padding: '0px 24px 0px 24px',
  },
});

class TourList extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    fetchCollectionsSuccess: PropTypes.object,
  }

  static defaultProps = {
    fetchCollectionsSuccess: undefined,
  }

  componentDidMount() {
    console.log('==== TourList mounted!');
    this.props.dispatch(fetchCollections());
  }

  renderContent() {
    const { fetchCollectionsSuccess } = this.props.tourData;
    if (fetchCollectionsSuccess) {
      const collectionList = Array.from(fetchCollectionsSuccess.payload);
      return collectionList.map(collection => (
        <TourListItem
          key={collection.collection_id}
          title={collection.title}
          id={collection.collection_id}
        />
      ));
    }
  }

  render() {
    console.log('TourList props', this.props);
    const {
      container,
      header,
    } = TourListStyles();

    return (
      <div className="tourList--container" style={container}>
        <div className="header" style={header}>
          <h1>Current Tours</h1>
        </div>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Tour</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.renderContent()}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({ tourData: state.shopifyFetch });

export default Radium(connect(mapStateToProps)(TourList));
