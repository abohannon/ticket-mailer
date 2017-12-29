import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { fetchProducts } from '../actions';

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
    console.log(this.props.id);
    const collectionId = this.props.id;
    this.props.dispatch(fetchProducts(collectionId));
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
            to={{
              pathname: '/dates',
              hash: tourHash, // TODO: Fix hash
            }}
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
