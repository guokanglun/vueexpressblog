<template>
    <div class="swiper-container container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in swiper" :key="index">
                <img :src='item.path' alt="">
            </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'
    import {reqSwiperData} from '../../../../src/api/index';
    export default {
        name: "MainSwiper",
        data(){
            return{
                swiper: []
            }
        },
        mounted() {
            this.getSwiper();

        },
        methods:{
            async getSwiper(){
                const result  = await reqSwiperData();
                if(result.code === 0){
                    this.swiper = result.msg
                }
                this.$nextTick(()=>{
                    new Swiper('.container', {
                        pagination: {
                            el: '.swiper-pagination',
                        },
                        loop:true,
                        autoplay:{
                            delay: 1500
                        }
                    })
                })

            }
        }
    }
</script>

<style lang="less">
    .swiper-slide{
        width: 1100px;
        height: 300px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .swiper-pagination-bullet-active{
        background-color: white;
    }
</style>
