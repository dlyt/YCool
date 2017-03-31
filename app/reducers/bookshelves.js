import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const searchedBookshelves = createReducer({}, {
  [types.SET_SEARCHED_BOOKSHELVES](state, action) {
    return action.bookshelf
  },
})
