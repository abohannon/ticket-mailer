import React, { Component } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import { fetchProducts } from '../actions';
import DatesListItem from './DatesListItem';

const DatesListStyles = () => ({
  container: {
    marginLeft: 180,
  },
  header: {
    padding: '0px 24px 0px 24px',
  },
});

class DatesList extends Component {
  componentDidMount() {
    console.log('==== DatesList mounted!');
    this.props.dispatch(fetchProducts());
  }

  renderContent() {
    const { fetchProductsSuccess } = this.props.tourData;
    if (fetchProductsSuccess) {
      const productList = Array.from(fetchProductsSuccess.payload);
      console.log('product list', productList);
      return productList.map(product => (
        <DatesListItem
          key={product.product_id}
          title={product.title}
          id={product.product_id}
          variants={product.variants}
        />
      ));
    }
  }

  render() {
    console.log(this.props);
    const {
      container,
      header,
    } = DatesListStyles();

    return (
      <div className="datesList--container" style={container}>
        <div className="header" style={header}>
          <h1>Tour Dates</h1>
          <h2>Band Name Here</h2>
        </div>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Date & Location</TableHeaderColumn>
              <TableHeaderColumn>Bundle</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.renderContent()}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({ tourData: state.shopifyFetch });

export default Radium(connect(mapStateToProps)(DatesList));
