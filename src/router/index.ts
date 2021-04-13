import Vue from 'vue';
import VueRouter from 'vue-router';

import MainLayout from '@@/components/MainLayout.vue';
import LoginPage from '@@/components/LoginPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    name: 'index',
    component: MainLayout,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: 'login',
    name: 'login',
    component: LoginPage,
    meta: {
      guest: true,
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      });
    } else {
      const user = JSON.parse((localStorage as any).getItem('user'))
      if(to.matched.some(record => record.meta.is_admin)) {
        if(user.is_admin == 1){
          next();
        }
        else{
          next({ name: 'index'});
        }
      } else {
        next();
      }
    }
  } else if(to.matched.some(record => record.meta.guest)) {
    if(localStorage.getItem('jwt') == null){
      next();
    }
    else{
      next({ name: 'index'});
    }
  }else {
    next();
  }
});

export default router;
