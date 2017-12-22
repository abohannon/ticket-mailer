import axios from 'axios';
import {
  FETCH_PRODUCTS,
  CREATE_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  FETCH_USER,
} from './types';

// SHOPIFY ACTIONS

export const fetchProducts = () => async (dispatch) => {
  const res = await axios.get('/api/products');
  dispatch({ type: FETCH_PRODUCTS, payload: res.data });
};

// USER ACTIONS

export const createUser = userData => async (dispatch) => {
  try {
    const res = await axios.post('/api/create_user', userData);
    console.log('created user data', res.data);
    dispatch({ type: CREATE_USER_SUCCESS, payload: res.data });
  } catch (error) {
    console.log('Error creating user');
  }
};

export const loginUser = userData => async (dispatch) => {
  try {
    const res = await axios.post('/api/login', userData);
    dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data });
    console.log(res);
  } catch (error) {
    console.log('Error logging in user', error);
  }
};

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};
