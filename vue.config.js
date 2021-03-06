let proxyObj = {};

//前后端接口对接
proxyObj['/'] = {
    ws: false,
    target: 'http://localhost:8081',     //请求转发到 8081
    changeOrigin: true,
    pathRewrite: {
        '^/':'' //不修改请求
    }
}
module.exports = {        //导出
    devServer: {
        host: 'localhost',
        port: '8080',
        proxy: proxyObj
    }
}