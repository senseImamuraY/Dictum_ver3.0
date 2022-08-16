
// import { act } from 'react-dom/test-utils';
import { REQUEST_STATE } from '../constants';

export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  usersList: [],
};

export const usersActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS'
}

export const usersReducer = (state: any, action: any) => {
  // console.log(state)
  // console.log(action)
  switch (action.type) {
    case usersActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case usersActionTypes.FETCH_SUCCESS:
      console.log(action.payload)
      // let a= Array.from(action.payload.users);
      // console.log(a)
      // let array = [...action.payload.users];
      // console.log(array)
      return {
        fetchState: REQUEST_STATE.OK,
        usersList: [action.payload.users],
        // usersList: a,

      };

    default:
      throw new Error();
  }
}
