import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
  static PropTypes = {
    tourData: PropTypes.object.isRequired,
  }

  static defaultProps = {
    fetchProductsSuccess: undefined,
  }
  componentDidMount() {
    console.log('==== DatesList mounted!');
    this.props.dispatch(fetchProducts());
  }

  renderContent() {
    const { fetchProductsSuccess } = this.props.tourData;
    const { header } = DatesListStyles();
    let vendorName = '';
    if (fetchProductsSuccess) {
      const productList = Array.from(fetchProductsSuccess.payload);
      if (fetchProductsSuccess.payload.length > 0) {
        vendorName = productList[0].vendor;
      }
      return (
        <div>
          <div className="header" style={header}>
            <h1>Tour Dates</h1>
            <h3>{vendorName}</h3>
          </div>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Date & Location</TableHeaderColumn>
                <TableHeaderColumn>Bundle</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              { productList.map(product => (
                <DatesListItem
                  key={product.product_id}
                  title={product.title}
                  id={product.product_id}
                  variants={product.variants}
                />
              )) }
            </TableBody>
          </Table>
        </div>
      );
    }
  }

  render() {
    console.log(this.props);
    const {
      container,
    } = DatesListStyles();

    return (
      <div className="datesList--container" style={container}>
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = state => ({ tourData: state.shopifyFetch });

export default Radium(connect(mapStateToProps)(DatesList));
