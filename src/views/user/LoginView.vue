<template>
  <div id="out_box">
    <el-card id="card_box" v-loading="loading">
      <h1>iMiao登录页面</h1>
      <el-form
        :model="userinfo"
        id="form_box"
        label-width="100px"
        :rules="rules"
        ref="userinfo"
        hide-required-asterisk
      >
        <el-form-item label="用户名" prop="username" id="detail">
          <el-input v-model="userinfo.username" style="width: 160px"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" id="detail">
          <el-input
            v-model="userinfo.password"
            style="width: 160px"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item id="submit_box">
          <el-button type="primary" @click="login('userinfo')">登录</el-button>
          <el-button type="info" @click="reg">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import router from "@/router";
import axios from "axios";
import qs from "qs";
export default {
  components: {},
  data() {
    return {
      userinfo: {
        username: "LeoXing",
        password: "xzq211",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 4,
            max: 13,
            message: "长度在 4 到 13 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 16,
            message: "长度在 5 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
      loading: false,
    };
  },
  methods: {
    changeLoad() {
      this.loading == false ? (this.loading = true) : (this.loading = false);
    },
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = "http://192.168.3.21:18080/users/login";
          let formData = qs.stringify(this.userinfo);
          console.log("formData = " + formData);
          axios.post(url, formData).then((res) => {
            let responseBody = res.data;
            let state = responseBody.state;
            if (state == 200) {
              console.log("登录成功");
              this.changeLoad();
              console.log(responseBody.data);
              // 将jwt与user的各个详细信息分开存入localStorage
              // let jwt = responseBody.data.jwt;
              // let user = responseBody.data.userDetailVO;
              // localStorage.setItem("jwt",jwt)
              // for (const item in user) {
              //   if (Object.hasOwnProperty.call(user, item)) {
              //     const element = JSON.stringify(user[item]);
              //     localStorage.setItem(item,element)
              //   }
              // }

              // 将jwt与user分开存入localStorage
              let data = responseBody.data
              for (const item in data) {
                if (Object.hasOwnProperty.call(data, item)) {
                  if (item == 'jwt') {
                    localStorage.setItem(item,data[item])
                    continue
                  }
                  const element = JSON.stringify(data[item]);
                  localStorage.setItem(item,element)
                }
              }

              setTimeout(() => {
                this.changeLoad();
                this.$router.replace("/");
              }, 1000);
            } else {
              this.$message.error(responseBody.message);
            }
          });

          // this.$message.success("登录成功");
          // this.changeLoad();
        } else {
              console.log("error submit!!");
              return false;
        }
      });
    },
    reg() {
      location.href = "/reg";
      // router.replace("/reg")
    },
  },
};
</script>

<style lang="less" scope>
#out_box {
  // z-index: -1;
  min-height: 100vh;
  background-image: url("@/assets/imgs/green.jpg");
  background-size: 100% 100%;
  #card_box {
    position: relative;
    top: 100px;
    width: 600px;
    height: 300px;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    h1 {
      text-align: center;
      // position: relative;
      // margin: 0;
      // padding-right: 0;
      padding-bottom: 20px;
      // left: 200px;
    }
    #form_box {
      position: relative;
      left: 100px;
      .el-form-item__label {
        color: rgb(49, 68, 26);
      }
    }
  }
}
</style>