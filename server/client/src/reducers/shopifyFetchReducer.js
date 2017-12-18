import { FETCH_PRODUCTS } from '../actions/types';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload || false;
    default:
      return state;
  }
}
