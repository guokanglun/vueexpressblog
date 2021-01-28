<template>
    <div class="main">
        <HeaderTop></HeaderTop>
        <div class="img">
            <MainSwiper></MainSwiper>
        </div>

        <div class="content">
            <Article></Article>
            <Login></Login>
        </div>
    </div>
</template>

<script>
    import HeaderTop from "../../components/headerTop/HeaderTop";
    import Article from "../../components/article/Article";
    import Login from "../../components/login/Login";
    import MainSwiper from "./mainSwiper/MainSwiper";
    export default {
        components:{
            HeaderTop, Article, Login, MainSwiper
        },
        mounted(){
            this.$store.dispatch('getUserInfo')
        }
    }
</script>

<style lang="less">
    .main{
        .img{
            width: 1100px;
            height: 300px;
            margin: 10px auto;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .content{
            display: flex;
            width: 1100px;
            margin: auto;
            justify-content: space-between;
        }
    }
</style>
