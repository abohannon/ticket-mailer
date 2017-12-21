import { CREATE_USER_SUCCESS, LOGIN_USER_SUCCESS } from '../actions/types';

const userAuthReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, { payload: action.payload });
    default:
      return state;
  }
};

export default userAuthReducer;
