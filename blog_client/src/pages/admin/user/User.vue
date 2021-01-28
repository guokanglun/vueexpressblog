<template>
    <div class="admin-user">
        <el-tabs type="border-card">
            <el-tab-pane label="用户列表">
                <el-table
                        :data="users.msg"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            prop="_id"
                            label="ID">
                    </el-table-column>
                    <el-table-column
                            prop="username"
                            label="用户名">
                    </el-table-column>
                    <el-table-column
                            prop="password"
                            label="用户密码">
                    </el-table-column>
                    <el-table-column
                            prop="isAdmin"
                            label="是否是管理员">
                        <template v-slot="scope">
                            {{scope.row.isAdmin ? '是': '否'}}
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[2, 4, 6, 8]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="users.total">
                </el-pagination>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        data() {
            return {
                activeName: 'first',
                currentPage: 1, // 当前页
                limit: 2, // 每页数量
            };
        },
        computed:{
            ...mapState(['users'])
        },
        methods: {

            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.$store.dispatch('getAllUser', {page: this.currentPage, limit: val})
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.$store.dispatch('getAllUser', {page: val, limit: this.limit})
            }
        },
        mounted(){
            this.$store.dispatch('getAllUser', {page: this.currentPage, limit: this.limit})
        }
    };
</script>

<style scoped lang="less">
    .admin-user, .el-pagination{
        margin-top: 20px;
    }
</style>
