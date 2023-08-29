import axios from 'axios';
import { SECRET_URL } from '../../config';
import { MEMBER_SHORT_LIST, GET_ERROR } from '../types';
import { MemberShortInfo } from '../reducers/rootReducer';
import { Dispatch } from 'redux';

export const getSecret = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get(SECRET_URL);
    
      const message = atob(res.data.message);
      console.log(message); // TODO: store to redux
      dispatch ({
        type: MEMBER_SHORT_LIST,
        payload: message
      })
  } catch(error){
      dispatch( {
          type: GET_ERROR,
          payload: error,
      })
  }
}


// import {GET_USERS, USERS_ERROR} from '../types'
// import axios from 'axios'

// export const getUsers = () => async dispatch => {
    
//     try{
//         const res = await axios.get(`http://jsonplaceholder.typicode.com/users`)
//         dispatch( {
//             type: GET_USERS,
//             payload: res.data
//         })
//     }
//     catch(error){
//         dispatch( {
//             type: USERS_ERROR,
//             payload: error,
//         })
//     }

// }