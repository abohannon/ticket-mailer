import {
  CREATE_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  FETCH_USER,
} from '../actions/types';

const userAuthReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
    case FETCH_USER:
      return Object.assign({}, state, { payload: action.payload });
    default:
      return state;
  }
};

export default userAuthReducer;
