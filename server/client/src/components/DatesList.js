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
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { ACCENT_BLUE } from '../style/constants';
import { fetchProducts } from '../actions';
import Header from './Header';
import DatesListItem from './DatesListItem';
import ErrorMessage from './ErrorMessage';

const DatesListStyles = () => ({
  container: {
    marginLeft: 180,
    position: 'relative',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 24px 0px 24px',
  },
  buttonContainer: {
    padding: 24,
  },
  refreshIndicator: {
    position: 'relative',
    display: 'inline-block',
  },
});

class DatesList extends Component {
  static PropTypes = {
    tourData: PropTypes.object.isRequired,
  };

  static defaultProps = {
    fetchProductsSuccess: undefined,
  };

  componentDidMount() {
    console.log('==== DatesList mounted!');
    const tourId = this.props.user.currentTour.payload.tourId;
    this.props.dispatch(fetchProducts(tourId));
  }

  renderContent() {
    const { header, buttonContainer, refreshIndicator } = DatesListStyles();
    const {
      fetchProductsSuccess,
      fetchProductsRejected,
      fetchProductsPending,
    } = this.props.tourData;
    const tourId = this.props.user.currentTour.payload.tourId;
    const tourName = this.props.user.currentTour.payload.tourTitle || '';
    let vendorName = '';
    console.log('DatesList props:', this.props);
    if (fetchProductsPending) {
      return (
        <div className="dates-list__refresh-indicator" style={refreshIndicator}>
          <RefreshIndicator
            size={50}
            top={20}
            left={50}
            status="loading"
            loadingColor={ACCENT_BLUE}
          />
        </div>
      );
    } else if (fetchProductsSuccess) {
      const productList = Array.from(fetchProductsSuccess.payload);
      if (fetchProductsSuccess.payload.length > 0) {
        vendorName = productList[0].vendor;
      }
      return (
        <div>
          <Header
            pageTitle={'Tour Dates'}
            tourName={tourName}
            vendorName={vendorName}
          />
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Date & Location</TableHeaderColumn>
                <TableHeaderColumn>Bundle</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productList.map(product => (
                <DatesListItem
                  key={product.product_id}
                  title={product.title}
                  id={product.product_id}
                  variants={product.variants}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      );
    } else if (fetchProductsRejected) {
      return (
        <div>
          <ErrorMessage />
        </div>
      );
    }
  }

  render() {
    const { container } = DatesListStyles();

    return (
      <div className="datesList__container" style={container}>
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tourData: state.shopifyFetch,
  user: state.userAuth,
});

export default Radium(connect(mapStateToProps)(DatesList));
