<template>
  <div id="out_box">
    <img id="backgroundImg" src="@/assets/imgs/green.jpg" />
    <el-card id="card_box">
      <h1>iMiao注册页面</h1>
      <el-form
        :model="regUserInfo"
        id="form_box"
        label-width="100px"
        :rules="rules"
        ref="regUserInfo"
      >
        <el-form-item label="头像" required>
          <el-row>
            <el-col :span="3">
              <el-avatar shape="square" :size="50" :src="defaultAvatar"
            /></el-col>
            <el-col :span="21">
              <el-form-item prop="avatarId">
                <el-select
                  id="select"
                  v-model="regUserInfo.avatarId"
                  @change="changeDefaultAvatar"
                >
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
                    <span
                      style="float: right; color: #8492a6; font-size: 13px"
                      >{{ item.name }}</span
                    >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="regUserInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="regUserInfo.password"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="regUserInfo.nickname"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="regUserInfo.gender">
            <el-radio label=1>男</el-radio>
            <el-radio label=2>女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="backToLogin">返回登录页</el-button>
          <el-button @click="register('regUserInfo')">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import router from "@/router";
import axios from "axios";
export default {
  data() {
    return {
      regUserInfo: {
        username: "superadmin",
        password: "123456",
        nickname: "xiaoming",
        gender: "1",
        avatarId: "",
      },
      defaultAvatar:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      rules: {
        avatarId: [{ required: true, message: "请选择头像", trigger: "change" }],
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
        nickname: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 16,
            message: "长度在 5 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
      avatarArr: [
        {
          id: "",
          url: "x",
          name: "",
        },
      ],
    };
  },
  methods: {
    backToLogin() {
      location.href = "/login";
    },
    register(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = this.$host + "/users/add-new";
          let formData = this.qs.stringify(this.regUserInfo);
          console.log(formData);
          axios.post(url, formData).then((res) => {
            let responseBody = res.data;
            console.log(responseBody);
            if (responseBody.state == 200) {
              // console.log("注册成功");
              location.href = '/login'
            } else {
              this.$message.error(responseBody.message);
            }
          });
        } else {
          this.$message.error("您有信息填写有误");
        }
      });
    },
    changeDefaultAvatar(avatarId) {
      console.log(avatarId);
      console.log(this.regUserInfo);
      this.defaultAvatar = this.$host + this.avatarArr[avatarId - 1].url;
    },
    listAvators() {
      let url = this.$host + "/avatars/list";
      // console.log(url);
      axios.get(url).then((res) => {
        let responseBody = res.data;
        if (responseBody.state != 200) {
          this.$message.error("出错了，请刷新页面后重试！");
          return;
        }
        this.avatarArr = responseBody.data;
        // console.log(responseBody);
      });
    },
  },
  mounted() {
    this.listAvators();
  },
};
</script>

<style lang="less" scope>
#out_box {
  #backgroundImg {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
  }
  #card_box {
    // asd
    position: relative;
    top: 100px;
    width: 600px;
    height: 550px;
    margin: 0 auto;
    margin-bottom: 200px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 20px;
    h1 {
      text-align: center;
      padding-bottom: 20px;
    }
    #form_box {
      position: relative;
      left: 60px;
      .el-input {
        width: 260px;
      }
      #select {
        width: 203px;
      }
      .el-select {
        width: 203px;
        .el-input--suffix {
          width: 203px;
        }
      }
    }
  }
}
</style>