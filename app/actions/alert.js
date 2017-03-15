import { AsyncStorage } from 'react-native';
import * as types from './types'


export function alertReaderOptions() {

  return (dispatch, getState) => {
    dispatch(setAlertReaderOptions({show: true}));
  }
}

export function setAlertReaderOptions({ show }) {
  return {
    type: types.SET_ALERT_READER_OPTIONS,
    show,
  }
}
