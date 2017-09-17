// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  activateUserRequest: ['activation_code'],
  activateUserSuccess: [],
  activateUserFailure: ['error']
})

export const ActivateUserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isSuccess: false,
  fetching: false,
  error: null
})

/* ------------- Reducers ------------- */

// We're attempting to activate user
export const request = (state: Object) => state.merge({ fetching: true })
//
// // we've successfully logged in
export const success = (state: Object) =>
  state.merge({ fetching: false, error: null })
//
// // we've had a problem logging in
export const failure = (state: Object, { error }: Object) =>
  state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACTIVATE_USER_REQUEST]: request,
  [Types.ACTIVATE_USER_SUCCESS]: success,
  [Types.ACTIVATE_USER_FAILURE]: failure
})

/* ------------- Selectors ------------- */
