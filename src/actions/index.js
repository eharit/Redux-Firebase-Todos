import {
  FETCH_TODOS,
  DELETE_TODO,
  CREATE_TODO,
  EMPTY_TODO_LIST,
  TOGGLE_DONE,
  CHECK_AUTH,
  LOGIN,
  LOGOUT
} from './types';

let Todos = null;

export function checkAuth() {
  console.log('checkAuth action fired')
  return {
    type: CHECK_AUTH
  }
}

export function login() {
  return {
    type: LOGIN
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}

export function createTodo(name, index) {
  return {
    type: CREATE_TODO,
    payload: { name, index }
  }
}

export function deleteTodo(key) {
  return {
    type: DELETE_TODO,
    payload: { key }
  }
}

export function toggleDone(key, isDone) {
    return {
      type: TOGGLE_DONE,
      payload: { key, isDone }
    }
}
