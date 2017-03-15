import { AsyncStorage } from 'react-native'
import * as types from './types'
import Request from '../lib/request'


export function searchNovelWords(text) {
  return (dispatch, getState) => {
    Request.get('/novels/search/zh', {keyword: text})
      .then((data) => {
        dispatch(setSearchNovelWords({novelName: data.response.r}))
      })
  }
}

export function setSearchNovelWords({ novelName }) {
  return {
    type: types.SET_SEARCH_NOVEL_WORDS,
    novelName,
  }
}

export function searchNovelList(name) {
  return (dispatch, getState) => {
    Request.get('/novels/search/bqk', {name: name})
      .then((data) => {
        dispatch(setSearchNovelList({name: data.response}))
      })
  }
}

export function setSearchNovelList({ name }) {
  return {
    type: types.SET_SEARCH_NOVEL_LIST,
    name,
  }
}

export function searchNovelInfo(name, url) {
  const json = {
    novel: {
      name: name,
      url: url
    }
  }
  return (dispatch, getState) => {
    AsyncStorage.getItem('userToken')
      .then((data) => {
        Request.post('/novels/acquire', json, data)
          .then((data) => {
            dispatch(setSearchNovelInfo({novelInfo: data.novelInfo}))
          })
      })
  }
}

export function setSearchNovelInfo({ novelInfo }) {
  return {
    type: types.SET_SEARCH_NOVEL_INFO,
    novelInfo,
  }
}

export function searchImg(type) {
  return (dispatch, getState) => {
    Request.get('/test/img', {type: type})
      .then((data) => {
        dispatch(getImg({imgUrl: data.url}))
      })
  }
}

export function getImg({ imgUrl }) {
  return {
    type: types.SEND_IMG,
    imgUrl,
  }
}
