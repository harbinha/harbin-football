import Vue from 'vue'
// import VueFire from 'vuefire'
// import Firebase from 'firebase'

import App from './App'
import router from './router'
import {config} from './firebaseConfig'

Vue.config.productionTip = false
// Vue.use(VueFire)
// let app = Firebase.initializeApp(config);
// let db = app.database({databaseURL: 'https://harbin-football.firebaseio.com/'});

new Vue({
  el: '#app',
  router,
  created: function () {},
  template: '<App/>',
  components: { App }
});
