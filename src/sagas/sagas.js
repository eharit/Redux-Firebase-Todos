import { delay, eventChannel } from 'redux-saga';
import { call, put, takeEvery, takeLatest, all, take } from 'redux-saga/effects';
import firebase from 'firebase';

import { firebaseConfig } from '../actions/config';
import {
  TOGGLE_DONE,
  DELETE_TODO,
  CREATE_TODO,
  CALL_FETCH_TODOS,
  FETCH_TODOS,
  LOGIN,
  LOGOUT,
  USER_AUTHORIZED,
  USER_UNAUTHORIZED
} from '../actions/types';

firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

function fetchTodosChannel(data) {
    const Todos = firebase.database().ref(`/todos/${data.payload.user.uid}`);
    return eventChannel(emit => {
      Todos.on('value', snapshot => {
        const payload = snapshot.val();
        emit({ type: FETCH_TODOS, payload })
      });
      return () => {};
    })
}

function* fetchTodos(data) {
    const channel = yield call(fetchTodosChannel, data);
    while(true) {
      const action = yield take(channel);
      yield put(action);
    }
}

function* login() {
  console.log('LOGIN');
  try {
    const payload = yield auth.signInWithPopup(provider);
    yield put({ type: CALL_FETCH_TODOS, payload });
  } catch(e) {
    console.error(e);
  }
}

function* logout() {
  yield console.log('LOGOUT');
}

function* toggleDone(action) {
  try {
    Todos.child(action.payload.key).update({"done": !action.payload.isDone})
  } catch(e) {
    console.error(e);
  }
}

function* deleteTodo(action) {
  try {
    Todos.child(action.payload.key).remove();
  } catch(e) {
    console.error(e);
  }
}

function* createTodo(action) {
  const todo = {
    name: action.payload.name,
    timestamp: new Date().getTime(),
    indx: action.payload.index,
    done: false
  }
  try {
    Todos.push(todo);
  } catch(e) {
    console.error(e);
  }
}

export default function* todoSagas() {
  yield takeEvery(TOGGLE_DONE, toggleDone)
  yield takeEvery(DELETE_TODO, deleteTodo)
  yield takeEvery(CREATE_TODO, createTodo)
  yield takeEvery(LOGIN, login)
  yield takeEvery(LOGOUT, logout)
  yield takeEvery(CALL_FETCH_TODOS, fetchTodos)
}
