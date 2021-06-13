import Vue from 'vue';
import VueRouter from 'vue-router';
import Board from '../views/Board.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';


Vue.use(VueRouter);

const routes = [{
  path: '/register',
  component: Register
},
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/board',
    name: 'Board',
    component: Board,
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});



export default router;