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
        return post('/api/users/add-new',user)
    },
    avatarsList(){
        return get('/api/avatars/list')
    }

}

export default api
