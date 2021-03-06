import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import transformationRoutes from './transformationservice/router';

Vue.use(Router);

const baseRoutes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { title: 'Dashboard' },
  },
  {
    path: '/about',
    name: 'about',
    meta: { title: 'About' },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ './views/About.vue'),
  },
];

const routes = baseRoutes.concat(transformationRoutes);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
