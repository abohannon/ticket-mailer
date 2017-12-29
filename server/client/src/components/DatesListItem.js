import React, { Component } from 'react';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class DatesListItem extends Component {
  componentDidMount() {

  }

  renderVariants() {
    const { variants } = this.props;
    if (variants.length < 2) {
      return <TableRowColumn><a href="/">{variants[0].title}</a></TableRowColumn>;
    }
    return <TableRowColumn><a href="/">{variants[0].title}</a> | <a href="/">{variants[1].title}</a></TableRowColumn>;
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
