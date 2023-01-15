<template>
  <el-container>
    <el-header class="layout_header">
      <a href="/">iMiao集结地</a>
      <h3>在 线 租 猫 平 台</h3>
      <div class="block">
        <el-avatar
          id="avatar"
          :size="50"
          :src="$host + userDetail.url"
          @click.native="dialogFormVisible = true"
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
        <el-menu-item index="/rentCat">租 猫</el-menu-item>
        <el-menu-item index="/buyCat">买 猫</el-menu-item>
        <el-menu-item index="/postCat">我要发布</el-menu-item>
        <el-menu-item index="/myCat">我发布的猫</el-menu-item>
        <el-button @click="routerTest">测试路由</el-button>
        <el-button @click="initUserDetail">初始化测试</el-button>
        <el-button @click="dialogFormVisible = true">弹出对话框表单</el-button>
      </el-menu>
      <!-- 弹出对话框表单【开始】 -->
      <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
        <el-form :model="userDetail">
          <el-form-item label="头像" :label-width="formLabelWidth">
            <el-select id="select" v-model="userDetail.avatarId">
              <el-option
                id="option"
                v-for="item in avatarArr"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              >
                <el-image
                  style="width: 30px; height: 30px"
                  fit="cover"
                  :src="$host + item.url"
                />
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.name
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input
              v-model="userDetail.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="昵称" :label-width="formLabelWidth">
            <el-input
              v-model="userDetail.nickname"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-radio v-model="userDetail.gender" label="1">男</el-radio>
            <el-radio v-model="userDetail.gender" label="2">女</el-radio>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateUserDetail()"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 弹出对话框表单【结束】 -->
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import router from "@/router";
import store from "@/store";
export default {
  data() {
    return {
      activeMenuItemPath: this.$router.currentRoute.path,
      // path: router.path
      dialogFormVisible: false,
      userDetail: {},
      avatarArr: [],
      formLabelWidth: "120px",
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
    updateUserDetail() {
      console.log(this.userDetail);
      this.$api.userUpdate(this.userDetail).then((res) => {
        console.log(res);
        if (res.state!=200) {
          this.$message.error(res.message)
          return
        }
        this.$message.success("修改成功")
        this.dialogFormVisible = false
      });
    },
    logout() {
      localStorage.clear();
      location.href = "/login";
    },
    initUserDetail() {
      let userString = localStorage.getItem("userDetailVO");
      let user = JSON.parse(userString);
      this.userDetail = user;
      console.log(this.userDetail);
      this.$notify({
        title: "登录成功",
        message: "欢迎您！" + this.userDetail.nickname,
        type: "success",
        position: "bottom-left",
      });
    },
    getAvatars() {
      this.$api.avatarsList().then((res) => {
        this.avatarArr = res.data;
        console.log(res);
      });
    },
  },
  watch: {
    /**
     * 监听路由变化，判断是否是首页
     */
    // $route(to, from) {
    //   if (to.path == "/") {
    //     store.commit("trueIsIndex");
    //     this.isIndex = store.state.isIndex;
    //   } else {
    //     console.log("当前页面不是首页");
    //     store.commit("falseIsIndex");
    //     this.isIndex = store.state.isIndex;
    //   }
    //   // console.log(from.path);//从哪来
    //   // console.log(to.path); //到哪去
    // },
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
    this.getAvatars();
    console.log("mounted函数执行了！！");
  },
  created() {},
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
