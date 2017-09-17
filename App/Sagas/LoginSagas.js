import { call, put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import {getCache, setCache, removeCache} from '../Services/LocalStorage'

// attempts to login
export function * login (api, { username, password }) {
  if (password === '') {
    // dispatch failure
    yield put(LoginActions.loginFailure('LOGIN FAILED, password is empty'))
  } else {
    // Joshuag 1/9/17: TODO: Send login request to server
    const response = yield call(api.login_user, username, password)
    if (response.ok)
    {
      // Dispatch successful logins
      // Joshuag 1/9/17: TODO: setCache and loginSuccess to be the token/user_id
      console.log("before setCache");
      yield call(setCache, 'login->user_id', response.data.data.token);
      console.log("after setCache");
      yield put(LoginActions.loginSuccess(response.data.data.token))
    }
    else
    {
      yield put(LoginActions.loginFailure('LOGIN FAILED, ' + response.data.msg))
    }
  }
}

// Initialize user_id from AsyncStorage
export function * login_startup () {

    // Dispatch successful login startup
    const user_id = yield call(getCache, 'login->user_id');
    yield put(LoginActions.loginStartupSuccess(user_id));


}

// Initialize user_id from AsyncStorage
export function * logout () {
    // Dispatch successful login startup
    yield call(removeCache, 'login->user_id');
    yield put(LoginActions.logoutSuccess())

}
