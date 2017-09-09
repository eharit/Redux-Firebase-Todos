import { DATA_LOADING, DATA_LOADED } from '../actions/types';

export default function appReducer(state=false, action) {
  switch(action.type) {
    case DATA_LOADING:
      console.log('loading data')
      return { loading: true };
    case DATA_LOADED:
      console.log('data loaded');
      return { loading: false };
  }
  return state;
}
