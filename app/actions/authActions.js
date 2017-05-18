// import axios from 'axios'
// import * as types from './types'
// import { AsyncStorage } from 'react-native'
// import DeviceInfo from 'react-native-device-info'
// import setAuthorizationToken from '../lib/setAuthorizationToken'

// export function getToken() {
//   const uuid = DeviceInfo.getUniqueID()
//   const json = { user: { uuid: uuid } }
//   return dispatch => {
//     AsyncStorage.getItem(`userToken`).then(
//       (res) => {
//         if (!res) {
//           axios.post('/users/tourists', json)
//             .then((res) => {
//               setAuthorizationToken(res.token)
//               AsyncStorage.setItem(`userToken`, res.token)
//             })
//         }
//         else{
//           setAuthorizationToken(res)
//         }
//       }
//     )
//   }
// }

