<template>
  <div class="block">
    <span>{{ msg }}</span>
    <el-carousel :interval="4000" type="card" height="230px" id="banner_box">
      <el-carousel-item v-for="(item,index) in BannerArr" :key="index">
        <el-image :src=item fit="cover"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data(){
    return{
      BannerArr:[require("@/assets/banner/banner1.webp"),
      require("@/assets/banner/banner2.jpg"),
      require("@/assets/banner/banner3.png"),
      require("@/assets/banner/banner4.jpg"),
      require("@/assets/banner/banner5.webp"),
      require("@/assets/banner/banner6.webp")]
    }
  },
  props: {
    msg: String,
  },
  mounted() {},
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
</style>
