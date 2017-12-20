import { CREATE_USER_SUCCESS, LOGIN_USER_SUCCESS } from '../actions/types';

export default function (state = null, action) {
  switch (action.type) {
    case CREATE_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
      console.log('client: reducer', action.payload);
      return action.payload;
    default:
      return state;
  }
}
