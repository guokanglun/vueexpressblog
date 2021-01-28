import {
    reqLogin,
    reqAllUser,
    reqGetContent,
    reqGetCategory,
    reqCateContent
} from '../../src/api/index'

export default {
    // 登录获取用户信息
    async login({commit}, {username, password}, callback){
        const result = await reqLogin(username, password);
        localStorage.setItem('userInfo', JSON.stringify(result));
        commit('getUserInfo', result);
        callback && callback()
    },

    // 获取用户信息
    getUserInfo({commit}) {
        const result = localStorage.getItem('userInfo');
        commit('getUserInfo', JSON.parse(result))
    },

    // 退出登录
    resetUserInfo({commit}){
        localStorage.setItem('userInfo', JSON.stringify({}));
        commit('getUserInfo', {})
    },

    // 所有用户
    async getAllUser({commit}, {page, limit}){
        const result = await reqAllUser(page, limit);
        commit('getAllUsers', result)
    },

    // 所有分类
    async getAllCategory({commit}){
        const result = await reqGetCategory();
        commit('getAllCategory', result.msg)
    },

    // 获取内容
    async getAllContent({commit}, {page, limit}){
        const result = await reqGetContent(page, limit);
        let content = {
            data: result.msg,
            total: result.total
        };
        commit('getAllContent', content)
    },

    updateCate({commit}, cate){
        commit('updateCate', cate)
    },

    // 根据分类获取content
    async getContentCate({commit}, cate){
        const result = await reqCateContent(cate);
        // debugger
        if(result.code === 0){
            let content = {
                data: result.msg,
                total: result.count
            };
            commit('getAllContent', content)
        }
    }
}
