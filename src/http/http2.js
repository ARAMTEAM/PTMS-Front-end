import axios from 'axios'  


//创建axios实例
var service = axios.create({
    baseURL: 'https://www.xx.com/v1/', 
    timeout: 5000, 
        headers: {
        'content-type': 'application/json',
        "token":'14a1347f412b319b0fef270489f'
    }
}) 
export default { 
  service,  

  //get请求
  get(url, data) {
      return service({
        url: url,
        method: 'get',
        data
      })
   },
   //post请求
   post(url, data) {
      return service({
        url: url,
        method: 'post',
        data
      })
   }
}