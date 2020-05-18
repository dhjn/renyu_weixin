/**
 * Created by darren on 2018/08/04.
 */
import axios from 'axios';
import { encrypt, encryptNew,encryptNew1,encryptNew2, encryptGzh, encryptNewGzh} from '../lib/util';
import qs from 'qs'
/*
* 获取后台数据的公用方法
* 安全级别None
* params 为对象
* */
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});
export const getDataLevelNone = (params) => {
  const requestData = {
    data: params,
    level: "None"
  };
  let data = qs.stringify(encrypt(requestData.level, requestData.data));
  return axios({
    method: 'post',
    withCredentials: true,  //跨域请求时是否需要使用凭证
    url: pubsource.pub_getlink,
    data:data
  })
};
export const getDataLevelNoneGzh = (params) => {  // 微信公众号的方法
  const requestData = {
    data: params,
    level: "None"
  };
  let data = qs.stringify(encryptGzh(requestData.level, requestData.data));
  return axios({
    method: 'post',
    withCredentials: true,  //跨域请求时是否需要使用凭证
    url: pubsource.pub_getlink,
    data:data
  })
};
export const getDataLevelUserLoginGzh =(params) => { // 微信公众号的方法
  const requestData = {
    data: params,
    level: "UserLogin",
  };
  let data = qs.stringify(encryptGzh(requestData.level, requestData.data))
  // console.log(data)
  return axios({
    method: 'post',
    withCredentials: true,  //跨域请求时是否需要使用凭证
    url: pubsource.pub_getlink,
    data:data,
  })
}
export const getDataLevelUserLoginNewGzh = (params) => {
  const requestData = {
    data: params,
    level: "UserLogin"
  };
  let data = qs.stringify(encryptNewGzh(requestData.level, requestData.data))
  return axios({
    method: 'post',
    withCredentials: true,  //跨域请求时是否需要使用凭证
    url: pubsource.pub_getlink,
    data:data
  })
};
export const getDataLevelNoneNew = (params) => {
  const requestData = {
    data: params,
    level: "None"
  };
  let data = qs.stringify(encryptNew(requestData.level, requestData.data))
  return axios({
    method: 'post',
    withCredentials: true,  //跨域请求时是否需要使用凭证
    url: pubsource.pub_getlink,
    data:data
  })
};


/*
 * 获取后台数据的公用方法
 * 安全级别UserLogin
 * params 为对象
 * */
 export const getDataLevelUserLogin=(params) => {
  const requestData = {
    data: params,
    level: "UserLogin",
  };
  let data = qs.stringify(encrypt(requestData.level, requestData.data))
  // console.log(data)
  return axios({
    method: 'post',
    withCredentials: true,  //跨域请求时是否需要使用凭证
    url: pubsource.pub_getlink,
    data:data,
  })
}
/*
 * 获取后台数据的公用方法
 * 安全级别UserLogin
 * params 为对象
 * 不加companyid
 * */
export const getDataLevelUserLoginNew=(params) => {
  params.companyId = pubsource.companyId
  const requestData = {
    data: params,
    level: "UserLogin",
  };
  // console.log(params)
  let data = qs.stringify(encryptNew(requestData.level, requestData.data));
  return axios({
    method: 'post',
    withCredentials: true,  //跨域请求时是否需要使用凭证
    url: pubsource.pub_getlink,
    data:data,
  })
}
/* 特殊处理 */
export const getDataLevelUserLoginNew1=(params) => {
  console.log(params)
  params.companyId = pubsource.companyId
  const requestData = {
    data: params,
    level: "UserLogin",
  };
  // console.log(params)
  let data = qs.stringify(encryptNew1(requestData.level, requestData.data))
  console.log(data)
  return axios({
    method: 'post',
    url: pubsource.pub_getlink,
    data:data,
  })
}

/* 特殊处理 */
export const getDataLevelUserLoginNew2=(params) => {
  console.log(params)
  params.companyId = pubsource.companyId
  const requestData = {
    data: params,
    level: "UserLogin",
  };
  // console.log(params)
  let data = qs.stringify(encryptNew2(requestData.level, requestData.data));
  return axios({
    method: 'post',
    withCredentials: true,  //跨域请求时是否需要使用凭证
    url: pubsource.pub_getlink,
    data:data,
  })
}

//上传头像
export const uploadimage=(data)=>{
  let url = pubsource.pub_pubf_uploadlink
  return axios({
    withCredentials: true,
    headers:{'Content-Type':'multipart/form-data'},
    method: 'post',
    url: url,
    data: data,
  })
}
//上传文件私有云
export const uploadFile=(data)=>{
  let storage = window.localStorage;
  // console.log(storage.token)
  let url = pubsource.pub_prvf_uploadlink+"&_tk="+encodeURIComponent(storage.token)
  return axios({
    withCredentials: true,
    headers:{'Content-Type':'multipart/form-data'},
    method: 'post',
    url: url,
    data: data,
  })
}


