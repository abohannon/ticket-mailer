import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  FETCH_PRODUCTS,
  CREATE_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
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
    dispatch({ type: CREATE_USER_SUCCESS, payload: res.data });
  } catch (error) {
    console.log('Error creating user');
  }
};

export const loginUser = userData => (dispatch) => {
  console.log('before axios', userData);
  axios.post('/api/login', userData)
    .then((res) => {
      console.log('after axios, response from POST', res);
      window.sessionStorage.userId = res.data;
      dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data });
    }).catch((err) => {
      if (err) console.log('Error with login action', err);
    });
};
