<template>
  <el-container>
    <el-header class="layout_header">
      <a href="/">iMiao集结地</a>
      <h3>在 线 租 猫 平 台</h3>
      <div class="block">
        <el-avatar
          id="avatar"
          :size="50"
          :src="$host + avatarUrl"
          @click.native="showAvatar"
        />
        <el-button id="logout" type="info" plain size="mini" @click="logout"
          >退出登录</el-button
        >
      </div>
    </el-header>
    <el-main class="layout_body">
      <el-menu
        router
        :default-active="activeMenuItemPath"
        class="el-menu-demo"
        mode="horizontal"
      >
        <el-submenu index="1">
          <template slot="title">租 猫</template>
          <el-menu-item index="/rentCat?isFree=1">免费</el-menu-item>
          <el-menu-item index="/rentCat?isFree=0">收费</el-menu-item>
        </el-submenu>
        <el-menu-item index="/buyCat">买 猫</el-menu-item>
        <el-menu-item index="/postCat">我要发布</el-menu-item>
        <el-button @click="routerTest">测试路由</el-button>
        <el-button @click="initUserDetail">初始化测试</el-button>
      </el-menu>
      <div v-if="isIndex">
        <el-empty></el-empty>
      </div>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import router from "@/router";
import { load } from "@/assets/js/lodePage";
import store from "@/store";
export default {
  data() {
    return {
      activeMenuItemPath: this.$router.currentRoute.path,
      avatarUrl: "",
      isIndex: store.state.isIndex,
      // path: router.path
    };
  },
  methods: {
    routerTest() {
      // console.log(router.currentRoute.query);
      if (router.currentRoute.path) {
        console.log("路由中的地址：" + router.currentRoute.path);
      }
      this.$message.success(123);
      store.commit("falseIsIndex");
      this.isIndex = store.state.isIndex;
    },
    showAvatar() {
      this.$message.info("点击了【头像】");
    },
    logout() {
      localStorage.clear();
      location.href = "/login";
    },
    initUserDetail() {
      let userString = localStorage.getItem("userDetailVO");
      let user = JSON.parse(userString);
      console.log(user);
      this.avatarUrl = user.url;
      this.$notify({
        title: "登录成功",
        message: "欢迎您！" + user.nickname,
        type: "success",
        position: "bottom-left",
      });
    },
  },
  watch: {
    /**
     * 监听路由变化，判断是否是首页
     */
    $route(to, from) {
      if (to.path == "/") {
        store.commit("trueIsIndex");
        this.isIndex = store.state.isIndex;
      } else {
        console.log('当前页面不是首页');
        store.commit("falseIsIndex");
        this.isIndex = store.state.isIndex;
      }
      // console.log(from.path);//从哪来
      // console.log(to.path); //到哪去
    },
  },
  mounted() {
    /**
     * 页面刷新时将路由地址保存并反馈给el-menu组件
     */
    let path = this.$router.currentRoute.path;
    let query = router.currentRoute.query;
    if (query.isFree) {
      path += "?isFree=" + query.isFree;
    }
    this.activeMenuItemPath = path;
    // console.log(path);
    this.initUserDetail();
    console.log("mounted函数执行了！！");
  },
  created() {
    load();
  },

};
</script>

<style lang="less" scoped>
.layout_header {
  z-index: 100;
  width: 100%;
  position: fixed;
  background-color: #6b7785;
  // border: 1px red solid;
  a {
    display: inline-block;
    text-decoration: none;
    color: #000;
    font-size: 30px;
    line-height: 60px;
    margin-right: 60px;
  }
  h3 {
    display: inline-block;
    color: #c9cdd4;
    font-weight: 200;
  }
  .block {
    height: 50px;
    position: absolute;
    top: 3px;
    right: 100px;
    // border: 1px red solid;
    #avatar {
      cursor: pointer;
    }
    #logout {
      position: relative;
      top: -19px;
      left: 20px;
    }
  }
}
.layout_body {
  position: absolute;
  // height: 1000px;
  top: 40px;
  bottom: 0;
  left: 0;
  right: 0;
  .el-menu-demo {
    font-size: 100%;
  }
}
</style>
