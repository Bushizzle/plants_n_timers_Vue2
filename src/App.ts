import Vue from 'vue';
import { i18n } from '@@/setup/i18n-setup';
import MainLayout from '@@/components/MainLayout.vue';
import PlantsList from '@@/components/plantsList/plantsList.vue';
import LoginPage from '@@/components/LoginPage.vue';
import store from '@@/store/index.ts';

import router from '@@/router';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  el: '#flimersApp',
  components: {
    PlantsList,
    LoginPage,
    MainLayout,
  }
});
