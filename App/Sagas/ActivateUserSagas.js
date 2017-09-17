import { call, put, select } from 'redux-saga/effects'
import ActivateUserActions from '../Redux/ActivateUserRedux'

// exported to make available for tests
export const selectUserId = (state) => state.login.user_id

// attempts to login
export function * activateUser (api, action) {
  const user_id = yield select(selectUserId)

  const response = yield call(api.activateUser, user_id, action.activation_code)
  console.log(response);
  if (response.ok) {
    // dispatch successful logins
    console.log("response.ok is true");
    yield put(ActivateUserActions.activateUserSuccess())

  }
  else {
    // dispatch failure
    yield put(ActivateUserActions.activateUserFailure('ACTIVATION FAILED, server error'))

  }
}
