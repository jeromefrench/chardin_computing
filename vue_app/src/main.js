import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Default from "./components/layouts/default.vue";
import vuetify from './plugins/vuetify';

Vue.component('default-layout', Default);


Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
