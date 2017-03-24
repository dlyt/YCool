import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const chapterInfo = createReducer({}, {
  [types.SET_CHAPTER_DETAIL](state, action) {
    return action.data.response
  },
  [types.SET_NEXT_CHAPTER_DETAIL](state, action) {
    return action.chapterContent
  },
  [types.SET_LAST_CHAPTER_DETAIL](state, action) {
    return action.chapterContent
  },
});

export const directory = createReducer({}, {
  [types.SET_DIRECTORY](state, action) {
    return action.results
  },
});

export const firstRenderChapters = createReducer({}, {
  [types.GET_FIRST_RENDER_CHAPTER](state, action) {
    return action.firstRenderChapters
  },
});
