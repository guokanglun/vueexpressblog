<template>
    <div class="content">
        <el-card class="box-card">
            <div class="text item">
                <el-button type="primary" @click="addContent">添加内容</el-button>
            </div>

            <el-table
                    :data="content.data"
                    stripe
                    border
                    style="width: 100%">
                <el-table-column
                        prop="_id"
                        label="ID"
                        width="220px"
                >
                </el-table-column>
                <el-table-column
                        prop="category"
                        label="分类"
                        width="100px"
                >
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="标题">
                </el-table-column>
                <el-table-column
                        prop="author"
                        label="作者">
                </el-table-column>
                <el-table-column
                        prop="publish_time"
                        label="发表时间">
                    <template v-slot="scope">
                        {{scope.row.publish_time | date-format}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="阅读量"
                        width="70px"
                        prop="readNum"
                >
                </el-table-column>
                <el-table-column
                        label="评论数"
                        width="70px"
                >
                    <template v-slot="scope">
                        {{scope.row.commentNum.length}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作">
                    <template v-slot="scope">
                        <el-button size="mini" type="primary" @click="updateContent(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="deleteContent(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
<!--            分页-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[2, 4, 6, 8]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="content.total">
            </el-pagination>
<!--            添加-->
            <el-dialog
                    title="添加内容"
                    :visible.sync="dialogVisible"
                    width="50%"
                    :before-close="handleClose">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="文章标题" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="文章分类" prop="region">
                        <el-select v-model="ruleForm.region" placeholder="请选择文章所属分类">
                            <el-option :label="item.name" :value="item.name"
                            v-for="(item, index) in category" :key="index"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="文章描述" prop="desc1">
                        <el-input type="textarea" v-model="ruleForm.desc1"></el-input>
                    </el-form-item>
                    <el-form-item label="文章内容" prop="desc">
                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                    </el-form-item>

                </el-form>

                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addContentToDataBase">确 定</el-button>
  </span>
            </el-dialog>

<!--            修改-->
            <el-dialog
                    title="修改文章内容"
                    :visible.sync="dialogVisibleUpdate"
                    width="50%"
                    :before-close="handleCloseUpdate">
                <el-form :model="ruleFormUpdate" :rules="rulesUpdate" ref="ruleFormUpdate" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="文章标题" prop="name">
                        <el-input v-model="ruleFormUpdate.name"></el-input>
                    </el-form-item>
                    <el-form-item label="文章分类" prop="region">
                        <el-select v-model="ruleFormUpdate.region" placeholder="请选择文章所属分类">
                            <el-option :label="item.name" :value="item.name"
                                       v-for="(item, index) in category" :key="index"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="文章描述" prop="desc1">
                        <el-input type="textarea" v-model="ruleFormUpdate.desc1"></el-input>
                    </el-form-item>
                    <el-form-item label="文章内容" prop="desc">
                        <el-input type="textarea" v-model="ruleFormUpdate.desc"></el-input>
                    </el-form-item>

                </el-form>

                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleUpdate = false">取 消</el-button>
    <el-button type="primary" @click="UpdateContentToDataBase">确 定</el-button>
  </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import {reqAddContent, reqUpdateContent, reqDeleteContent} from '../../../api/index'
    export default {
        name: "Content",
        data(){
            return{
                dialogVisible: false,
                dialogVisibleUpdate: false,
                ruleForm: {
                    author: '', // 作者
                    name: '', // 标题
                    region: '', // 分类
                    desc: '',  // 内容
                    desc1: '',  // 描述
                },
                ruleFormUpdate: {
                    _id: '',
                    author: '', // 作者
                    name: '', // 标题
                    region: '', // 分类
                    desc: '',  // 内容
                    desc1: '',  // 描述
                },
                rules: {
                    name: [
                        { required: true, message: '请输入文章标题', trigger: 'blur' },
                    ],
                    region: [
                        { required: true, message: '请选择所属分类', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写文章内容', trigger: 'blur' }
                    ],
                    desc1: [
                        { required: true, message: '请填写文章描述信息', trigger: 'blur' }
                    ]
                },
                rulesUpdate: {
                    name: [
                        { required: true, message: '请输入文章标题', trigger: 'blur' },
                    ],
                    region: [
                        { required: true, message: '请选择所属分类', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写文章内容', trigger: 'blur' }
                    ],
                    desc1: [
                        { required: true, message: '请填写文章描述信息', trigger: 'blur' }
                    ]
                },
                getContentQuery:{
                    page: 1,
                    limit: 2
                },
                currentPage: 1
            }
        },
        methods:{
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            handleCloseUpdate(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            // 点击添加按钮打开dialog
            addContent(){
                this.dialogVisible = true;
            },
            // 添加文章
            addContentToDataBase(){
                // 作者
                const author = this.userInfo.msg.username;
                // 标题
                const title = this.ruleForm.name;
                // 分类
                const category = this.ruleForm.region;
                // 内容
                const content = this.ruleForm.desc;
                // 描述
                const desc = this.ruleForm.desc1;
                this.$refs.ruleForm.validate(async valid=>{
                    if(valid){
                        // 如果表单验证成功就添加内容
                        const result = await reqAddContent(title, author, category, desc, content)
                        if(result.code === 0){
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.dialogVisible = false;
                            this.$store.dispatch('getAllContent', this.getContentQuery);
                        }
                    }
                })
            },
            // 打开update dialog
            updateContent(data){
                const {_id, title, category, desc, content}  = data;
                this.ruleFormUpdate =  {
                        _id,
                        name: title, // 标题
                        region: category, // 分类
                        desc: content,  // 内容
                        desc1: desc,  // 描述
                };
                this.dialogVisibleUpdate = true;
            },
            // update content to database
            UpdateContentToDataBase(){
                const {_id, author, name, region, desc, desc1} = this.ruleFormUpdate;
                this.$refs.ruleFormUpdate.validate(async valid=>{
                    if(valid){
                        // console.log(this.ruleFormUpdate);
                        const title = name;
                        const category = region;
                        const content = this.ruleFormUpdate.desc;
                        const desc = this.ruleFormUpdate.desc1;
                        // debugger
                        // 验证成功修改文章
                        const result = await reqUpdateContent(_id, title, category, desc, content);
                        // debugger
                        if(result.code === 0){
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.dialogVisibleUpdate = false;
                            this.$store.dispatch('getAllContent', this.getContentQuery);
                        }else{
                            this.$message({
                                message: '该文章已存在',
                                type: 'danger'
                            });
                        }
                    }
                })
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.getContentQuery = {
                    page: 1,
                    limit: val
                };
                this.$store.dispatch('getAllContent', this.getContentQuery);
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.getContentQuery = {
                    page: val,
                    limit: 2
                };
                this.$store.dispatch('getAllContent', this.getContentQuery);
            },
            // 删除content
             deleteContent(data){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const {_id} = data;
                    const result = await reqDeleteContent(_id);
                    if(result.code === 0){
                        this.$message({
                            message: '删除成功',
                            type:'success'
                        });
                        this.$store.dispatch('getAllContent', this.getContentQuery);
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            }
        },
        computed:{
            ...mapState(['content', 'category', 'userInfo'])
        },
        mounted() {
            this.$store.dispatch('getAllContent', this.getContentQuery);
            this.$store.dispatch('getAllCategory')
        }
    }
</script>

<style scoped lang="less">
    .text {
        font-size: 14px;
    }

    .item {
        padding: 18px 0;
    }

    .box-card {
        width: 480px;
    }
    .el-pagination{
        margin-top: 20px;
    }
</style>
