import { FETCH_COLLECTIONS } from '../actions/types';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_COLLECTIONS:
      return action.payload || false;
    default:
      return state;
  }
}
