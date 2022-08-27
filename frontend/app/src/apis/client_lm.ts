import axios, { AxiosInstance, AxiosResponse } from "axios"



let client_lm: AxiosInstance

export default client_lm = axios.create({

  baseURL: "http://localhost/api/v1/users/",
  // baseURL: "http://localhost:3001/api/v1/users/",
  headers: {
    "Content-Type": "multipart/form-data"
  }
})

client_lm.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    const data = response.data
    return { ...response.data, data }
  }
)