import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { fetchOrders } from '../actions';

class DatesListItem extends Component {
  componentDidMount() {
    // TODO: REMOVE?
  }

  sendVariantId = (index) => {
    const variantId = this.props.variants[index].id;
    this.props.dispatch(fetchOrders(variantId));
  }

  renderVariants() {
    const { variants, pathname } = this.props;
    if (variants.length < 2) {
      return (<TableRowColumn>
        <Link
          to={{ pathname: `${pathname}/orders/${variants[0].title}` }}
          onClick={() => this.sendVariantId(0)}
        >{variants[0].title}
        </Link>
      </TableRowColumn>);
    }
    return (
      // TODO: Perhaps clean this up? Use a map to generate the links?
      // XXX: When clicking the link twice, it doubles the route text
      <TableRowColumn>
        <Link
          to={{ pathname: `/orders/${variants[0].title}` }}
          onClick={() => this.sendVariantId(0)}
        >{variants[0].title}</Link>
        &nbsp;|&nbsp;
        <Link
          to={{ pathname: `/orders/${variants[1].title}` }}
          onClick={() => this.sendVariantId(1)}
        >{variants[1].title}</Link>
      </TableRowColumn>
    );
  }

  render() {
    console.log('DatesListItem', this.props);
    const {
      title,
      id,
      variants,
    } = this.props;

    return (
      <TableRow hoverable>
        <TableRowColumn>{title}</TableRowColumn>
        {this.renderVariants()}
      </TableRow>
    );
  }
}


export default connect()(DatesListItem);
