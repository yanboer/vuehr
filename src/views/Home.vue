<template>
    <div>
        <el-container>
            <el-header class="homeHeader">
                <div class="title">微人事项目</div>
                <el-dropdown class="userInfo" @command="commandHandler">           <!-- 展示用户信息-->
                    <span class="el-dropdown-link">
                        {{user.name}}<i><img :src="user.userface"></img></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
                        <el-dropdown-item command="setting">设置</el-dropdown-item>
                        <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu router unique-opened>
                        <!-- this.$router.options.routes 拿到 routes数组-->
                        <!-- routes 指 Computed 方法内的 routes-->
                        <el-submenu :index="index+''" v-for="(item,index) in routes" v-if="!item.hidden" :key="index">
                            <template slot="title">
                                <i style="color: rebeccapurple;margin-right: 3px" :class="item.iconCls"></i>
                                <span>{{item.name}}</span>
                            </template>
<!--                            <el-submenu index="1-4">-->
<!--                                <template slot="title">选项1</template>-->
<!--                                <template slot="title">选项2</template>-->
<!--                            </el-submenu>-->
                            <el-menu-item :index="child.path" v-for="(child,indexj) in item.children" :key="indexj">
                                {{child.name}}
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <!-- element ui 的面包屑-->
                    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path != '/home'">
                        <!-- 点击首页回到首页-->
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <!-- 显示当前在那个 tag 下-->
                        <el-breadcrumb-item style="margin-bottom: 10px">{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="homeWelcome" v-if="this.$router.currentRoute.path == '/home'">
                        欢迎来到 vhr 管理系统！
                    </div>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data(){
            return{
                user: JSON.parse(window.sessionStorage.getItem('user')),
            }
        },
        computed: {
          routes(){
              return this.$store.state.routes;
          }
        },
        methods: {
            // menuClick(index){
            //     this.$router.push(index)        //跳转到 index 地址
            // },
            commandHandler(command){
                if(command == 'logout'){    //注销
                    this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }).then(() => {
                        this.getRequest('/logout');
                        window.sessionStorage.removeItem('user')
                        this.$store.commit('initRoutes',[]);        //注销要清空 store 里的数据
                        this.$router.replace('/');
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });
                }
            }
        }
    }
</script>

<style>
    .homeHeader {
        background: #6b7dff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 15px;
        box-sizing: border-box;
    }

    .homeHeader .title {
        font-size: 30px;
        font-family: 华文行楷;
        color: #cac6c6;
    }
    .homeHeader .userInfo{
        cursor: pointer;
    }
    .el-dropdown-link img{
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-left: 8px;
    }

    .el-dropdown-link{
        display: flex;
        align-items: center;
    }
    .homeWelcome{
        text-align: center;
        color: rebeccapurple;
        font-size: 30px;
        font-family: 华文行楷;
        padding-top: 30px;
    }

</style>