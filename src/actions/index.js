import firebase from 'firebase';
import _ from 'lodash';
import {
  FETCH_TODOS,
  DELETE_TODO,
  CREATE_TODO,
  EMPTY_TODO_LIST
} from './types';

import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

const userDemo = {
  id : 'rD2ye9CvO4Mt4d2N4spp2iQQ7y13'
}

let Todos = null;

export function login(_this) {
  return dispatch => {
    auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      console.log("Id of user logged in:", user.uid);
      Todos = firebase.database().ref(`/todos/${user.uid}`)
      _this.setState({
        user
      });
      _this.props.fetchTodos();
    });
  }
}

export function toggleDone(key, isDone) {
    return dispatch => Todos.child(key).update({"done": !isDone});
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

export function fetchTodos() {
  return dispatch => {
    Todos.on('value', snapshot => {
      dispatch({
        type: FETCH_TODOS,
        payload: snapshot.val()
      });
    });
  };
}

export function createTodo(name, length) {
  const todo = {
    name,
    timestamp: new Date().getTime(),
    indx: length,
    done: false
  }
  console.log(name, todo);
  return dispatch => Todos.push(todo);
}

export function deleteTodo(key) {
  return dispatch => Todos.child(key).remove();
}
