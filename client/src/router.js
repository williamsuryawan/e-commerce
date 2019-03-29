import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import NotFound from './views/NotFound.vue';
import Login from './views/Login.vue';
import LoginAdmin from './views/LoginAdmin.vue';

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
      component: () => import('./views/Products.vue'),
      children: [
            {
              path: 'register',
              name: 'addproduct',
              component: () => import('./components/ProductAdd.vue')
            },
            {
              path: ':id',
              name: 'product-details',
              component: () => import('./components/ProductDetails.vue'),
            }
          ],
    },
    {
      path: '/carts',
      name: 'cust-cart',
      component: () => import('./views/Cart.vue'),
    },
    {
      path: '/checkout',
      name: 'cust-checkout',
      component: () => import('./views/CheckOut.vue'),
    },
    {
        path: '/login',
        name: 'user-login',
        component: Login,
    },
    {
        path: '/admin',
        name: 'admin-login',
        component: LoginAdmin,
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound,
    },
  ],
});
