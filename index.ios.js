import reducer from './app/reducers'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import React, { Component } from 'react'
import thunkMiddleware from 'redux-thunk'
import { AppRegistry, AsyncStorage } from 'react-native'
import AppContainer from './app/containers/AppContainer'
import setAuthorizationToken from './app/lib/setAuthorizationToken'
import { createStore, applyMiddleware, combineReducers, compose} from 'redux'

const loggerMiddleware = createLogger()
function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    ),
  )
  return createStore(reducer, initialState, enhancer)
}

const store = configureStore({})

AsyncStorage.getItem(`userToken`).then( (res) => {
  if (res) {
    setAuthorizationToken(res)
  }
})

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
)

AppRegistry.registerComponent('YCool', () => App)
