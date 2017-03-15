import ReactNative from 'react-native';
const { NavigationExperimental, StatusBar} = ReactNative;
import * as types from '../actions/types'
import createReducer from '../lib/createReducer'
import ApplicationTabs from '../containers/ApplicationTabs'
import Reader from '../containers/Reader'
import Search from '../containers/Search'
import Directory from '../containers/Directory'

const {
 CardStack: NavigationCardStack,
 StateUtils: NavigationStateUtils
} = NavigationExperimental

const allTabs = [
  (lastRoute) => lastRoute || Object.assign({ key: 'home', index: 0 }),
  (lastRoute) => lastRoute || Object.assign({ key: 'about', index: 1 }),
];

export const tabs = createReducer({ index: 0, key: 'home', routes: allTabs }, {
  [types.SET_TAB](state, action) {
    return Object.assign({}, state,  allTabs[action.index]());
  }
});

export const navigationState = createReducer({ index: 0,
    routes: [
      { key: 'ApplicationTabs' },
    ],
  }, {

  [types.NAVIGATION_FORWARD](state, action) {
    // if (state.routes[state.index].key === (action.state && action.state.key)) return state
    return NavigationStateUtils.push(state, action.state);
  },


  [types.NAVIGATION_BACK](state, action) {
    return NavigationStateUtils.pop(state,action);
  },

  [types.NAV_RESET](state, action) {
    return action
  },

});

export const navigationParams = createReducer({ }, {
  [types.NAVIGATION_FORWARD](state, action) {
    return action.state;
  },
  [types.NAVIGATION_BACK](state, action) {
    return action.state;
  },
});
