import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Players from '@/components/Players'

Vue.use(Router);

const routes = [
  { path: '/', name: 'Hello', component: Hello },
  { path: '/players', name: 'Players', component: Players }
];
export default new Router({
  routes
});
