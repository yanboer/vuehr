import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'   //引入 store
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {initMenu} from "./utils/menus";
import 'font-awesome/css/font-awesome.min.css'

import {postRequest} from "./utils/api";
import {postKeyValueRequests} from "./utils/api";
import {putRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {getRequest} from "./utils/api";

Vue.prototype.postRequest = postRequest;    //引用
Vue.prototype.postKeyValueRequests = postKeyValueRequests;    //引用
Vue.prototype.putRequest = putRequest;    //引用
Vue.prototype.deleteRequest = deleteRequest;    //引用
Vue.prototype.getRequest = getRequest;    //引用


Vue.config.productionTip = false

Vue.use(ElementUI);

//全局导航守卫    ===》 类似于后端的拦截器
router.beforeEach((to, from, next) => {
  // console.log(to)                  //to  ===》要去的页面
  // console.log(from)                //from  ===》从哪个页面来的
  // next();                          //过滤器往下走
  if(to.path=='/'){   //去 /login 页面 就直接放行
      next()
  } else{             //去 其它页面就初始化 menu(initMenu)
      initMenu(router,store);
      next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
