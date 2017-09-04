import { call, put, takeEvery, all } from 'redux-saga/effects';
import firebase from 'firebase';

import { TOGGLE_DONE, DELETE_TODO, CREATE_TODO, CALL_FETCH_TODOS, FETCH_TODOS } from '../actions/types';

const user = {
  uid : 'rD2ye9CvO4Mt4d2N4spp2iQQ7y13'
};

const Todos = firebase.database().ref(`/todos/${user.uid}`);

function* listenToAuthChange(action) {

}

function* getTodos() {

}

function* toggleDone(action) {
  try {
    Todos.child(action.payload.key).update({"done": !action.payload.isDone})
    yield
  } catch (e) {
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
  // yield takeEvery(CALL_FETCH_TODOS, getTodos)
}
