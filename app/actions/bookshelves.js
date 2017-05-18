import axios from 'axios'
import * as types from './types'
import { AsyncStorage } from 'react-native'
import setAuthorizationToken from '../lib/setAuthorizationToken'

export function getBookshelfFirst() {
  return (dispatch, getState) => {
    AsyncStorage.getItem(`userToken`).then(
      (res) => {
        if (!res) {
          axios.post('/users/tourists', json)
            .then((res) => {
              setAuthorizationToken(res.token)
              AsyncStorage.setItem(`userToken`, res.token)
            })
        }
        else{
          setAuthorizationToken(res)
          axios.get('/bookshelfs')
            .then(
              (res) => {
                dispatch(setSearchedBookshelves({ bookshelf: res.data.list }));
              },
              (err) => console.log(err)
            )
        }
      }
    )
  }
}

export function getBookshelf() {
  return (dispatch) => {
    axios.get('/bookshelfs').then(
      (res) => {
        dispatch(setSearchedBookshelves({ bookshelf: res.data.list }));
      },
      (err) => console.log(err)
    )
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
    return axios.post('/bookshelfs/order', {id: id})
  }
}

export function delect(id) {
  return (dispatch, getState) => {
    return axios.post('/bookshelfs/delect', {id: id})
  }
}




