import { AsyncStorage } from 'react-native';
import * as types from './types'
import Request from '../lib/request'

export function getChapterDetail(id) {
  return (dispatch, getState) => {
    Request.get(`/chapters/${id}`, '')
      .then((data) => {
        dispatch(setChapterDetail({chapterContent: data.detail}));
      })
  }
}

export function setChapterDetail({ chapterContent }) {
  return {
    type: types.SET_CHAPTER_DETAIL,
    chapterContent,
  }
}

export function getNextChatperDetail(id) {
  return (dispatch, getState) => {
    Request.get(`/chapters/next/${id}`, '')
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
    Request.get(`/chapters/last/${id}`, '')
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
        dispatch(setDirectory({directory: data.directory}));
      })
  }
}

export function setDirectory({ directory }) {
  return {
    type: types.SET_DIRECTORY,
    directory,
  }
}
