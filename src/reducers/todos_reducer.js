import _ from 'lodash';
import {
  FETCH_TODOS,
  CREATE_TODO,
  DELETE_TODO,
  EMPTY_TODO_LIST
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_TODOS:
      // console.log(action.payload);
      return action.payload;
    case CREATE_TODO:
      return { ...state, ...action.payload };
    case DELETE_TODO:
      return _.omit(state, action.payload);
    case EMPTY_TODO_LIST:
      return action.payload;
  }
  return state;
}
