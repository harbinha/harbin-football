import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Players from '@/components/Players'
import Week from '@/components/Week'
import Scores from '@/components/Scores'

Vue.use(Router);

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/players', name: 'Players', component: Players },
  { path: '/week/:week', name: 'Week', component: Week },
  { path: '/week', name: 'Week', component: Week },
  { path: '/scores', name: 'Scores', component: Scores }
];
export default new Router({routes});