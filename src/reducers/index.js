import { combineReducers } from 'redux';
import todosReducer from './todos_reducer';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  todos: todosReducer,
  user: authReducer
});

export default rootReducer;
