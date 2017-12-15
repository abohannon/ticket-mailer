import { combineReducers } from 'redux';
import shopifyFetchReducer from './shopifyFetchReducer';

export default combineReducers({
  shopifyFetch: shopifyFetchReducer,
});
