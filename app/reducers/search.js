import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const searchedNovelName = createReducer({}, {
  [types.SET_SEARCH_NOVEL_WORDS](state, action) {
    return action.novelName
  },
});

export const searchedNovelInfo = createReducer({}, {
  [types.SET_SEARCH_NOVEL_INFO](state, action) {
    return action.novelInfo
  },
});

export const searchedNovelList = createReducer({}, {
  [types.SET_SEARCH_NOVEL_LIST](state, action) {
    return action.name
  },
});

export const searchedImg = createReducer({}, {
  [types.SEND_IMG](state, action) {
    return action.imgUrl
  },
});
