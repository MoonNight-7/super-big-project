import { get, post } from "../util/request"

const api = {
    /**
     * 登录接口
     * @param {object} user 用户名和密码
     * @returns jwt与用户详情
     */
    login(user) {
        return post('/api/users/login', user)
    },
    /**
     * 注册接口
     * @param {object} userinfo 
     * @returns 
     */
    register(userinfo) {
        return post('/api/users/add-new', userinfo)
    },
    /**
     * 获取头像列表
     * @returns 头像列表
     */
    avatarsList() {
        return get('/api/avatars/list')
    },
    /**
     * 修改用户信息
     * @param {object} userinfo 
     * @returns 
     */
    userUpdate(userinfo) {
        return post('/api/users/update', userinfo)
    },
    /**
     * 删除服务器的图片
     * @param {String} url 图片路径
     * @returns 
     */
    deleteImg(url) {
        return post('/api'+url+'/remove')
    },
    /**
     * 新增种类
     * @param {Object} obj 猫猫种类对象
     * @returns 
     */
    speciesAddNew(obj){
        return post('/api/species/add-new',obj)
    },
    /**
     * 获取种类列表
     * @returns 种类列表
     */
    speciesList(){
        return get('/api/species/list')
    },
    /**
     * 用户发布猫猫
     * @param {Object} obj 猫猫对象
     * @returns 
     */
    catAddNew(obj){
        return post('/api/cats/add-new',obj)
    }
    

}

export default api
