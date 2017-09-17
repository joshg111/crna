import { call, put } from 'redux-saga/effects'
import RegisterActions from '../Redux/RegisterRedux'
import LoginActions from '../Redux/LoginRedux'
import {getCache, setCache, removeCache} from '../Services/LocalStorage'

// attempts to login
export function * register (api, action) {
  const response = yield call(api.regUser, action.username, action.email, action.phone_number, action.password)
  console.log("before print response");
  console.log(response);
  console.log("after print response");
  if (response.ok) {
    // dispatch successful logins
    console.log("response.ok is true");
    yield call(setCache, 'login->user_id', response.data.data);
    // Dispatch a loginSuccess that way user info is in common place
    yield put(LoginActions.loginSuccess(response.data.data))

  }
  else {
    // dispatch failure
    console.log(response)
    yield put(RegisterActions.registerFailure('REGISTRATION FAILED'))

  }
}
