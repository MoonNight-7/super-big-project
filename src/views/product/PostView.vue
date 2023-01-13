<template>
  <div>
    发布猫猫
    <el-button @click="apiTest1">测试登录接口</el-button>
    <el-button @click="apiTest2">测试原生axios请求</el-button>
    <ElInput v-model="user.username" placeholder="用户名"/>
    <ElInput v-model="user.password" placeholder="密码"/>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      user: {
        username: "LeoXing",
        password: "xzq211",
      },
    };
  },
  methods: {
    apiTest1() {
      this.$api.avatarsList().then((res) => {
        console.log(res);
      });
    },
    apiTest2() {
      let data = qs.stringify(this.user)
      axios
        .create({
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        })
        .post(this.$host + "/users/login",data)
        .then((res) => {
          console.log(res);
        });
    },
  },
};
</script>

<style>
</style>