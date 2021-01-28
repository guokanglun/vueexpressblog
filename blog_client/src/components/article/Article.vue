<template>
    <div>
        <div class="article" v-if="!showDetail">
            <div class="item" v-for="(item, index) in (currentCate?(content.data):contents)" :key="index" >
                <div class="title">{{ item.title }}</div>
                <div class="desc">{{item.desc}}</div>

                <div class="bottom">
                    <div class="left">
                        <div class="cate">{{item.category}}</div>
                        <div class="readAll" @click="readAll(item)">阅读全文</div>
                    </div>
                    <div class="time"> {{item.publish_time | date-format}} </div>
                </div>
            </div>
            <div class="loadmore" @click="loadMore" v-if="!currentCate">{{text}}</div>
        </div>
        <div v-else>
            <div class="detail">
                <div class="top">
                    <h3 @click="showDetail = false">
                        {{detailInfo.title}}
                    </h3>
                    <div class="authonArea">
                        <div class="author">
                            作者: <span> {{detailInfo.author}} </span>
                        </div>
                        <div class="time">
                            时间: <span>{{detailInfo.publish_time | date-format}}</span>
                        </div>
                        <div class="views">
                            阅读量: <span>{{readNum}}</span>
                        </div>
                        <div class="comment">
                            评论数: <span>{{currentArticleComments.length}}</span>
                        </div>
                    </div>

                    <div class="content">
                        {{detailInfo.content}}
                    </div>
                </div>

                <div class="bottom">
                    <div class="comments">评论</div>
                    <div class="tips">{{ userInfo.msg?'你已经登录，可以评论了':'您还没有登录，暂时无法发表评论' }}</div>
                    <div class="inp" v-if="userInfo.msg">
                        <input type="text" placeholder="请在此处输入评论" v-model="comment">
                        <button @click="addComment"> 提交 </button>
                    </div>

                    <ul class="allcomments" v-if="currentArticleComments.length>0">
                        <li v-for="(item, index) in currentArticleComments" :key="index">
                            <span class="name"> {{item.author}}</span> <span class="time">发表于 {{item.time | date-format}}</span>
                            <p class="content"> {{item.content}} </p>
                        </li>
                    </ul>
                    <div v-else class="noComment">
                        还没有人评论~~
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {reqGetContent, reqGetComments, reqAddComments, reqAddReadNum} from '../../api/index';
    import {mapState} from 'vuex'
    export default {
        name: "Article",
        data(){
          return{
              contents:[],
              page: 1,
              limit:5,
              totalPage: 0,
              text: '加载更多',
              showDetail: false,
              detailInfo:{},  //  文章详情信息
              currentArticleComments:[],  // 当前文章评论数
              comment: '',  // 当前评论
              readNum: 0  // 总阅读量
          }
        },
        computed:{
            ...mapState(['currentCate', 'content', 'userInfo'])
        },
        mounted(){

            this.getContent();
        },
        methods:{
            async getContent(){
                const {page, limit, currentCate} = this;
                if(currentCate){
                    this.$store.dispatch('getContentCate', currentCate)
                }
                const result = await reqGetContent(page, limit);
                // debugger
                if(result.code == 0){
                    this.contents = result.msg;
                    this.totalPage = Math.ceil(result.total  / this.limit);
                }
            },
            async loadMore(){
                this.page ++;
                if(this.page>this.totalPage){
                    this.text = '没有更多数据了'
                }
                const {page, limit} = this;
                const result = await reqGetContent(page, limit);
                // debugger
                if(result.code == 0){
                    this.contents = [...this.contents, ...result.msg];
                }

            },
            // 点击阅读全文
            async readAll(data){
                this.showDetail = true;
                this.detailInfo  = data;
                // 获取评论数
                const result = await reqGetComments(data._id);
                if(result.code === 0){
                    this.currentArticleComments = result.msg
                }
                // 获取阅读量
                const read = await reqAddReadNum(data._id);
                if(read.code === 0){
                    this.readNum = read.msg
                }
            },
            // 添加评论
            async addComment(){
                const params = {
                    _id:  this.detailInfo._id,
                    comment: this.comment,
                    author: this.userInfo.msg.username
                };
                // console.log(params)
                const result = await reqAddComments(params);
                // debugger
                this.currentArticleComments = result;
                this.comment = ''
            }
        }
    }
</script>

<style lang="less">
    .article{
        width: 807px;
        border-left: 2px solid skyblue;
        border-right: 2px solid skyblue;

        .item{
            padding-right: 10px;
            border-top: 1px solid grey;
            .title{
                font-size: 18px;
                font-weight: bold;
                margin: 20px;
            }
            .desc{
                font-size: 14px;
                text-indent: 28px;
                margin-left: 20px;
                line-height: 1.5;
            }
            .bottom{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left{
                    .cate{
                        margin: 20px;
                        height: 15px;
                        background-color: skyblue;
                        padding: 10px;
                        width: 50px;
                        color:white;
                        text-align: center;
                        line-height: 15px;
                        display: inline-block;
                        cursor: pointer;
                    }
                    .readAll{
                        display: inline-block;
                        width: 60px;
                        height: 15px;
                        padding: 10px;
                        text-align: center;
                        line-height: 15px;
                        background-color: grey;
                        font-size: 14px;
                        cursor: pointer;

                    }
                }
                .time{
                    font-size: 14px;
                    color:#666;
                }
            }


        }
        .loadmore{
            text-align: center;
            line-height:50px;
            background-color: #666666;
            margin-bottom: 20px;
            height: 50px;
        }
    }
    .detail{
        width: 807px;
        padding-right: 50px;
        .top{
            h3{
                font-size: 20px;
                margin: 20px;
            }
            .authonArea{
                display: flex;
                margin-left: 20px;
                div{
                    margin-right: 20px;

                    span{
                        color:deeppink;
                    }
                }
            }
            .content{
                width: 100%;
                margin: 20px;
                text-indent: 32px;
                line-height: 1.5;
            }
        }
        .bottom{
            border: 2px solid lightcoral;
            padding-bottom: 20px;
            .comments{
                height: 50px;
                line-height: 50px;
                padding-left: 20px;
                border-bottom: 2px solid #666;
            }
            .tips{
                height: 100px;
                line-height: 100px;
                text-align: center;
                color: lightcoral
            }
            .inp{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 50px;
                input{
                    height: 30px;
                    width: 730px;
                    padding-left: 20px;
                }
                button{
                    height: 36px;
                    color: lightcoral;
                    border: none;
                }
            }
            .allcomments{
                li{
                    padding-left: 20px;
                    padding-bottom: 10px;
                    margin-top: 20px;
                    border-bottom: 1px solid #ddd;
                    .name{
                        color: lightcoral;
                        margin-right: 30px;
                    }
                    .time{
                        font-size: 14px;
                        color:#666;
                    }
                    .content{
                        margin-top: 10px;

                        font-size: 14px;
                        color: #666;
                    }
                }
            }
            .noComment{
                text-align: center;
                line-height: 50px;
                color: lightcoral;
                letter-spacing: 5px;
                font-weight: bold;
            }
        }

    }
</style>
