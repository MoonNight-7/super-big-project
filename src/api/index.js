import { get, post } from "../util/request"

const api = {
    /**
     * 登录接口
     * @param {object} user 用户名和密码
     * @returns jwt与用户详情
     */
    login(user){
        return post('/api/users/login',user)
    },
    /**
     * 注册接口
     * @param {object} userinfo 
     * @returns 
     */
    register(userinfo){
        return post('/api/users/add-new',userinfo)
    },
    /**
     * 获取头像列表
     * @returns 头像列表
     */
    avatarsList(){
        return get('/api/avatars/list')
    },
    /**
     * 修改用户信息
     * @param {object} userinfo 
     * @returns 
     */
    userUpdate(userinfo){
        return post('/api/users/update',userinfo)
    }

}

export default api
