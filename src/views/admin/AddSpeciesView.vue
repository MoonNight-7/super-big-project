<template>
  <div>
    <el-form :model="catForm" label-width="100px">
      <el-form-item label="猫咪种类">
        <el-input style="width: 120px" v-model="catForm.catSpecies"></el-input>
      </el-form-item>
      <el-form-item label="猫咪描述">
        <el-input
          type="textarea"
          style="width: 220px"
          v-model="description"
        ></el-input>
      </el-form-item>
      <el-form-item label="猫猫图片">
        <el-upload :action="$host + '/upload'" :headers="heads" name="pic" list-type="picture-card">
          <el-button type=""></el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      catForm: {},
      heads: { Authorization: 123 },
    };
  },
  mounted() {
    this.heads.Authorization = localStorage.getItem("jwt");
  },
};
</script>

<style>
</style>