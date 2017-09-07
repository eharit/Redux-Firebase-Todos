import {
  LOGIN,
  LOGOUT,
  USER_AUTHORIZED,
  USER_UNAUTHORIZED,
} from '../actions/types';

export default function authReducer(state=null, action) {
  switch(action.type) {
    case USER_AUTHORIZED:
    console.log('authReducer: ', USER_AUTHORIZED);
      return action.payload;
    case USER_UNAUTHORIZED:
    console.log('authReducer: ', USER_UNAUTHORIZED);
      return null;
  }
  return state;
}
