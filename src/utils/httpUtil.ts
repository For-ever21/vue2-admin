import axios from "axios";
import { Message } from "element-ui";
import ResponseHelper from "@/dataTypes/impl/ResponseHelper";
import { IResponse } from "@/dataTypes/interface/responseHelper";
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
});

//这里的拦截代码需根据具体的项目来设置
// 请求拦截
// request interceptor
service.interceptors.request.use(
  (config: any) => {
    // do something before request is sent
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    return config;
  },
  (error: any) => {
    // do something with request error
    return Promise.reject(error);
  }
);
// 响应拦截
// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response: any) => {
    if (response.status == 200) {
      return response;
    } else {
      return Promise.reject(response);
    }
  },
  (error: any) => {
    // return Promise.reject(error)
    return Promise.reject(error);
  }
);

function handleErrorMessage(message: string): void {
  Message.error(message);
}
// export default service;
export function request(option: any): Promise<ResponseHelper> {
  return service(option)
    .then(
      (res: any): ResponseHelper => {
        return new ResponseHelper(res as IResponse);
      }
    )
    .catch(
      (err: any): Promise<ResponseHelper> => {
        // const message = err.response.data.message
        const message = err.message;
        handleErrorMessage(message);
        return Promise.resolve(
          new ResponseHelper({
            code: -1,
            message: message,
            data: null
          })
        );
      }
    );
}
const util: Record<string, any> = {};

util.request = request;

util.get = (url: string, data?: any): Promise<ResponseHelper> => {
  return request({
    url,
    method: "get",
    params: data || {}
  });
};

util.post = (url: string, data?: any): Promise<ResponseHelper> => {
  return request({
    url,
    method: "post",
    data: data || {}
  });
};
export default util;
