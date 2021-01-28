import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from "../pages/admin/Admin";
import Main from "../pages/main/Main";
import Index from "../pages/admin/index/Index";
import User from "../pages/admin/user/User";
import CategoryAdd from "../pages/admin/category/CategoryAdd";
import CategoryList from "../pages/admin/category/CategoryList";
import Content from "../pages/admin/content/Content";
Vue.use(VueRouter);


// 引入vue-resource 然后挂载
import VueResource from 'vue-resource'
Vue.use(VueResource);

// 配置路由
const routes = [
  {
    path: '/admin',
    component: Admin,
    children:[
      {
        path: 'index',
        component: Index,
      },
      {
        path: 'user',
        component: User,
      },
      {
        path: 'categoryadd',
        component: CategoryAdd,
      },
      {
        path: 'categorylist',
        component: CategoryList,
      },
      {
        path: 'content',
        component: Content,
      },
      {
        path: '',
        redirect:'index'
      },
    ]
  },
  {
    path: '/',
    component: Main,
  },

];

const router = new VueRouter({
  routes
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

const originalPush1 = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalPush1.call(this, location).catch(err => err)
};

// 设置路由守卫，只有管理员才能进入后台系统
router.beforeEach((to, from, next)=>{
  const isAdmin = JSON.parse(localStorage.getItem('userInfo')).msg || {};
  if(isAdmin.isAdmin){
    next()
  }else {
    if (to.path == '/') {
      next();
    } else {
      next({path: '/'})
    }
  }

});



export default router
