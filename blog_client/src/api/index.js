/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
const BASE_URL = '/api';

// 注册
export const reqRegister = (username, password, rePassword) => ajax(BASE_URL + '/user/register', {username, password, rePassword}, 'POST');

// 登录
export const reqLogin = (username, password) => ajax(BASE_URL + '/user/login', {username, password}, 'POST');

// 所有用户
export const reqAllUser = (page, limit) => ajax(BASE_URL + '/admin/user', {page, limit});

// 添加分类
export const reqAddCategory = (category) => ajax(BASE_URL + '/admin/categoryAdd', {category},  'POST');

// 获取分类
export const reqGetCategory = () => ajax(BASE_URL + '/admin/category');

// 删除分类
export const reqDelCategory = (category) => ajax(BASE_URL + '/admin/delCategory', {category}, 'POST');

// 修改分类
export const reqUpCategory = (_id, category) => ajax(BASE_URL + '/admin/updateCategory', {_id, category}, 'POST');

// 获取 content
export const reqGetContent = (page, limit) => ajax(BASE_URL + '/admin/contentGet', {page, limit});
// all content
export const reqAllContent = () => ajax(BASE_URL + '/admin/contentGet/all');

// 根据分类获取内容
export const reqCateContent = (category) => ajax(BASE_URL + '/admin/contentGet/cate', {category});

// 添加 content
export const reqAddContent = (title, author, category, desc, content) => ajax(BASE_URL + '/admin/contentAdd', {title, author, category, desc, content}, 'POST');

// update content
export const reqUpdateContent = (_id, title, category, desc, content) => ajax(BASE_URL + '/admin/contentUpdate', {_id, title, category, desc, content}, 'POST');

// delete content
export const reqDeleteContent = (_id) => ajax(BASE_URL + '/admin/contentDelete', {_id}, 'POST');

// get comments
export const reqGetComments = (_id) => ajax(BASE_URL + '/admin/comment', {_id});

// add comments
export const reqAddComments = ({_id, comment, author}) => ajax(BASE_URL + '/admin/commentadd', {_id, comment, author}, 'POST');

// add readNUm
export const reqAddReadNum = (_id) => ajax(BASE_URL + '/admin/readNum', {_id});

// swiper data
export const reqSwiperData = () => ajax(BASE_URL + '/main/swiper');



