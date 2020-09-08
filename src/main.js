import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/js/utils/dialogDrag';
import './assets/css/summary.scss';
import './assets/js/utils/message';
import './assets/js/filters/filters';
import validateCheck from './assets/js/validator/validateCheck';

Vue.config.productionTip = false;
Vue.prototype.check = validateCheck;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
