import { useReducer } from 'react';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { FetchUser } from '../../apis/users';
import { initialState, usersActionTypes, usersReducer } from '../../reducers/users';

export const Users = (props: any) => {
  const { usersId } = useParams();
  const [state, dispatch] = useReducer(usersReducer, initialState);
  // console.log(props.match);
  // console.log(DEFAULT_API_LOCALHOST);
  // const { usesId } = useParams();
  useEffect(() => {
    dispatch({ type: usersActionTypes.FETCHING });
    FetchUser(usersId)
      .then((data) =>
        // console.log(data)
        dispatch({
          type: usersActionTypes.FETCH_SUCCESS,
          payload: {
            users: data
          }
        })

      )
  }, [usersId])

  return (

    <>
      <p>マイページです</p>
      {
        state.usersList.map((user: any) =>
          <div key={user.id}>
            <h1>{user.name}</h1>
          </div>
        )}
    </>
  )
}