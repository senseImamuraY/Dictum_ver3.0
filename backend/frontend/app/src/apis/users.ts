import axios from "axios";

export const FetchUser = (userId: any) => {
  return axios.get(`http://localhost:3000/api/v1/users/${userId}`)
    // return axios.get(`http://localhost/api/v1/users/${userId}`)
    .then(res => {
      return res.data
    })
    .catch((e) => console.error(e))
}