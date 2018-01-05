import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Radium from 'radium';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import EditIcon from 'material-ui/svg-icons/content/create';
import OrdersListItem from './OrdersListItem';
import { fetchOrders } from '../actions';

const OrdersListStyles = () => ({
  container: {
    marginLeft: 180,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 24px 0px 24px',
  },
  buttonContainer: {
    padding: 24,
  },
});

class OrdersList extends Component {
  static PropTypes = {
    tourData: PropTypes.object.isRequired,
  }

  static defaultProps = {
    fetchProductsSuccess: undefined,
  }
  componentDidMount() {
    console.log('==== OrdersList mounted!');
  }

  renderContent() {
    const { fetchOrdersSuccess, fetchOrdersRejected } = this.props.tourData;
    const { history } = this.props;
    const { header, buttonContainer } = OrdersListStyles();
    let variantTitle = 'Bundle Orders';
    let vendor = '';
    const tourName = this.props.user.currentTour.payload;
    let showDate = '';
    if (fetchOrdersSuccess) {
      const ordersList = Array.from(fetchOrdersSuccess.payload);
      if (fetchOrdersSuccess.payload.length > 0) {
        variantTitle = ordersList[0].line_items[0].variant_title;
        vendor = ordersList[0].line_items[0].vendor;
        showDate = ordersList[0].line_items[0].title;
      }
      return (
        <div>
          <div className="header" style={header}>
            <div>
              <h1>{variantTitle}</h1>
              <h3>{vendor}</h3>
              <h3><Link to="#" onClick={history.goBack}>{tourName}</Link></h3>
              <h3>{showDate}</h3>
            </div>
            <div className="button" style={buttonContainer}>
              <Link to="/edit-email">
                <RaisedButton
                  label="Edit Details"
                  icon={<EditIcon />}
                />
              </Link>
            </div>
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
                  orderNumber={order.order_number}
                  customerName={order.shipping_address.name}
                  customerEmail={order.email}
                />
              )) }
            </TableBody>
          </Table>
        </div>
      );
    } else if (fetchOrdersRejected) {
      return (
        <div>
          <h2>Looks like there was a problem grabbing your data.</h2>
          <h2 onClick={() => { this.props.dispatch(fetchOrders('887373070340')); }}>Click here to try again.</h2>
          {/* TODO: Update with dynamic variant id */}
        </div>
      );
    }
  }

  render() {
    console.log('OrdersList props', this.props);
    const {
      container,
    } = OrdersListStyles();

    return (
      <div className="ordersList--container" style={container}>
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = state => ({ tourData: state.shopifyFetch, user: state.userAuth });

export default Radium(connect(mapStateToProps)(OrdersList));
