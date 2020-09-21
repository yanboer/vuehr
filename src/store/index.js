import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * vuex  ===> 数据封装，实现数据共享和重用
 */
export default new Vuex.Store({
    state:{
        routes:[        //路由数组

        ]
    },
    mutations:{
        initRoutes(state,data){
            state.routes = data;
        }
    },
    actions:{

    },
})