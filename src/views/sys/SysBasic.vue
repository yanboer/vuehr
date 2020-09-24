<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="部门管理" name="first">
                <DepManager></DepManager>               <!-- 自定义组件使用-->
            </el-tab-pane>

            <el-tab-pane label="职位管理" name="second">
                <PosManager></PosManager>               <!-- 自定义组件使用-->
            </el-tab-pane>

            <el-tab-pane label="职称管理" name="third">
                <JobLevelManager></JobLevelManager>      <!-- 自定义组件使用-->
            </el-tab-pane>

            <el-tab-pane label="奖惩规则" name="fourth">
                <EcManager></EcManager>                 <!-- 自定义组件使用-->
            </el-tab-pane>

            <el-tab-pane label="权限组" name="five">
                <PermissManager></PermissManager>       <!-- 自定义组件使用-->
            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>
    import DepManager from "../../components/sys/basic/DepManager";
    import EcManager from "../../components/sys/basic/EcManager";
    import JobLevelManager from "../../components/sys/basic/JobLevelManager";
    import PermissManager from "../../components/sys/basic/PermissManager";
    import PosManager from "../../components/sys/basic/PosManager";

    export default {
        name: "SysBasic",
        data() {
            return{
                activeName:'first',
            }
        },
        components: {       //组件引入  ====》相当于自定义 html 标签
            'DepManager': DepManager,
            'EcManager': EcManager,
            'JobLevelManager': JobLevelManager,
            'PermissManager': PermissManager,
            'PosManager': PosManager,
        }
    }
</script>

<style scoped>

</style>