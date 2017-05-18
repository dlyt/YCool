import { AsyncStorage } from 'react-native'
import * as types from './types'
import axios from 'axios'

export function getFirstRenderChapters(id) {
  return (dispatch, getState) => {
    axios.get(`/chapters/firstRender/${id}`).then(
      (res) => {
        dispatch({
            type: types.GET_FIRST_RENDER_CHAPTER,
            firstRenderChapters: res.data.response
          })
      }
    )
  }
}

export function getChapter(id, num) {
  const json = {
    novelId: id,
    num: num
  }
  return (dispatch, getState) => {
    return axios.post(`/chapters`, json)
      .then((data) => {
        dispatch({
          type: types.SET_CHAPTER_DETAIL,
          data
        })
      })
  }
}

export function setChapterDetail({ chapterContent }) {
  return
}

export function getNextChatperDetail(id) {
  return (dispatch, getState) => {
    return axios.get(`/chapters/next/${id}`)
      .then( (res) => {
        dispatch(setNextChatperDetail({chapterContent: res.data.detail}));
      })
  }
}

export function setNextChatperDetail({ chapterContent }) {
  return {
    type: types.SET_NEXT_CHAPTER_DETAIL,
    chapterContent,
  }
}

export function getLastChapterDetail(id) {
  return (dispatch, getState) => {
    return axios.get(`/chapters/last/${id}`)
      .then( (res) => {
        dispatch(setLastChatperDetail({chapterContent: res.data.detail}));
      })
  }
}

export function setLastChatperDetail({ chapterContent }) {
  return {
    type: types.SET_LAST_CHAPTER_DETAIL,
    chapterContent,
  }
}

export function getDirectory(id, order = 1) {
  return (dispatch, getState) => {
    axios.get(`/novels/directory/${id}?order=${order}`)
      .then( (res) => {
        dispatch(setDirectory({results: res.data.results}));
      })
  }
}

export function setDirectory({ results }) {
  return {
    type: types.SET_DIRECTORY,
    results,
  }
}
