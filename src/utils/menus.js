/**
 *  方法封装：
 *      将后端字符串转为对象
 */

import {getRequest} from "./api";

//用户登录成功之后调用
export const initMenu=(router,store)=>{
    if(store.state.routes.length > 0){      //有数据   ===》正常跳转,直接返回
        return;
    }
    getRequest("system/config/menu").then(data=>{
        if(data){       //请求到数据了
            let fmtRoutes = formatRoutes(data);     //格式化字符串， 字符串   ===》想要的东西
            router.addRoutes(fmtRoutes);
            store.commit('initRoutes',fmtRoutes);   //调用 store/index.js 里的 initRoutes 方法初始化 routes[]
        }
    })
}

export const formatRoutes=(routes)=>{
    let fmRoutes = [];      //要返回数据
    /**
     * 批量变量定义
     *      相当于
     *          let path = router.path;
     *          let component = router.component;
     */
    routes.forEach(router=>{
        let{
            path,
            component,
            name,
            meta,
            iconCls,
            children,
        } = router;
        if(children && children instanceof Array){  //有 children 且它是数组形式    ====> 一级菜单 children
            children = formatRoutes(children);      //递归调用
        }
        let fmRouter = {
            path: path,
            name: name,
            iconCls: iconCls,
            meta: meta,
            children: children,      //格式化后的 children
            component(resolve){
                //'../views/xxx/' + component + '.vue'      ====》拼接 .vue 文件的完整路径
                if(component.startWith("Emp")){
                    require(['../views/emp/' + component + '.vue'],resolve);
                } else if(component.startWith("Per")){
                    require(['../views/per/' + component + '.vue'],resolve);
                } else if(component.startWith("Sal")){
                    require(['../views/sal/' + component + '.vue'],resolve);
                } else if(component.startWith("Sta")){
                    require(['../views/sta/' + component + '.vue'],resolve);
                } else if(component.startWith("Sys")){
                    require(['../views/sys/' + component + '.vue'],resolve);
                }
            }
        }
        fmRoutes.push(fmRouter);
    })
    return fmRoutes;
}