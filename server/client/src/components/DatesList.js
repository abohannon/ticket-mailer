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
import RaisedButton from 'material-ui/RaisedButton';
import EditIcon from 'material-ui/svg-icons/content/create';
import { fetchProducts } from '../actions';
import DatesListItem from './DatesListItem';

const DatesListStyles = () => ({
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

class DatesList extends Component {
  static PropTypes = {
    tourData: PropTypes.object.isRequired,
  }

  static defaultProps = {
    fetchProductsSuccess: undefined,
  }

  componentDidMount() {
    console.log('==== DatesList mounted!');
  }

  renderContent() {
    const { fetchProductsSuccess, fetchProductsRejected } = this.props.tourData;
    const { pathname } = this.props;
    const tourName = this.props.user.currentTour.payload || '';
    const { header, buttonContainer } = DatesListStyles();
    console.log('DatesList props:', this.props);
    let vendorName = '';
    if (fetchProductsSuccess) {
      const productList = Array.from(fetchProductsSuccess.payload);
      if (fetchProductsSuccess.payload.length > 0) {
        vendorName = productList[0].vendor;
      }
      return (
        <div>
          <div className="header" style={header}>
            <div>
              <h1>Tour Dates</h1>
              <h3>{vendorName}</h3>
              <h3>{tourName}</h3>
            </div>
            <div className="button" style={buttonContainer}>
              <RaisedButton
                label="Edit Tour Info"
                icon={<EditIcon />}
              />
            </div>
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
                  pathname={pathname}
                />
              )) }
            </TableBody>
          </Table>
        </div>
      );
    } else if (fetchProductsRejected) {
      <div>
        <h2>Looks like there was a problem grabbing your data.</h2>
        <h2 onClick={() => { this.props.dispatch(fetchProducts('1625882628')); }}>Click here to try again.</h2>
        {/* TODO: Update with dynamic collection id */}
      </div>;
    }
  }

  render() {
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

const mapStateToProps = state => ({ tourData: state.shopifyFetch, user: state.userAuth });

export default Radium(connect(mapStateToProps)(DatesList));
