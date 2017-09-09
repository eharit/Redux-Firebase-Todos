import { combineReducers } from 'redux';
import todosReducer from './todos_reducer';
import authReducer from './auth_reducer';
import appReducer from './app_reducer'

const rootReducer = combineReducers({
  todos: todosReducer,
  user: authReducer,
  app: appReducer
});

export default rootReducer;
