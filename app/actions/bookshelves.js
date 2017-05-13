import axios from 'axios'
import * as types from './types'
import { AsyncStorage } from 'react-native'

export function getBookshelf(uuid) {
  return (dispatch, getState) => {
    const json = { user: {uuid: uuid}}
    return AsyncStorage.getItem(`userToken`)
      .then((data) => {
        if (!data) {
          axios.post('/users/tourists', json)
            .then((_data) => {
              console.log(_data)
              AsyncStorage.setItem(`userToken`, _data.token)
              dispatch(setSearchedBookshelves({bookshelf: ''}));
            })
        }
        else {
          axios.get('/bookshelfs', '', data)
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
    // AsyncStorage.getItem('userToken')
    //   .then((data) => {
    //     console.log(data)
    //   })
    Request.post('/bookshelfs/order', {id: id}, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU4Yzk0OTk3ZDE4ZTIwMjRiNjYzNjBmYiIsImlhdCI6MTQ4OTgxMzYwNH0.kgCcISiRUTuagiaQMYO3cQ-R2sTo2z0X6HCpgSEkZq4')
  }
}

export function delect(id) {
  return (dispatch, getState) => {
    Request.post('/bookshelfs/delect', {id: id})
      .then((data) => {})
  }
}
