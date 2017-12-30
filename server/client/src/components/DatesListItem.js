import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class DatesListItem extends Component {
  componentDidMount() {

  }

  sendVariantId = (index) => {
    const variantId = this.props.variants[index].id;
    console.log('variant id:', variantId);
  // TODO: FINISH SETTING UP DISPATCH
  }

  renderVariants() {
    const { variants } = this.props;
    if (variants.length < 2) {
      return <TableRowColumn><a href="/">{variants[0].title}</a></TableRowColumn>;
    }
    return (
      <TableRowColumn>
        <Link to="#" onClick={() => this.sendVariantId(0)}>{variants[0].title}</Link> |
        <Link to="#" onClick={() => this.sendVariantId(1)}>{variants[1].title}</Link>
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
        <TableRowColumn><a href="/">{title}</a></TableRowColumn>
        {this.renderVariants()}
        {/* <TableRowColumn><a href="/">{variants[0].title}</a></TableRowColumn> */}
      </TableRow>
    );
  }
}


export default DatesListItem;
