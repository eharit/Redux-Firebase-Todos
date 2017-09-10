import "babel-polyfill"

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddelware from 'redux-saga';

import App from './components/app';
import reducers from './reducers';

import todoSagas from './sagas/sagas';

const sagaMiddleware = createSagaMiddelware();
const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.appContainer'));

sagaMiddleware.run(todoSagas)
