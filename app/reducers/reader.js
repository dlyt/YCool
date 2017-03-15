import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const chapterContent = createReducer({}, {
  [types.SET_CHAPTER_DETAIL](state, action) {
    return action.chapterContent
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
    return action.directory
  },
});
