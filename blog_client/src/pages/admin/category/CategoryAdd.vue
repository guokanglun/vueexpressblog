<template>
    <div class="admin-category-add">
        <el-tabs type="border-card">
            <el-tab-pane label="分类添加">
                <el-input v-model="input" placeholder="分类名称"></el-input>
                <el-button type="primary" @click="addCategory">点击添加分类</el-button>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {reqAddCategory} from '../../../../src/api/index'
    export default {
        name: "CategoryAdd",
        data(){
            return{
                input: ''
            }
        },
        methods:{
            async addCategory(){
                const {input} = this;
                if(!input){
                    return this.$message({
                        message: '请添加分类',
                        type: 'warning'
                    });
                }
                const result = await reqAddCategory(input);
                if(result.code === 1){
                    this.$message({
                        message: '该分类已经存在',
                        type: 'warning'
                    });
                }else{
                    this.$message({
                        message: '分类添加成功',
                        type: 'success'
                    });
                    this.input = ''
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .el-input, .el-button, .admin-category-add{
        margin-top: 20px;
    }
</style>
