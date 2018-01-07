import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import shopifyFetchReducer from './shopifyFetchReducer';
import userAuthReducer from './userAuthReducer';

export default combineReducers({
  shopifyFetch: shopifyFetchReducer,
  userAuth: userAuthReducer,
  form: reduxForm,
});
