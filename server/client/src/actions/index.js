import axios from 'axios';
import { FETCH_PRODUCTS, CREATE_USER_SUCCESS } from './types';

// SHOPIFY ACTIONS

export const fetchProducts = () => async (dispatch) => {
  const res = await axios.get('/api/products');
  dispatch({ type: FETCH_PRODUCTS, payload: res.data });
};

// USER ACTIONS

export const createUser = userData => async (dispatch) => {
  const res = await axios.post('/api/create_user', userData);
  dispatch({ type: CREATE_USER_SUCCESS, payload: res.data });
};

// export const fetchOrders = () => {};
