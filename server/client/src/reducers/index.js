import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import ShopifyReducer from './ShopifyReducer';
import UserReducer from './UserReducer';

export default combineReducers({
  shopifyFetch: ShopifyReducer,
  userAuth: UserReducer,
  form: reduxForm,
});
