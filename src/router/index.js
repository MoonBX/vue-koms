import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/Home'
import OperateAccount from '@/components/OperateAccount'
import ShopAccount from '@/components/ShopAccount'
import ShopHeadAccount from '@/components/ShopHeadAccount'
import ShopInfo from '@/components/ShopInfo'
import ShopRecharge from '@/components/ShopRecharge'
import UserInfo from '@/components/UserInfo'
import Borrow from '@/components/Borrow'
import Trade from '@/components/Trade'
import Login from '@/components/Login'

Vue.use(Router);

export default new Router({
  routes: [
    {path: '/', redirect: '/home'},
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      children: [
        {
          path: 'home',
          name: '首页',
          component: Home
        },
        {
          path: 'operateAccount',
          name: '账号管理 - 运营账号',
          component: OperateAccount
        },
        {
          path: 'shopAccount',
          name: '账号管理 - 商家账号',
          component: ShopAccount
        },
        {
          path: 'shopHeadAccount',
          name: '账号管理 - 商家总部账号',
          component: ShopHeadAccount
        },
        {
          path: 'shopInfo',
          name: '商家管理 - 商家信息',
          component: ShopInfo
        },
        {
          path: 'shopRecharge',
          name: '商家管理 - 商家充值',
          component: ShopRecharge
        },
        {
          path: 'userInfo',
          name: '用户管理 - 用户信息',
          component: UserInfo
        },
        {
          path: 'borrow',
          name: '用户管理 - 借吧',
          component: Borrow
        },
        {
          path: 'trade',
          name: '交易明细',
          component: Trade
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        pageTitle: '登录'
      }
    }
  ]
})
