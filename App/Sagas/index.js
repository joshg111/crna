import { takeLatest, all } from 'redux-saga/effects'
import RegisterApi from '../Services/RegisterApi'
import LoginApi from '../Services/LoginApi'
import ActivateUserApi from '../Services/ActivateUserApi'

/* ------------- Types ------------- */

import { LoginTypes } from '../Redux/LoginRedux'
import { RegisterTypes } from '../Redux/RegisterRedux'
import { ActivateUserTypes } from '../Redux/ActivateUserRedux'

/* ------------- Sagas ------------- */

import { login, login_startup, logout } from './LoginSagas'
import { register } from './RegisterSagas'
import { activateUser } from './ActivateUserSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const registerApi = RegisterApi.create();
const login_api = LoginApi.create();

/* ------------- Connect Types To Sagas ------------- */

const root = function * root () {
  yield all([
    takeLatest(LoginTypes.LOGIN_REQUEST, login, login_api),
    takeLatest(LoginTypes.LOGOUT, logout),
    takeLatest(LoginTypes.LOGIN_STARTUP, login_startup),
    takeLatest(RegisterTypes.REGISTER_REQUEST, register, registerApi),
    takeLatest(ActivateUserTypes.ACTIVATE_USER_REQUEST, activateUser, ActivateUserApi.create()),

  ])
}

export default root;
