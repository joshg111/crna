// @flow
import { AppRegistry, Text, StyleSheet, AsyncStorage } from 'react-native';
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {getCache, setCache} from '../Services/LocalStorage'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginStartup: null,
  loginStartupSuccess: ['user_id'],
  loginRequest: ['username', 'password'],
  loginSuccess: ['user_id'],
  loginFailure: ['error'],
  loginResetError: null,
  logoutSuccess: null,
  logout: null
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user_id: null,
  error: null,
  fetching: false,
  startup_fetching: false,
  logout_fetching: false
})

/* ------------- Reducers ------------- */

export const startup = (state: Object) =>
{
    return state.merge({startup_fetching: true})
}

export const startup_success = (state: Object, {user_id}: Object) =>
{
    return state.merge({startup_fetching: false, user_id})
}

// we're attempting to login
export const request = (state: Object) => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state: Object, { user_id }: Object) =>
{
  console.log("loginSuccess");
  console.log("user_id = " + user_id);
  return state.merge({ fetching: false, error: null, user_id });
}

// we've had a problem logging in
export const failure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error })

export const reset_error = (state: Object) => state.merge({error: null})

// we've logged out
export const logout = (state: Object) =>
  state.merge({ logout_fetching: true })

export const logout_success = (state: Object) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_STARTUP]: startup,
  [Types.LOGIN_STARTUP_SUCCESS]: startup_success,
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGIN_RESET_ERROR]: reset_error,
  [Types.LOGOUT_SUCCESS]: logout_success,
  [Types.LOGOUT]: logout
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState: Object) => loginState.username !== null
