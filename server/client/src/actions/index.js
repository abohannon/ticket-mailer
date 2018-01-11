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
  CURRENT_TOUR,
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

export const fetchProducts = collectionId => async (dispatch) => {
  let action = {
    type: FETCH_PRODUCTS_PENDING,
  };
  dispatch(action);
  try {
    const res = await axios.get(`/api/collection_products/${collectionId}`);
    const type = res.data.length > 0 ? FETCH_PRODUCTS_SUCCESS : FETCH_PRODUCTS_REJECTED;
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
  try {
    const res = await axios.get(`/api/orders/${variantId}`);
    const type = res.data.length > 0 ? FETCH_ORDERS_SUCCESS : FETCH_ORDERS_REJECTED;
    action = {
      type,
      payload: res.data,
    };
    console.log('fetchOrders:', res.data);
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
  try {
    const res = await axios.get('/api/orders/');
    const type = res.data.length > 0 ? FETCH_ALL_ORDERS_SUCCESS : FETCH_ALL_ORDERS_REJECTED;
    action = {
      type,
      payload: res.data,
    };
    console.log('fetchAllOrders:', res.data);
    dispatch(action);
  } catch (error) {
    dispatch({ type: FETCH_ALL_ORDERS_REJECTED });
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

export const updateTour = tourName => (dispatch) => {
  const type = CURRENT_TOUR;
  dispatch({
    type,
    payload: tourName,
  });
};

// Email ACTIONS

export const sendEmail = (values, history) => async (dispatch) => {
  const res = await axios.post('/api/email', values);
  console.log('sendEmail', res.body);
};
