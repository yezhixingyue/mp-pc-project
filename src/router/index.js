import Vue from 'vue';
import VueRouter from 'vue-router';
import CommonViewPage from '../views/Common/CommonViewPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/loginPage.vue'),
  },
  {
    path: '/findPassword',
    name: 'FindPassword',
    component: () => import('../views/Login/FindPasswordPage.vue'),
  },
  {
    path: '/common',
    name: 'common',
    component: () => import('../views/Common/CommonPage.vue'),
    redirect: 'placeOrder',
    children: [
      {
        path: '/placeOrder',
        name: 'placeOrder',
        meta: {
          requiresAuth: true,
          title: '名片之家 - 下单',
        },
        component: () => import('../views/PlaceOrder/PlaceOrderPage.vue'),
      },
      {
        path: '/OrderPreCreate',
        name: 'OrderPreCreate',
        meta: {
          requiresAuth: true,
          title: '名片之家 - 下单',
        },
        component: () => import('../views/PlaceOrder/OrderPreCreatePage.vue'),
      },
      {
        path: '/shopping',
        name: 'shopping',
        component: CommonViewPage,
        redirect: '/shopping/car',
        children: [
          {
            path: '/shopping/car',
            name: 'shoppingCar',
            meta: {
              requiresAuth: true,
              title: '名片之家 - 购物车',
            },
            component: () => import('../views/ShoppingCar/ShoppingCarPage.vue'),
          },
          {
            path: '/shopping/detail',
            name: 'shoppingCarDetail',
            meta: {
              requiresAuth: true,
              title: '名片之家 - 购物车产品详情',
            },
            component: () => import('../views/ShoppingCar/ShoppingCarDetailPage.vue'),
          },
          {
            path: '/shopping/submit',
            name: 'shoppingCar/submit',
            meta: {
              requiresAuth: true,
              title: '名片之家 - 购物车订单提交',
            },
            component: () => import('../views/ShoppingCar/ShoppingCarSubmitPage.vue'),
          },
        ],
      },
      {
        path: '/bill',
        name: 'bill',
        meta: {
          requiresAuth: true,
          title: '名片之家 - 账单',
        },
        component: () => import('../views/Bill/BillPage.vue'),
      },
      {
        path: '/mySetting',
        name: 'mySetting',
        component: () => import('../views/mySettingPages/mySettingCommonPage.vue'),
        redirect: '/mySetting/account',
        children: [
          {
            path: '/mySetting/account',
            name: 'mySettingAccount',
            meta: {
              requiresAuth: true,
              title: '账户信息',
            },
            component: () => import('../views/mySettingPages/AccountPage.vue'),
          },
          {
            path: '/mySetting/address',
            name: 'mySettingAddress',
            meta: {
              requiresAuth: true,
              title: '收货地址',
            },
            component: () => import('../views/mySettingPages/AddressPage.vue'),
          },
          {
            path: '/mySetting/couponCenter',
            name: 'mySettingCouponCenter',
            meta: {
              requiresAuth: true,
              title: '领券中心',
            },
            component: () => import('../views/mySettingPages/CouponCenterPage.vue'),
          },
          {
            path: '/mySetting/myCoupons',
            name: 'mySettingMyCoupons',
            meta: {
              requiresAuth: true,
              title: '我的优惠券',
            },
            component: () => import('../views/mySettingPages/MyCouponsPage.vue'),
          },
          {
            path: '/mySetting/subAccountManage',
            name: 'subAccountManage',
            meta: {
              requiresAuth: true,
              title: '子账号管理',
            },
            component: () => import('../views/mySettingPages/SubAccountManagePage.vue'),
          },
          {
            path: '/mySetting/changePwd',
            name: 'mySettingChangePwd',
            meta: {
              requiresAuth: true,
              title: '修改密码',
            },
            component: () => import('../views/mySettingPages/ChangePwdPage.vue'),
          },
          {
            path: '/mySetting/changeMobile',
            name: 'mySettingChangeMobile',
            meta: {
              requiresAuth: true,
              title: '修改手机号',
            },
            component: () => import('../views/mySettingPages/ChangeMobilePage.vue'),
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
