import { AsyncStorage } from 'react-native'
import * as types from './types'
import Request from '../lib/request'

export function getBookshelf(uuid) {

  return (dispatch, getState) => {
    const json = { user: {uuid: uuid}}
    return AsyncStorage.getItem('userToken')
      .then((data) => {
        if (!data) {
          Request.post('/users/tourists', json)
            .then((_data) => {
              AsyncStorage.setItem('userToken', _data.token)
              dispatch(setSearchedBookshelves({bookshelf: ''}));
            })
        }
        else {
          Request.get('/bookshelfs', '', data)
            .then((_data) => {
              dispatch(setSearchedBookshelves({bookshelf: _data.list}));
            })
        }
      })
  }
}

export function setSearchedBookshelves({ bookshelf }) {
  return {
    type: types.SET_SEARCHED_BOOKSHELVES,
    bookshelf,
  }
}

export function orderNovel(id) {
  return (dispatch, getState) => {
    AsyncStorage.getItem('userToken')
      .then((data) => {
        Request.post('/bookshelfs/order', {id: id}, data)
          .then((_data) => {})
      })
  }
}

export function delect(id) {
  return (dispatch, getState) => {
    Request.post('/bookshelfs/delect', {id: id})
      .then((data) => {})
  }
}
