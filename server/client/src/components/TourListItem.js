import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { fetchProducts, updateTour } from '../actions';

class TourListItem extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    handle: PropTypes.string.isRequired,
  }
  componentDidMount() {

  }

  sendCollectionId = () => {
    console.log('sendCollectionId');
    console.log('collection id:', this.props.id);
    console.log('collection title:', this.props.title);
    const collectionId = this.props.id;
    const tourTitle = this.props.title;
    this.props.dispatch(fetchProducts(collectionId));
    this.props.dispatch(updateTour(tourTitle));
  }

  render() {
    const {
      title,
      id,
      handle,
    } = this.props;

    const tourHash = `#${handle}`;

    return (
      <TableRow hoverable>
        <TableRowColumn>
          <Link
            to={{ pathname: `/dates/${handle}` }}
            onClick={this.sendCollectionId}
          >
            {title}
          </Link>
        </TableRowColumn>
      </TableRow>
    );
  }
}


export default connect()(TourListItem);
