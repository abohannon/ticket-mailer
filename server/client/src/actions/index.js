import axios from 'axios';
import {
  FETCH_COLLECTIONS_PENDING,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_COLLECTIONS_REJECTED,
  FETCH_PRODUCTS_PENDING,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_REJECTED,
  CREATE_USER_SUCCESS,
  CREATE_USER_PENDING,
  CREATE_USER_REJECTED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_PENDING,
  LOGIN_USER_REJECTED,
  FETCHED_USER_SUCCESS,
  FETCHED_USER_PENDING,
  FETCHED_USER_REJECTED,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_PENDING,
  LOGOUT_USER_REJECTED,
} from './types';

// SHOPIFY ACTIONS

export const fetchCollections = () => async (dispatch) => {
  const action = {
    type: FETCH_COLLECTIONS_PENDING,
  };
  dispatch(action);
  try {
    const res = await axios.get('/api/collections');
    dispatch({ type: FETCH_COLLECTIONS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: FETCH_COLLECTIONS_REJECTED, payload: error });
  }
};

export const fetchProducts = () => async (dispatch) => {
  const action = {
    type: FETCH_PRODUCTS_PENDING,
  };
  dispatch(action);
  try {
    const res = await axios.get('/api/products');
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_REJECTED, payload: error });
  }
};

// USER ACTIONS

export const createUser = userData => async (dispatch) => {
  const action = {
    type: CREATE_USER_PENDING,
  };
  dispatch(action);
  try {
    const res = await axios.post('/api/create_user', userData);
    console.log('created user data', res.data);
    dispatch({ type: CREATE_USER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: CREATE_USER_REJECTED, payload: error });
    console.log('Error creating user');
  }
};

export const loginUser = userData => async (dispatch) => {
  let action = {
    type: LOGIN_USER_PENDING,
  };
  dispatch(action);
  try {
    const res = await axios.post('/api/login', userData);
    const type = res.data.success === true ? LOGIN_USER_SUCCESS : LOGIN_USER_REJECTED;
    action = {
      type,
      payload: res.data,
    };
    dispatch(action);

    console.log('loginUser action', res);
  } catch (error) {
    dispatch({ type: LOGIN_USER_REJECTED, payload: error });
    console.log('Error logging in user', error);
  }
};

export const logoutUser = () => async (dispatch) => {
  const action = {
    type: LOGOUT_USER_PENDING,
  };
  dispatch(action);
  try {
    const res = axios.get('/api/logout');
    dispatch({ type: LOGOUT_USER_SUCCESS, payload: res.data });
    console.log('User logged out');
  } catch (error) {
    dispatch({ type: LOGOUT_USER_REJECTED, payload: error });
    console.log('Error logging out', error);
  }
};

export const fetchUser = () => async (dispatch) => {
  const action = {
    type: FETCHED_USER_PENDING,
  };
  dispatch(action);
  try {
    const res = await axios.get('/api/current_user');
    const type = res.data !== '' ? FETCHED_USER_SUCCESS : FETCHED_USER_REJECTED;
    console.log('fetchUser action', res);
    dispatch({
      type,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: FETCHED_USER_REJECTED, payload: error });
    console.log('Error fetching user', error);
  }
};
