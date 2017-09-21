import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Players from '@/components/Players'
import Week from '@/components/Week'
import Score from '@/components/Score'

Vue.use(Router);

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/players', name: 'Players', component: Players },
  { path: '/week/:week', name: 'Week', component: Week },
  { path: '/week', name: 'Week', component: Week },
  { path: '/score', name: 'Score', component: Score }
];
export default new Router({routes});