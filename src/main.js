import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
