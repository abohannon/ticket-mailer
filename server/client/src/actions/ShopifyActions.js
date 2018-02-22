import axios from 'axios';
import {
  FETCH_COLLECTIONS_PENDING,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_COLLECTIONS_REJECTED,
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_REJECTED,
  FETCH_ORDERS_PENDING,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_REJECTED,
  FETCH_ALL_ORDERS_PENDING,
  FETCH_ALL_ORDERS_SUCCESS,
  FETCH_ALL_ORDERS_REJECTED,
} from './types';

export const fetchCollections = () => async (dispatch) => {
  const action = {
    type: FETCH_COLLECTIONS_PENDING,
  };
  dispatch(action);
  console.log('&&&&& fetchCollections pending');
  try {
    const res = await axios.get('/api/collections');
    dispatch({ type: FETCH_COLLECTIONS_SUCCESS, payload: res.data });
    console.log('&&&&& fetchCollections success');
  } catch (error) {
    dispatch({ type: FETCH_COLLECTIONS_REJECTED, payload: error });
    console.log('&&&&& fetchCollections rejected');
  }
};

export const fetchProducts = collectionId => async (dispatch) => {
  let action = {
    type: FETCH_PRODUCTS_PENDING,
  };
  dispatch(action);
  console.log('&&&&& fetchProducts');
  try {
    const res = await axios.get(`/api/collection_products/${collectionId}`);
    const type =
      res.data.length > 0 ? FETCH_PRODUCTS_SUCCESS : FETCH_PRODUCTS_REJECTED;
    action = {
      type,
      payload: res.data,
    };
    dispatch(action);
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_REJECTED, payload: error });
  }
};

export const fetchOrders = variantId => async (dispatch) => {
  let action = {
    type: FETCH_ORDERS_PENDING,
  };
  dispatch(action);
  console.log('&&&&& fetchOrders');
  try {
    const res = await axios.get(`/api/orders/${variantId}`);
    const type =
      res.data.length > 0 ? FETCH_ORDERS_SUCCESS : FETCH_ORDERS_REJECTED;
    action = {
      type,
      payload: res.data,
    };
    dispatch(action);
  } catch (error) {
    dispatch({ type: FETCH_ORDERS_REJECTED });
  }
};

export const fetchAllOrders = () => async (dispatch) => {
  let action = {
    type: FETCH_ALL_ORDERS_PENDING,
  };
  dispatch(action);
  console.log('&&&&& fetchAllOrders pending');
  try {
    const res = await axios.get('/api/orders/');
    const type =
      res.data.length > 0
        ? FETCH_ALL_ORDERS_SUCCESS
        : FETCH_ALL_ORDERS_REJECTED;
    action = {
      type,
      payload: res.data,
    };
    dispatch(action);
    console.log('&&&&& fetchAllOrders success');
  } catch (error) {
    dispatch({ type: FETCH_ALL_ORDERS_REJECTED });
    console.log('&&&&& fetchAllOrders rejected');
  }
};
