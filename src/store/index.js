import Vue from 'vue';
import Vuex from 'vuex';
import common from './common';
import summary from './summary';
import shoppingCar from './shoppingCar';
import timeSelectModule from './timeSelectModule';
import Quotation from './Quotation/Quotation';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    common,
    summary,
    Quotation,
    shoppingCar,
    timeSelectModule,
  },
});
