/**
 * Created by zhongyuqiang on 2017/10/9.
 */
import axios from 'axios'
axios.defaults.baseURL = 'http://192.168.22.139:8088';

axios.interceptors.request.use(function (config) {    // 这里的config包含每次请求的内容
  if (localStorage.vueToken) {
    if(config.url.split('/')[config.url.split('/').length-1]!=='login'){
      // 给login请求之外的所有请求添加header: token
      config.headers.token = localStorage.vueToken;
    }
  }
  return config;
}, function (err) {
  return Promise.reject(err);
});

export function login(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function post(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params})
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  login(obj){
    return login('/account/administrator/login', obj)
  },
  oLogin(obj){
    return login('/account/operateAccount/login', obj)
  },
  getOperatorList(obj){
    return get('/operator/list', obj)
  },
  getShopList(obj){
    return get('/shop/account/list', obj)
  },
  getOrderList(obj){
    return get('/order/tradeList', obj)
  },
  frozenAccount(obj){
    return post('/account/frozen', obj)
  },
  thawingAccount(obj){
    return post('/account/thawing', obj)
  },
  getShopInfoList(obj){
    return get('/shop/shopInfo/list', obj)
  },
  getUserInfoList(obj){
    return get('/user/userInfo/list', obj)
  },
  getCommunityList(obj){
    return get('community/list', obj)
  },
  getShopListAll(obj){
    return get('/shop/list', obj)
  },
  createShopInfo(obj){
    return post('/account/shopInfo/modify', obj)
  },
  regOperator(obj){
    return post('/account/operatAccount/register', obj)
  },
  regShop(obj){
    return post('/account/shopAccount/register', obj);
  },
  editShopAccount(obj){
    return post('/account/shopAccount/modify', obj)
  },
  editOperateAccount(obj){
    return post('/account/operatAccount/modify', obj)
  },
  createCharge(obj){
    return post('/shop/charge', obj);
  },
  getChargeList(obj){
    return get('/shop/charge/list', obj);
  },
  verifyPwd(obj){
    return post('/user/verificat/pwd', obj);
  },
  exportShopInfoList(obj){
    return get('/shop/shopInfo/list/excel/auto', obj)
  },
  exportUserList(obj){
    return get('/user/userInfo/list/excel/auto', obj)
  },
  dredge(obj){
    return post('/account/openAccountMoneyStatus', obj)
  }
}
