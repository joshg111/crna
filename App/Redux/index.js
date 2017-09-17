// @flow

import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    login: require('./LoginRedux').reducer,
    register: require('./RegisterRedux').reducer,
    activate_user: require('./ActivateUserRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
