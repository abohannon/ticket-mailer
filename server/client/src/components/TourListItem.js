import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class TourListItem extends Component {
  componentDidMount() {

  }

  sendCollectionId = () => {
    console.log('sendCollectionId');
    console.log(this.props.id);
    // TODO: Complete
  }

  render() {
    const {
      title,
      id,
      handle,
    } = this.props;

    const tourHash = `#${title}`;

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


export default TourListItem;
