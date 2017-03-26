import { AsyncStorage } from 'react-native';
import * as types from './types'
import Request from '../lib/request'

export function getFirstRenderChapters(id) {
  return (dispatch, getState) => {
    AsyncStorage.getItem('userToken')
      .then((token) => {
        Request.get(`/chapters/firstRender/${id}`, '', token)
          .then((res) => {
            dispatch({
              type: types.GET_FIRST_RENDER_CHAPTER,
              firstRenderChapters: res.response
            });
          })
      })
      .catch( (e) => {
        console.log(e);
      })
  }
}



export function getChapter(id, num) {
  const json = {
    novelId: id,
    num: num
  }
  return (dispatch, getState) => {
    return Request.post(`/chapters`, json)
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
    return Request.get(`/chapters/next/${id}`, '')
      .then( (data) => {
        dispatch(setNextChatperDetail({chapterContent: data.detail}));
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
    return Request.get(`/chapters/last/${id}`, '')
      .then( (data) => {
        dispatch(setLastChatperDetail({chapterContent: data.detail}));
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
    Request.get(`/novels/directory/${id}`, {order: order})
      .then( (data) => {
        dispatch(setDirectory({results: data.results}));
      })
  }
}

export function setDirectory({ results }) {
  return {
    type: types.SET_DIRECTORY,
    results,
  }
}
