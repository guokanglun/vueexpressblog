<template>
    <div class="admin-user">
        <el-tabs type="border-card">
            <el-tab-pane label="分类列表">
                <el-table
                        :data="category"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            prop="_id"
                            label="ID">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="分类">
                    </el-table-column>

                    <el-table-column
                            label="操作">
                        <template v-slot="scope">
                            <el-button size="mini" type="danger" @click="deleteCate(scope.row.name)">删除</el-button>
                            <el-button size="mini" type="primary" @click="updateCategory(scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </el-tab-pane>
        </el-tabs>

        <el-dialog
                title="修改分类"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-input v-model="input"></el-input>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmUpdateCategory">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    import {reqGetCategory, reqDelCategory, reqUpCategory} from '../../../../src/api/index'
    import {mapState} from 'vuex'
    export default {
        data() {
            return {
                dialogVisible: false,
                input: '',
                _id: ''
            }
        },
        computed:{
            ...mapState(['category'])
        },
        methods: {
            deleteCate(name){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const result = await reqDelCategory(name);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$store.dispatch('getAllCategory')
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            // 打开修改分类对话框
            updateCategory(data){
                const {_id, name} = data;
                this.dialogVisible = true;
                this.input = name;
                this._id = _id;

            },
            async confirmUpdateCategory(){
                const result = await reqUpCategory(this._id, this.input);
                if(result.code === 0){
                    this.$message({
                        message: '修改成功',
                    });
                    this.dialogVisible = false;
                    this.$store.dispatch('getAllCategory')
                }
            }
        },
        mounted(){
            this.$store.dispatch('getAllCategory')
        }
    };
</script>

<style scoped lang="less">
    .admin-user, .el-pagination{
        margin-top: 20px;
    }
</style>
