import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const showAlertNovelOptions = createReducer({}, {
  [types.SET_ALERT_READER_OPTIONS](state, action) {
    return action.show
  },

});
