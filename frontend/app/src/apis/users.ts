import axios, { AxiosRequestConfig } from "axios";
import { usersShow } from "../urls/index";
import { useParams } from "react-router-dom";

const options: AxiosRequestConfig = {
  url: `${usersShow}`,
  method: "Get",
}


export const FetchUser = (userId: any) => {
  // const { usesId } = useParams();
  // console.log(usesId);
  // return axios.get("http://localhost:3001/api/v1/users/1")
  return axios.get(`http://localhost:3001/api/v1/users/${userId}`)
    // return axios(options)
    .then(res => {
      return res.data
    })
    .catch((e) => console.error(e))
}