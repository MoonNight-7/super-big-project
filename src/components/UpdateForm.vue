<template>
  <div class="update_box">
    <el-form :model="catUpdateForm" label-width="170px">
      <el-form-item label="猫猫昵称">
        <el-input v-model="catUpdateForm.nickname" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="猫猫简介">
        <el-input v-model="catUpdateForm.description" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="猫猫年龄">
        <el-input v-model="catUpdateForm.age" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="猫猫售价" v-if="isRent == 0">
        <el-input v-model="catUpdateForm.salePrice" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="猫猫出租价格" v-else>
        <el-input v-model="catUpdateForm.rentPrice" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitUpdate">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from '@/api';
export default {
  props: {
    catUpdateForm:Object,
    isRent:Number
  },
  methods:{
    submitUpdate(){
      api.catUpdate(this.catUpdateForm).then((res)=>{
      }).catch(err=>this.$message.error(err.message))
    }
  }
};
</script>

<style>
</style>

<style lang="less" scoped>
.update_box {
  /* background-color: red; */
  // text-align: center;
  font-size: 20px;
  .el-input {
    width: 60%;
  }
}
</style>