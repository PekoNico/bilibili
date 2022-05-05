import axios from "axios";
import Storage from "./storageUtil"

const instance = axios.create({
  // baseURL: 'https://api.bilibili.com/x/web-interface/',
  timeout: 10000,
  withCredentials: true
})


instance.interceptors.request.use(config => {
  //请求头设置
  let token = Storage.getData('token') || ''
  config.headers.Authorization = token
  return config
}, err => {
  console.log(err);
})

export default function request({ type = 'get', url, data, params }) {
  return instance({
    type,
    url,
    data,
    params
  })
}