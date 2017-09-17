// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  registerRequest: ['username', 'email', 'phone_number', 'password'],
  registerSuccess: ['username'],
  registerFailure: ['error']
})

export const RegisterTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  username: null,
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state: Object) => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state: Object, { username }: Object) =>
  state.merge({ fetching: false, error: null, username: username })

// we've had a problem logging in
export const failure = (state: Object, { error }: Object) =>
{
  console.log("inside register failure(..)");
  return state.merge({ fetching: false, error });
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_REQUEST]: request,
  [Types.REGISTER_SUCCESS]: success,
  [Types.REGISTER_FAILURE]: failure
})

/* ------------- Selectors ------------- */
