
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
  switch (action.type) {
    case usersActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case usersActionTypes.FETCH_SUCCESS:
      console.log(action.payload)
      return {
        fetchState: REQUEST_STATE.OK,
        usersList: [action.payload.users],
      };

    default:
      throw new Error();
  }
}
