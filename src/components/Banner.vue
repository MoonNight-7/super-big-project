<template>
  <div class="block">
    <span>{{ msg }}</span>
    <el-carousel :interval="4000" type="card" height="200px" id="out_box">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
  },
  mounted() {},
};
</script>

<style>
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
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  #out_box{
    width: 900px;
    margin: 0 auto;
  }
</style>