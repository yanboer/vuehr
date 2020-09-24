<!-- 组件化开发，方便进行管理 -->
<template>      <!-- template 只能有一个 div-->
    <div>
        <div>
            <el-input
                    size="small"
                    style="width: 300px;margin-right: 10px"
                    placeholder="添加职位..."
                    prefix-icon="el-icon-s-tools"
                    v-model="pos.name">
            </el-input>
            <el-button type="primary" size="small" >添加</el-button>
        </div>
        <div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "DepManager",
        data() {
            return {
                pos: {
                    name:''
                }
            }
        }
    }
</script>

<style scoped>

</style>