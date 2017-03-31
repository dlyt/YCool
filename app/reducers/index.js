import { combineReducers } from 'redux'
import * as bookshelvesReducer from './bookshelves'
import * as NavigationReducer from './navigation'
import * as ReaderReducer from './reader'
import * as SearchReducer from './search'

export default combineReducers(Object.assign(
  bookshelvesReducer,
  NavigationReducer,
  ReaderReducer,
  SearchReducer,
))
