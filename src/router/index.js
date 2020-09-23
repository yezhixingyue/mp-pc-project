import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
          title: '名片之家下单',
        },
        component: () => import('../views/PlaceOrder/PlaceOrderPage.vue'),
      },
      {
        path: '/OrderPreCreate',
        name: 'OrderPreCreate',
        meta: {
          requiresAuth: true,
          title: '名片之家下单',
        },
        component: () => import('../views/PlaceOrder/OrderPreCreatePage.vue'),
      },
      {
        path: '/shoppingCar',
        name: 'shoppingCar',
        meta: {
          requiresAuth: true,
          title: '购物车',
        },
        component: () => import('../views/ShoppingCar/ShoppingCarPage.vue'),
      },
      {
        path: '/shoppingCarDetail',
        name: 'shoppingCarDetail',
        meta: {
          requiresAuth: true,
          title: '购物车产品详情',
        },
        component: () => import('../views/ShoppingCar/ShoppingCarDetailPage.vue'),
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
