import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import OrdersListItem from './OrdersListItem';
import { fetchAllOrders } from '../actions';
import { ACCENT_BLUE, LIGHT_BLUE } from '../style/constants';

const AllOrdersListStyles = () => ({
  container: {
    marginLeft: 180,
  },
  header: {
    display: 'flex',
    padding: '0px 24px 0px 24px',
  },
  fieldStyle: {
    margin: '24px 0 0 24px',
  },
  hintStyle: {
    color: LIGHT_BLUE,
  },
  inputStyle: {
    color: LIGHT_BLUE,
  },
  underlineStyle: {
    borderColor: ACCENT_BLUE,
  },
  refreshIndicator: {
    position: 'relative',
    display: 'inline-block',
  },
});

class AllOrdersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
  }

  componentDidMount() {
    console.log('==== All Orders List Mounted!');
    this.props.dispatch(fetchAllOrders());
  }

  handleSearchInput = (event) => {
    this.setState({ search: event.target.value });
    console.log('search input', this.state.search);
  }

  renderContent() {
    const {
      header,
      fieldStyle,
      hintStyle,
      inputStyle,
      underlineStyle,
      refreshIndicator,
    } = AllOrdersListStyles();

    const { fetchAllOrdersSuccess, fetchAllOrdersRejected, fetchAllOrdersPending } = this.props.tourData;

    if (fetchAllOrdersPending) {
      return (<div className="all-orders-list__refresh-indicator" style={refreshIndicator}>
        <RefreshIndicator size={50} top={20} left={50} status="loading" loadingColor={ACCENT_BLUE} />
      </div>);
    } else if (fetchAllOrdersSuccess) {
      const ordersList = Array.from(fetchAllOrdersSuccess.payload);
      const filteredOrders = ordersList.filter(order => (order.email.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || order.order_number.toString().indexOf(this.state.search) !== -1));

      return (<div>
        <div className="header" style={header}>
          <h1>All Orders</h1>
          <TextField name="search" style={fieldStyle} hintText="Search" hintStyle={hintStyle} inputStyle={inputStyle} underlineFocusStyle={underlineStyle} value={this.state.search} onChange={event => this.handleSearchInput(event)} />
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
            {filteredOrders.map(order => (<OrdersListItem key={order.id} id={order.id} orderNumber={order.order_number} customerName={order.shipping_address.name} customerEmail={order.email} />))}
          </TableBody>
        </Table>
      </div>);
    } else if (fetchAllOrdersRejected) {
      return (<div>
        <p>Looks like there was a problem grabbing your data.</p>
        <p>
          <Link to="/all-orders">Click here to try again.</Link>
        </p>
      </div>);
    }
  }

  render() {
    const { container } = AllOrdersListStyles();

    return (<div style={container}>
      {this.renderContent()}
    </div>);
  }
}

const mapStateToProps = state => ({ tourData: state.shopifyFetch });

export default connect(mapStateToProps)(AllOrdersList);
