<template>
    <div>
        <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
            <h3 class="loginTitle">系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <!-- @keydown.enter.native = 'submitLogin'  ===》按下回车登录(光标在密码框)-->
                <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"
                          @keydown.enter.native = 'submitLogin'></el-input>
            </el-form-item>
            <el-checkbox class="loginRemeber" v-model="checked"></el-checkbox>
            <el-button type="primary" style="width: 100%" @click="submitLogin">登录</el-button>
        </el-form>
    </div>
</template>

<script>
    // import {postKeyValueRequests} from "../utils/api";      //导入自定义方法

    export default {
        name: "Login",
        data(){
            return {
                loginForm: {
                    username:'admin',
                    password:'123',
                },
                checked: true,
                rules: {            //校验规则定义
                    username:[{required:true,message:"请输入用户名",trigger:"blur"}],
                    password:[{required:true,message:"请输入用户名",trigger:"blur"}]
                }
            }
        },
        methods:{
            submitLogin() {     //校验成功后执行
                // alert('submitLogin');
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {    //调用
                        this.postKeyValueRequests('/doLogin',this.loginForm).then(resp=>{       //main.js 中存了引用
                            if(resp){
                                // alert(JSON.stringify(resp))     //服务端返回数据
                                window.sessionStorage.setItem('user',JSON.stringify(resp.obj));
                                this.$router.replace('/home')      //不能手动回到登录页
                            }
                        })
                        // alert('submit!');
                    } else {
                        this.$message.error('请输入正确有效字段');
                        return false;
                    }
                });
            }
        },
    }
</script>

<style>
    .loginContainer{
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 20px 25px 15px 35px;
        background: aliceblue;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .loginTitle{
        margin: 10px auto 40px 20px;
        text-align: center;
        color: black;
    }
    .loginRemeber{
        text-align: left;
        margin: 0px 0px 20px 0px;
    }
</style>