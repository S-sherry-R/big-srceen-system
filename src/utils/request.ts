//axios二次封装：使用请求和响应拦截器
import axios from "axios";
//创建实例，配置路径，超时时间
const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})
request.interceptors.response.use((response)=>{
  //成功回调
  return response.data
},(error)=>{
  //失败回调
  let message = ''
  const status =error.response.status
  switch (status) {
    case 401:
      message = 'TOKEN过期'
      break
    case 403:
      message = '无权访问'
      break
    case 404:
      message = '请求地址错误'
      break
    case 500:
      message = '服务器出现问题'
      break
    default:
      message = '网络出现问题'
      break
  }
  //提示错误语法
  alert(message)
  return Promise.reject(error)
})

export default request
