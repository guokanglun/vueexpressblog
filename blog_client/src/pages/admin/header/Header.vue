<template>
    <div class="header">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1" @click="changeRouter('/admin/index', '1')"
            :class="{'active': $route.path === '/admin/index'}"
            >后台管理</el-menu-item>
            <el-menu-item index="3" @click="changeRouter('/admin/user', '3')"
                          :class="{'active': $route.path === '/admin/user'}"
            >用户管理</el-menu-item>
            <el-submenu index="2">
                <template slot="title">分类管理</template>
                <el-menu-item index="2-1"
                              @click="changeRouter('/admin/categorylist', '2-1')"
                >分类列表</el-menu-item>
                <el-menu-item index="2-2"
                              @click="changeRouter('/admin/categoryadd', '2-2')"
                >分类添加</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">内容管理</template>
                <el-menu-item index="4-1" @click="changeRouter('/admin/content', '4-1')">内容管理</el-menu-item>
            </el-submenu>
            <el-submenu index="5" class="user">
                <template slot="title">admin</template>
                <el-menu-item index="5-1" @click="backToIndex">返回首页</el-menu-item>
            </el-submenu>
        </el-menu>
        <div class="line"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: ''
            };
        },
        mounted(){
            const index = localStorage.getItem('activeIndex') || '1';
            this.activeIndex = index;
        },
        methods: {
            changeRouter(path, index){
                localStorage.setItem('activeIndex', index);
                this.$router.replace(path)
            },
            backToIndex(){
                localStorage.setItem('activeIndex', '1');
                this.$router.back();
            }
        }
    }
</script>

<style lang="less">
    .header{
        position: relative;
        .user{
            position: absolute;
            right:0;
        }
    }
    .active{
        border-bottom: 2px solid #409EFF;
    }
</style>
