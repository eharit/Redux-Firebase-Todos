import firebase from 'firebase';
import _ from 'lodash';
import {
  FETCH_TODOS,
  DELETE_TODO,
  CREATE_TODO,
  EMPTY_TODO_LIST,
  TOGGLE_DONE,
  CALL_FETCH_TODOS,
  LOGIN,
  LOGOUT
} from './types';

// Thunks
// import { firebaseConfig } from './config';
//
// firebase.initializeApp(firebaseConfig);
// const provider = new firebase.auth.GoogleAuthProvider();
// const auth = firebase.auth();

let Todos = null;

export function fetchTodos(app) {
  // Thunk
  // return dispatch => {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       // console.log('user logged in');
  //       Todos = firebase.database().ref(`/todos/${user.uid}`)
  //       Todos.on('value', snapshot => {
  //         dispatch({
  //           type: FETCH_TODOS,
  //           payload: snapshot.val()
  //         });
  //         app.setState({
  //           user
  //         });
  //       });
  //     } else {
  //     }
  //   });
  // };

  // Redux-Saga
  return {
    type: CALL_FETCH_TODOS
  }
}

export function login(app) {
  // Thunk
  // return dispatch => {
  //   auth.signInWithPopup(provider)
  //   .then((result) => {
  //     fetchTodos(app);
  //   });
  // }

  // Saga
  return {
    type: LOGIN,
  }
}

export function logout(app) {
  // Thunk
  // return dispatch => {
  //   auth.signOut()
  //   .then(() => {
  //     app.setState({
  //       user: null,
  //     });
  //     dispatch({
  //       type: EMPTY_TODO_LIST,
  //       payload: null
  //     })
  //   });
  // }

  // Saga
  return {
    type: LOGOUT,
  }
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
