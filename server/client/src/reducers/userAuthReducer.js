import { CREATE_USER_SUCCESS } from '../actions/types';

export default function (state = null, action) {
  switch (action.type) {
    case CREATE_USER_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
