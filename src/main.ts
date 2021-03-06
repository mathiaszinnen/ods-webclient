import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import TransformationModule from './transformationservice/module';

Vue.use(Vuetify, {
  iconfont: 'mdi',
});

Vue.use(Vuex);

Vue.config.productionTip = false;

export const store = new Vuex.Store({
  modules: {
    transformation: TransformationModule,
  },
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
