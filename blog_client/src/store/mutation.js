export default {
    // 获取用户信息
    getUserInfo(state, userInfo){
        state.userInfo = userInfo
    },
    // 所有用户
    getAllUsers(state, users){
        state.users = users
    },
    // 所有分类
    getAllCategory(state, category){
        state.category = category
    },
    // 所有文章
    getAllContent(state, content){
        state.content = content
    },

    // update curentCate
    updateCate(state, cate){
        state.currentCate = cate
    }
}
