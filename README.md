# iMiao项目随记

## 前端部分

### 开发时遇到的问题



#### Router 携带参数传递

在向RentView中传递参数时使用如下方法，可使页面刷新后保留参数，参数isFree会保留在url中

```js	
this.$router.push({
    name: "rentCat",
    query: {
        isFree: num,
    },
});
```

而如下方式传递参数，会导致页面刷新后参数丢失

```js	
this.$router.push({
    name: "rentCat",
    params: {
        isFree: num,
    },
});
```

#### Router修改页面标题title

在router配置文件main.js中组件注册中添加如下代码 

```js
meta: { title: '自定义标题' },
```



#### Vuex 状态管理

在**HomeView**中携带参数向**RentView**中传递isFree参数时，采用store存储全局变量，index.js如下

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isFree:'' //此处为定义全局参数
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

```

若要改变state中的值，要在mutations中定义函数

#### 跨域问题

1. 在vue.config.js中配置devServer，代码如下

```js
  devServer: {
    host: '127.0.0.1',   // 本机名称
    port: 8080,   //  端口
    https: true,  // 前缀是http 还是https
    hotOnly: false,  // 是否开启热更新
    proxy: {
      '/api': {
        target: 'https://xxxxxxx.com',  // 后天接口域名
        secure: false,   // 如果是https接口，需要配置这个参数
        ws: true, //如果要代理 websockets，配置这个参数
        logLevel:'debug',   // 在终端查看代理的真实请求地址 
        changeOrigin: true,  // 是否跨域
        pathRewrite: {   //  重定向域名
          '^/api': '/api'   
        }
      },
      '/foo': {
        target: '<other_url>' // 要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
      },
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }

```

2. 在main.js中添加如下代码

```js
import api from '@/api'
Vue.prototype.HOST = "/api"
Vue.prototype.$api = api;
```

#### axios二次封装

对get/post请求的修改详见util/request.js

api/index.js中存放项目中用到的所有api

#### 背景相关

为页面设置背景时可使用如下css来实现全屏背景，但是会随页面拉长导致背景扭曲(**不脱离文档流**)

```css
// z-index: -1;
min-height: 100vh;
background-image: url("@/assets/imgs/green.jpg");
background-size: 100% 100%;
```

使用如下方式实现全屏背景是，不会随页面拉长缩小导致背景扭曲(**脱离文档流**)

```vue
<template>
    <div id="box">
        <img src="图片路径">
    </div>
</template>  

<style lang="less">
    #box{
        img{
            height:100%;
            width:100%;
            z-index:-1;
            position:fixed;
        }
    }
</style>
```

#### 数据持久化

在视图层增加<keep-alive>，如下代码所示，可减少向服务器发起请求的次数，降低服务器压力

```vue
<keep-alive>
  <router-view />
</keep-alive>
```

#### 跳转相关

在LoginView(登录页)与RegView(注册页)使用router.push跳转时会导致css污染，子组件会继承父组件的scope，但导致该问题的原因**父子标签id或class相同**

#### 事件相关

给Vue组件绑定事件时要加上native，比如elementUI中的<el-avatar>标签，为其绑定点击事件应这样书写

```vue
				  ↓↓↓↓↓↓
<el-avatar @click.native="show"><el-avatar/>
```

#### 报错

```javascript
[Vue warn]: Error in v-on handler: "TypeError: Cannot read properties of undefined (reading 'validate')"
```

原因：使用el-form提交表单时没有添加ref属性

解决方案：在el-form标签添加**reg="要提交的数据"**

```javascript
警告
async-validator: ['avatar is required']
```

原因：el-form中使用rules校验时在el-form-item中的prop属性值与绑定的model值不同

解决方案：将el-form-item中prop属性值与绑定的model值保持一致

```js
[vue-router] Maximum call stack size exceeded
```

原因：配置路由有误导致内存溢出（死循环导致）

解决方案：将原代码做如下修改

```js
旧
router.beforeEach((to, from, next) => {
  let jwt = localStorage.getItem('jwt')
  if (jwt) {
    next()
  } else {
      next('/login')
  }
})
新
router.beforeEach((to, from, next) => {
  let jwt = localStorage.getItem('jwt')
  if (jwt) {
    next()
  } else {
     if (to.path === '/login' || to.path === '/reg') {
       next()
     } else {
      next('/login')
     }
  }
})
```



## 后端部分

### 开发时遇到的问题

#### SpringSecurity相关

##### 配置类

配置类**SecurityConfiguration**需要继承**WebSecurityConfigurerAdapter**接口，重写父类configure方法来实现对权限的校验。

将静态文件如css、js放入白名单**.mvcMatchers**中，切记，要将login接口也放入白名单，否则将无法登录



#### Leaf分布式ID

> 若使用MySQL8.x版本，要做如下改动，**切记使用jdk1.8！！！！**

pom.xml

```xml
<mysql-connector-java.version>8.0.28</mysql-connector-java.version>
```

leaf.properties

```properties
leaf.jdbc.driver-class-name=com.mysql.cj.jdbc.Driver
leaf.segment.url=jdbc:mysql://localhost:3306/leaf?useSSL=false&useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai
```

Constants.java

```java	
public static final String LEAF_JDBC_DRIVER = "leaf.jdbc.driver-class-name";
```

SegmentService.java

```java
dataSource.setDriverClassName(properties.getProperty(Constants.LEAF_JDBC_DRIVER));
```

在Leaf目录下使用如下命令即可打包leaf至本地仓库

> git checkout feature/spring-boot-starter
>
> mvn clean install -Dmaven.test.skip=true

#### 跨域问题

在Controller类中加@CrossOrigin注解

> ```
>  @CrossOrigin //所有域名均可访问该类下所有接口
>  @CrossOrigin("https://blog.csdn.net") // 只有指定域名可以访问该类下所有接口
> ```

#### 获取服务器静态资源

在application.yml中加入

```yml
spring:
   web:
    resources:          ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 该路径为服务器静态资源地址
      static-locations: file:D:/project/imiao/avator
```

----

### 项目结构

#### config（配置包）

#### user（用户相关包）

- service层

  - login（登录业务）

    > Spring Security框架认证通过后生成jwt并查询用户详细信息，将登录次数+1，返回

  - addNew（注册业务）









# 一些想法

## 前端

每次请求都验证是否含有正确jwt，若有正确jwt，则正常运行，若无jwt，则跳转到登录页面，（是否可以将该方法封装起来）

封装axios，对请求结果中的state进行处理

多使用组件，避免.vue文件过于冗余

将jwt放在store中，存取方便

对上传的图片进行格式校验

## 后端

JsonResult中封装时间戳

错误信息封装成常量

login业务更新登录次数后将gmt_modifield也改变了，**不需要更新该项数据**

用ResponseEntity代替JsonResult向客户端发送数据

静态资源统一放在一个服务器上，避免每次都要SpringSecurity校验

前端发送过来的图片先放入缓存中，提交表单后再存入文件夹中

# Bug

1. 选择菜单项后再刷新页面会使首页内容出现**（已修复）**
