import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { fetchProducts } from '../actions';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
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
    products: PropTypes.object.isRequired,
  }
  componentDidMount() {
    console.log('==== TourList mounted!');
    this.props.dispatch(fetchProducts());
  }

  render() {
    const productList = Array.from(this.props.products);

    const renderList = productList.map(product => <TourListItem vendor={product.vendor} title={product.title} variants={product.variants} />);

    const {
      container,
      header,
    } = TourListStyles();

    return (
      <div className="tourList--container" style={container}>
        <div className="header" style={header}>
          <h1>Ticket Mailer</h1>
        </div>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Artist</TableHeaderColumn>
              <TableHeaderColumn>Tour</TableHeaderColumn>
              <TableHeaderColumn>Bundle</TableHeaderColumn>
              <TableHeaderColumn>Sent</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {renderList}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({ products: state.shopifyFetch });

export default Radium(connect(mapStateToProps)(TourList));
