import { FETCH_PRODUCTS } from '../actions/types';

const shopifyFetch = (state = null, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload || false;
    default:
      return state;
  }
};

export default shopifyFetch;
