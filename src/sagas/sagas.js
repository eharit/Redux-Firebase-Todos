import { delay, eventChannel } from 'redux-saga';
import { call, put, takeEvery, takeLatest, all, take, select } from 'redux-saga/effects';
import firebase from 'firebase';

import { firebaseConfig } from '../actions/config';
import {
  TOGGLE_DONE,
  DELETE_TODO,
  CREATE_TODO,
  CHECK_AUTH,
  FETCH_TODOS,
  LOGIN,
  LOGOUT,
  USER_AUTHORIZED,
  USER_UNAUTHORIZED,
} from '../actions/types';

firebase.initializeApp(firebaseConfig);

const Provider = new firebase.auth.GoogleAuthProvider();
const Auth = firebase.auth();

let Todos = null;

function checkAuthChannel() {
  console.log('checkAuth Channel called')
  return eventChannel(emit => {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        console.log(`check`, user);
        const payload = user;
        emit({ type: USER_AUTHORIZED, payload })
      } else {
        console.log(`no users authorized`);
      }
    })
    return () => {}
  })
}

function* checkAuth() {
    console.log('checkAuth saga called')
    const channel = yield call(checkAuthChannel);
    while(true) {
      const action = yield take(channel);
      yield put(action);
    }
}

function fetchTodosChannel(data) {
  let id;
  if(!data.user){
    id = data.uid;
  } else {
    id = data.user.uid;
  };
  Todos = firebase.database().ref(`/todos/${id}`);
  return eventChannel(emit => {
    Todos.on('value', snapshot => {
      const payload = snapshot.val();
      emit({ type: FETCH_TODOS, payload })
    });
    return () => {};
  })
}

function* fetchTodos() {
    const getUser = (state) => state.user;
    const data = yield select(getUser);
    const channel = yield call(fetchTodosChannel, data);
    while(true) {
      const action = yield take(channel);
      yield put(action);
    }
}

function* login() {
  console.log('LOGIN');
  try {
    const payload = yield Auth.signInWithPopup(Provider);
    yield put({ type: USER_AUTHORIZED, payload });
  } catch(e) {
    console.error(e);
  }
}

function* logout() {
  console.log('LOGOUT');
  Auth.signOut();
  yield put({ type: USER_UNAUTHORIZED })
}

function* toggleDone({ payload: { key, isDone }}) {
  try {
    Todos.child(key).update({"done": !isDone})
  } catch(e) {
    console.error(e);
  }
}

function* deleteTodo({ payload: { key }}) {
  try {
    Todos.child(key).remove();
  } catch(e) {
    console.error(e);
  }
}

function* createTodo({ payload: { name, index }}) {
  const todo = {
    name: name,
    timestamp: new Date().getTime(),
    indx: index,
    done: false
  }
  try {
    Todos.push(todo);
  } catch(e) {
    console.error(e);
  }
}

export default function* todoSagas() {
  yield takeEvery(CHECK_AUTH, checkAuth)
  yield takeEvery(TOGGLE_DONE, toggleDone)
  yield takeEvery(DELETE_TODO, deleteTodo)
  yield takeEvery(CREATE_TODO, createTodo)
  yield takeEvery(LOGIN, login)
  yield takeEvery(LOGOUT, logout)
  yield takeEvery(USER_AUTHORIZED, fetchTodos)
}
