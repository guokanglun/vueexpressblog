<template>
    <div class="top">
        <div class="content">
<!--            <img src="./logo.jpg" alt="">-->
            <span class="iconfont icon-home-s"></span>
            <div class="category">
                <ul>
                    <li @click="changeCate('')" :class="{on: currentName == ''}">首页</li>
                    <li v-for="(item, index) in category" :key="index"
                    @click="changeCate(item.name)" :class="{on: currentName == item.name}"
                    >{{item.name}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from  'vuex'
    export default {
        name: "HeaderTop",
        data(){
            return{
                currentName: ''
            }
        },
        computed:{
            ...mapState(['category'])
        },
        mounted(){
            this.$store.dispatch('getAllCategory')
        },
        methods:{
            changeCate(name){
                this.currentName = name;
                this.$store.dispatch('updateCate', name);
                this.$store.dispatch('getContentCate', name)
            }
        }
    }
</script>

<style lang="less" scoped>
    .top{
        width: 100%;
        height: 50px;
        background-color: black;
        user-select: none;
        .content{
            width: 1100px;
            height: 100%;
            margin: auto;
            display: flex;
            justify-content: space-between;
            .iconfont{
                font-size: 30px;
                margin-top: 10px;
                color: lightcoral;
            }
            .category{
                ul{
                    display: flex;
                    color:white;
                    li{
                        flex: 1;
                        white-space: nowrap;
                        text-align: center;
                        line-height: 50px;
                        margin-left: 20px;
                        cursor: pointer;
                        &.on{
                            color:lightcoral;
                        }
                    }
                }
            }
        }
    }
</style>
