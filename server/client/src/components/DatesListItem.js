import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { fetchOrders, updateShowDate, updateTour } from '../actions';

class DatesListItem extends Component {
  componentDidMount() {
    // TODO: REMOVE?
  }

  sendVariantId = (index) => {
    const dateTitle = this.props.title;
    const dateId = this.props.id;
    const variantId = this.props.variants[index].id;
    const variantTitle = this.props.variants[index].title;
    const previousTourState = this.props.user.currentTour.payload;
    const tourState = { dateTitle, dateId, variantId, variantTitle };
    this.props.dispatch(updateTour({ ...previousTourState, ...tourState }));
  }

  renderVariants() {
    const { variants } = this.props;
    if (variants.length < 2) {
      return (<TableRowColumn>
        <Link
          to={{ pathname: '/orders' }}
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
          to={{ pathname: '/orders' }}
          onClick={() => this.sendVariantId(0)}
        >{variants[0].title}</Link>
        &nbsp;|&nbsp;
        <Link
          to={{ pathname: '/orders' }}
          onClick={() => this.sendVariantId(1)}
        >{variants[1].title}</Link>
      </TableRowColumn>
    );
  }

  render() {
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

const mapStateToProps = state => ({ user: state.userAuth });

export default connect(mapStateToProps)(DatesListItem);
