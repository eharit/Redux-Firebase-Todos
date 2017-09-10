import { APP_LOADING, APP_LOADING_FINISHED } from '../actions/types';

export default function appReducer(state=false, action) {
  switch(action.type) {
    case APP_LOADING:
      console.log('loading...')
      return { loading: true };
    case APP_LOADING_FINISHED:
      console.log('loading finished');
      return { loading: false };
  }
  return state;
}
