import { combineReducers } from 'redux';
import shopifyFetchReducer from './shopifyFetchReducer';
import userAuthReducer from './userAuthReducer';

export default combineReducers({
  shopifyFetch: shopifyFetchReducer,
  userAuth: userAuthReducer,
});
