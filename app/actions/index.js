import * as BookshelfActions from './bookshelves'
import * as NavigationActions from './navigation'
import * as ReaderActions from './reader'
import * as SearchActions from './search'
import * as AuthActions from './authActions'

export const ActionCreators = Object.assign({},
  AuthActions,
  ReaderActions,
  SearchActions,
  BookshelfActions,
  NavigationActions,
)

