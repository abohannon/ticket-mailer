import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { ACCENT_BLUE } from '../style/constants';
import { fetchCollections } from '../actions';
import TourListItem from './TourListItem';

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
      return collectionList.map(collection => (<TourListItem key={collection.collection_id} title={collection.title} id={collection.collection_id} handle={collection.handle} />));
    }
  }

  render() {
    console.log('TourList props', this.props);
    const { container, header, refreshIndicator } = TourListStyles();

    const { fetchCollectionsSuccess } = this.props.tourData;

    if (!fetchCollectionsSuccess) {
      return (<div className="tour-list__container" style={container}>
        <div className="tour-list__refresh-indicator" style={refreshIndicator}>
          <RefreshIndicator size={50} top={20} left={50} status="loading" loadingColor={ACCENT_BLUE} />
        </div>
      </div>);
    }

    return (<div className="tour-list__container" style={container}>
      <div className="tour-list__header" style={header}>
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

    </div>);
  }
}

const mapStateToProps = state => ({ tourData: state.shopifyFetch });

export default Radium(connect(mapStateToProps)(TourList));
