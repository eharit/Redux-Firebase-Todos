import firebase from 'firebase';
import _ from 'lodash';
import {
  FETCH_TODOS,
  DELETE_TODO,
  CREATE_TODO,
  EMPTY_TODO_LIST,
  TOGGLE_DONE,
  CALL_FETCH_TODOS
} from './types';

import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

let Todos = null;

export function login(_this) {
  return dispatch => {
    auth.signInWithPopup(provider)
    .then((result) => {
      fetchTodos(_this);
    });
  }
}

export function logout(_this) {
  return dispatch => {
    auth.signOut()
    .then(() => {
      _this.setState({
        user: null,
      });
      dispatch({
        type: EMPTY_TODO_LIST,
        payload: null
      })
    });
  }
}

export function toggleDone(key, isDone) {
    // Thunk
    // return dispatch => Todos.child(key).update({"done": !isDone});

    // Saga
    // console.log('toggle_done dispatched')
    return {
      type: TOGGLE_DONE,
      payload: { key, isDone }
    }
}

export function fetchTodos(_this) {
  // Thunk
  return dispatch => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('user logged in');
        Todos = firebase.database().ref(`/todos/${user.uid}`)
        Todos.on('value', snapshot => {
          dispatch({
            type: FETCH_TODOS,
            payload: snapshot.val()
          });
          _this.setState({
            user
          });
        });
      } else {
        console.log('user is not logged in');
      }
    });
  };

  // Redux-Saga
  // return {
  //   type: CALL_FETCH_TODOS
  // }
}

export function createTodo(name, index) {
  // const todo = {
  //   name,
  //   timestamp: new Date().getTime(),
  //   indx: index,
  //   done: false
  // }
  // return dispatch => Todos.push(todo);

  return {
    type: CREATE_TODO,
    payload: { name, index }
  }
}

export function deleteTodo(key) {
  // return dispatch => Todos.child(key).remove();
  return {
    type: DELETE_TODO,
    payload: { key }
  }
}
