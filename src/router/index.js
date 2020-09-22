import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'      //注册 view 页面

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden:true   //标记
  },{
    path: '/home',
    name: 'Home',
    component: Home,
    hidden:true   //标记
  },
]

const router = new VueRouter({
  routes
});

export default router
