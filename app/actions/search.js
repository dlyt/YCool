import { AsyncStorage } from 'react-native'
import * as types from './types'
import axios from 'axios'

export function searchNovelWords(text) {
  return (dispatch, getState) => {
    axios.get(`/novels/search/zh?keyword=${text}`)
      .then(
        (res) => dispatch(setSearchNovelWords({novelName: res.data.response.r}))
     )
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
    axios.get(`/novels/search/bqk?name=${name}`)
      .then(
        (res) => dispatch(setSearchNovelList({name: res.data.response}))
      )
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
    axios.post('/novels/acquire', json).then(
      (res) => dispatch(setSearchNovelInfo({novelInfo: res.data.novelInfo}))
    )
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
    axios.get('/test/img', {type: type})
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
