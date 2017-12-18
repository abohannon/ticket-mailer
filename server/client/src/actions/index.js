import axios from 'axios';
import { FETCH_PRODUCTS } from './types';

export const fetchProducts = () => async (dispatch) => {
  const res = await axios.get('/api/products');
  dispatch({ type: FETCH_PRODUCTS, payload: res.data });
  console.log('products data', res.data);
};

export const fetchOrders = () => {};
