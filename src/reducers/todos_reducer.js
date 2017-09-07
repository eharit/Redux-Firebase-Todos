import _ from 'lodash';
import {
  FETCH_TODOS,
  CREATE_TODO,
  DELETE_TODO,
  USER_UNAUTHORIZED
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_TODOS:
      // console.log('reducer: ', action.payload);
      return action.payload;
    case CREATE_TODO:
      return { ...state, ...action.payload };
    case DELETE_TODO:
      return _.omit(state, action.payload);
    case USER_UNAUTHORIZED:
      return null;
  }
  return state;
}
