import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Products from './.views/Products.vue';
import NotFound from './.views/NotFound.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/products',
      name: 'products',
      component: Products,
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound,
    },
  ],
});
