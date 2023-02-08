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
    },
    /**
     * 获取用户发布的猫猫列表
     * @param {number} userId 用户ID
     * @returns 猫猫列表
     */
    catNotSaleList(userId){
        return get('/api/cats/'+userId+'/not-sale-list')
    },

    catSoldList(userId){
        return get('/api/cats/'+userId+'/sold-list')
    },
    /**
     * 获取除了该用户发布的出租列表
     * @param {number} userId 用户ID
     * @returns 猫猫列表
     */
    catRentList(userId){ 
        return get('/api/cats/'+userId+'/rent-list')
    },
    /**
     * 获取除了该用户发布的出售列表
     * @param {number} userId 用户ID
     * @returns 猫猫列表
     */
    catSaleList(userId){
        return get('/api/cats/'+userId+'/sale-list')
    },
    /**
     * 根据ID获取猫猫详情
     * @param {number} id 猫猫ID
     * @returns 猫猫详情
     */
    catDetail(id){
        return get('/api/cats/'+id+'/detail')
    },
    /**
     * 根据ID购买猫猫
     * @param {Object} obj 用户ID与猫猫ID
     * @returns 
     */
    catBuy(obj){
        return get('/api/cats/buy-cat',obj)
    },
    /**
     * 根据猫猫ID删除数据
     * @param {number} id 猫猫ID
     * @returns 
     */
    catDelete(id){
        return get('/api/cats/'+id+'/delete')
    },
    /**
     * 修改猫猫信息
     * @param {Object} obj 猫猫对象
     * @returns 
     */
    catUpdate(obj){
        return post('/api/cats/update',obj)
    }
    

}

export default api
