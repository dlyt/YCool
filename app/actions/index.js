import * as BookshelfActions from './bookshelves'
import * as NavigationActions from './navigation'
import * as ReaderActions from './reader'
import * as SearchActions from './search'

export const ActionCreators = Object.assign({},
  BookshelfActions,
  NavigationActions,
  ReaderActions,
  SearchActions,
);
