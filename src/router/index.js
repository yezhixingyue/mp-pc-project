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
        redirect: 'shoppingCar',
        children: [
          {
            path: '/shoppingCar',
            name: 'shoppingCar',
            meta: {
              requiresAuth: true,
              title: '名片之家 - 购物车',
            },
            component: () => import('../views/ShoppingCar/ShoppingCarPage.vue'),
          },
          {
            path: '/shoppingCar/detail',
            name: 'shoppingCarDetail',
            meta: {
              requiresAuth: true,
              title: '名片之家 - 购物车产品详情',
            },
            component: () => import('../views/ShoppingCar/ShoppingCarDetailPage.vue'),
          },
          {
            path: '/shoppingCar/submit',
            name: 'shoppingCar/submit',
            meta: {
              requiresAuth: true,
              title: '名片之家 - 购物车订单提交',
            },
            component: () => import('../views/ShoppingCar/ShoppingCarSubmitPage.vue'),
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
