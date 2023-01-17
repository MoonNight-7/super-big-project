<template>
  <div class="block">
    <div id="admin_system" @click="redirectToAdmin"></div>
    <el-carousel :interval="4000" type="card" height="230px" id="banner_box">
      <el-carousel-item v-for="(item, index) in BannerArr" :key="index">
        <el-image :src="item" fit="cover" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import router from '@/router';
export default {
  data() {
    return {
      BannerArr: [
        require("@/assets/banner/banner1.webp"),
        require("@/assets/banner/banner2.jpg"),
        require("@/assets/banner/banner3.png"),
        require("@/assets/banner/banner4.jpg"),
        require("@/assets/banner/banner5.webp"),
        require("@/assets/banner/banner6.webp"),
      ],
      count: 0,
    };
  },
  props: {
    // msg: String,
  },
  methods: {
    redirectToAdmin() {
      this.count++;
    },
  },
  mounted() {},
  watch: {
    count() {
      if (this.count % 5 == 0) {
        this.$prompt("请输入管理员密码", "o.O", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(({ value }) => {
            if (value == '8493258') {
              this.$message.success('密码输入正确，即将跳转到管理员页面')
              router.push('/admin')
            }else{
              this.$message.error('密码错了！！！！')
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "您放弃了进入管理员界面的机会，密码是8493258",
            });
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
#banner_box {
  width: 1000px;
  margin: 0 auto;
}
#admin_system {
  width: 100px;
  height: 300px;
  // background-color: #000;
  position: absolute;
}
</style>
