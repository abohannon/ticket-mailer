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

export const loginUser = userData => (dispatch) => {
  console.log('before axios', userData);
  axios.post('/api/login', userData)
    .then((res) => {
      if (res.status !== 200) console.log('Error with login', res.status);
      // set user in local storage with timestamp
      const currentUser = {
        id: res.data,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem('user', JSON.stringify(currentUser));
      dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data });
    }).catch((err) => {
      if (err) console.log('Error with login action', err);
    });
};

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');
  console.log('current user', res);

  dispatch({ type: FETCH_USER, payload: res.data });
};
