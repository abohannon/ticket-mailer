import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import { fetchCollections } from '../actions';
import Header from './Header';
import TourListItem from './TourListItem';
import Spinner from './Spinner';

const TourListStyles = () => ({
  container: {
    marginLeft: 180,
    position: 'relative',
  },
  header: {
    padding: '0px 24px 0px 24px',
  },
  refreshIndicator: {
    position: 'relative',
    display: 'inline-block',
  },
});

class TourList extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    fetchCollectionsSuccess: PropTypes.object,
  };

  static defaultProps = {
    fetchCollectionsSuccess: undefined,
  };

  componentWillMount() {
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
          handle={collection.handle}
        />
      ));
    }
  }

  render() {
    console.log('TourList props', this.props);
    const { container, header, refreshIndicator } = TourListStyles();

    const { fetchCollectionsSuccess } = this.props.tourData;

    if (!fetchCollectionsSuccess) {
      return (
        <div className="tour-list__container" style={container}>
          <Spinner />
        </div>
      );
    }

    return (
      <div className="tour-list__container" style={container}>
        <Header pageTitle={'Current Tours'} />
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Tour</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>{this.renderContent()}</TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({ tourData: state.shopifyFetch });

export default connect(mapStateToProps)(TourList);
