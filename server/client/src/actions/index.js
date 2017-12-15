import axios from 'axios';
import { FETCH_COLLECTIONS } from './types';

export const fetchCollections = () => async (dispatch) => {
  const res = await axios.get('/api/collections');
  dispatch({ type: FETCH_COLLECTIONS, payload: res.data });
  console.log('collections data', res.data);
};

export const fetchOrders = () => {};
