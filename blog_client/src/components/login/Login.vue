<template>
    <div class="login">
        <div v-if="userInfo.code !== 0">
            <div class="top">
                <div class="login-btn on" @click="handleClass(true)" ref="loginBtn">注册</div>
                <div class="register-btn" @click="handleClass(false)" ref="registerBtn">登录</div>
            </div>
            <div class="ipt">
                <div class="login-ipt hidden" ref="loginInput">
                    <div class="username">
                        <span class="iconfont icon-xingmingyonghumingnicheng"></span>
                        <input type="text" placeholder="用户名" v-model="username">
                    </div>
                    <div class="password">
                        <span class="iconfont icon-mima"></span>
                        <input type="password" placeholder="密码" v-model="password">
                    </div>
                    <p ref="descs" style="margin: auto; width: 50%;
                text-align: center; margin-top: 10px; color:red; font-size: 14px">
                        {{userInfo.code=== 1 ? '用户名或密码错误': ''}}
                    </p>
                    <input type="submit" value="登录" class="login" @click="registerLogin">
                </div>
                <div class="register-btn" ref="registerInput">
                    <div class="username">
                        <span class="iconfont icon-xingmingyonghumingnicheng"></span>
                        <input type="text" placeholder="用户名" v-model="username">
                    </div>
                    <div class="password">
                        <span class="iconfont icon-mima"></span>
                        <input type="password" placeholder="密码" v-model="password">
                    </div>
                    <div class="password">
                        <span class="iconfont icon-mima"></span>
                        <input type="password" placeholder="确认密码" v-model="rePassword">
                    </div>

                    <p ref="desc" style="margin: auto; width: 50%;
                text-align: center; margin-top: 10px; color:red; font-size: 14px">

                    </p>
                    <input type="submit" value="注册" class="register" @click="registerLogin">
                </div>

            </div>
        </div>
        <p v-else style="margin-top: 20px"> 欢迎 {{userInfo.msg.username}}
            <a href="#" v-if="userInfo.msg.username === 'admin'" @click.prevent="$router.push('/admin')"> 进入后台管理 </a>
        <br><br>
            <a href="#" @click.prevent="logout"> 退出登录 </a> </p>
    </div>
</template>

<script>
    import {reqRegister} from '../../../src/api/index';
    import {mapState} from 'vuex'
    export default {
        name: "Login",
        data(){
          return{
              isSelect: true, // true 代表注册 ， false 代表登录
              username: '',
              password: '',
              rePassword: ''
          }
        },
        computed:{
            ...mapState(['userInfo'])
        },
        methods:{
            handleClass(bool){
                this.isSelect = bool;
                if(bool){
                    this.$refs.loginBtn.className  = "login-btn on";
                    this.$refs.registerBtn.className  = "register-btn";
                    this.$refs.loginInput.className  = "login-ipt hidden";
                    this.$refs.registerInput.className  = "register-btn";
                }else{
                    this.$refs.loginBtn.className  = "login-btn";
                    this.$refs.registerBtn.className  = "register-btn on";
                    this.$refs.loginInput.className  = "login-ipt";
                    this.$refs.registerInput.className  = "register-btn hidden";
                }

            },
            // 注册登录
            async registerLogin(){
                const {username, password, rePassword} = this;
                if(this.isSelect){  // 注册
                    if(!username){
                        this.$refs.desc.innerHTML = '用户名不能为空';
                        return
                    }
                    if(!password){
                        this.$refs.desc.innerHTML = '密码不能为空';
                        return
                    }
                    if(password !== rePassword){
                        this.$refs.desc.innerHTML = '两次密码不一致';
                        return
                    }
                    this.$refs.desc.innerHTML = '';
                    // 注册
                    const result = await reqRegister(username, password, rePassword);
                    if(result.code === 0){
                        this.$refs.desc.innerHTML = '注册成功';
                        // 1s后进入登录页面
                        setTimeout(()=>{
                            this.handleClass(false)
                        }, 1000)
                    }else{
                        this.$refs.desc.innerHTML = result.msg;
                    }

                }else{
                    // 登录
                    if(!username){
                        this.$refs.descs.innerHTML = '用户名不能为空';
                        return
                    }
                    if(!password){
                        this.$refs.descs.innerHTML = '密码不能为空';
                        return
                    }
                    // 登录
                    this.$store.dispatch('login', {username, password});
                }
            },
            logout(){
                this.$store.dispatch('resetUserInfo');
                this.username = '';
                this.password = '';
                this.rePassword = '';
            }
        }
    }
</script>

<style lang="less">
    .login{
        width: 260px;
        .top{
            display: flex;
            justify-content: space-around;
            .login-btn{
                width: 50px;
                line-height: 50px;
                text-align: center;
                cursor: pointer;
            }
            .register-btn{
                width: 50px;
                line-height: 50px;
                text-align: center;
                cursor: pointer;
            }
            .on{
                border-bottom: 2px solid deepskyblue;
            }
        }
        .ipt{

            .login-ipt{
                .username{
                    margin-top: 20px;
                    margin-left: 30px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    input{

                        padding-left: 21px;
                        height: 20px;
                        width: 185px;
                    }
                    span{
                        position: absolute;
                        left:5px;
                    }
                }
                .password{
                    margin-top: 20px;
                    margin-left: 30px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    input{

                        padding-left: 21px;
                        height: 20px;
                        width: 185px;
                    }
                    span{
                        position: absolute;
                        left:5px;
                    }
                }
                .login{
                    width: 212px;
                    height: 26px;
                    letter-spacing: 10px;
                    margin: 20px 30px;
                }
            }
            .register-btn{
                .username{
                    margin-top: 20px;
                    margin-left: 30px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    input{
                        border: 1px solid lightgrey;
                        padding-left: 21px;
                        height: 20px;
                        width: 185px;
                    }
                    span{
                        position: absolute;
                        left:5px;
                    }
                }
                .password{
                    margin-top: 20px;
                    margin-left: 30px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    input{
                        border: 1px solid lightgrey;
                        padding-left: 21px;
                        height: 20px;
                        width: 185px;
                    }
                    span{
                        position: absolute;
                        left:5px;
                    }
                }
                .register{
                    width: 212px;
                    height: 26px;
                    letter-spacing: 10px;
                    margin: 20px 30px;
                }
            }
            .hidden{
                display: none;
            }
        }
    }
</style>
