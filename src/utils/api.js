import axios from 'axios'
import { Message } from 'element-ui';

//异常封装      ----> 响应拦截器
axios.interceptors.response.use(success => {       //响应 200 进入 data
    if(success.status && success.status == 200 && success.data.status == 500){  //业务错误
        Message.error({message: success.data.msg})           //展示服务端 responseBean 内容
        return      //拿不到数据则请求失败
    }
    if(success.data.msg){       //有消息   打印提示信息
        Message.success({message: success.data.msg})
    }
    return success.data;
},error => {       //响应 400 及以上进入 error
    if(error.response.status == 504 || error.response.status == 404){
        Message.error({message:"服务器被吃了"})
    }else if(error.response.status == 403){
        Message.error({message:"权限不足，请联系管理员"})
    }else if(error.response.status == 401){
        Message.error({message:"尚未登录，请登录后重试"})
    }else{
        if(error.response.data.msg){
            Message.error({message: error.response.data.msg})
        }else{
            Message.error({message:"发生未知错误"})
        }
    }
    return;
})

let base = "";      //统一加前缀

export const postKeyValueRequests=(url,params)=>{
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest:[function (data) {
            let ret = '';
            for (let i in data){
                ret += encodeURIComponent(i) + '=' +encodeURIComponent(data[i]) + '&';
            }
            return ret;
        }],
        header:{
           'Content-Type':'application/x-www-form-urlencoded'
        }
    })
}

//封装请求
export const postRequest=(url,params)=>{
    return axios({
        method: 'post',
        url: `${base}${url}`,       //倒引号
        data:params
    })
}

export const putRequest=(url,params)=>{
    return axios({
        method: 'put',
        url: `${base}${url}`,       //倒引号
        data:params
    })
}

export const getRequest=(url,params)=>{
    return axios({
        method: 'get',
        url: `${base}${url}`,       //倒引号
        data:params
    })
}

export const deleteRequest=(url,params)=>{
    return axios({
        method: 'delete',
        url: `${base}${url}`,       //倒引号
        data:params
    })
}

