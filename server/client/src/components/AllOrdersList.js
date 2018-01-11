import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import OrdersListItem from './OrdersListItem';
import { fetchAllOrders } from '../actions';

const AllOrdersListStyles = () => ({
  container: {
    marginLeft: 180,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 24px 0px 24px',
  },
});

class AllOrdersList extends Component {
  componentDidMount() {
    console.log('==== All Orders List Mounted!');
    this.props.dispatch(fetchAllOrders());
  }

  renderContent() {
    const { header } = AllOrdersListStyles();
    const { fetchAllOrdersSuccess, fetchAllOrdersRejected } = this.props.tourData;
    if (fetchAllOrdersSuccess) {
      const ordersList = Array.from(fetchAllOrdersSuccess.payload);
      return (
        <div>
          <div className="header" style={header}>
            <h1>All Orders</h1>
          </div>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Order #</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              { ordersList.map(order => (
                <OrdersListItem
                  key={order.id}
                  id={order.id}
                  orderNumber={order.order_number}
                  customerName={order.shipping_address.name}
                  customerEmail={order.email}
                />
              )) }
            </TableBody>
          </Table>
        </div>
      );
    } else if (fetchAllOrdersRejected) {
      return (
        <div>
          <p>Looks like there was a problem grabbing your data.</p>
          <p><Link to="/all-orders">Click here to try again.</Link></p>
        </div>
      );
    }
  }

  render() {
    console.log('AllOrdersList', this.props.tourData);
    const {
      container,
    } = AllOrdersListStyles();

    return (
      <div style={container}>
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = state => ({ tourData: state.shopifyFetch });

export default connect(mapStateToProps)(AllOrdersList);
