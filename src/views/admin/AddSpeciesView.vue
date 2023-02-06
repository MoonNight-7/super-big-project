<template>
  <div>
    <el-form :model="catForm" label-width="100px" ref="catForm">
      <el-form-item label="猫咪种类" prop="catSpecies">
        <el-input style="width: 220px" v-model="catForm.catSpecies"></el-input>
      </el-form-item>
      <el-form-item label="猫咪描述" prop="description">
        <el-input
          type="textarea"
          style="width: 220px"
          v-model="catForm.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="排序序号" prop="description">
        <el-input
          style="width: 120px"
          v-model="catForm.sort"
          placeholder="1~900"
        ></el-input>
      </el-form-item>
      <el-form-item label="猫猫图片" prop="pictures">
        <el-upload
          :action="this.$host + '/upload'"
          :headers="heads"
          name="pic"
          :limit="3"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img :src="dialogImageUrl" width="100%" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('catForm')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
export default {
  data() {
    return {
      catForm: {
        pictures: "",
      },
      heads: { Authorization: "" },
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    handleSuccess(res) {
      this.catForm.pictures = res.data;
    },
    handleRemove(file, fileList) {
      this.$api.deleteImg(this.catForm.pictures).then((res) => {
        if (res.state == 200) {
          console.log("服务器删除完成");
          this.catForm.pictures = "";
        }
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitForm(formName) {
      console.log(this.catForm);
      this.$api
        .speciesAddNew(this.catForm)
        .then((res) => {
          this.$message.success("发布成功");
          router.go(0);
        })
        .catch((err) => {
          this.$message.error(err.message);
        });
    },
  },
  mounted() {
    this.heads.Authorization = localStorage.getItem("jwt");
  },
};
</script>

<style>
.el-upload-list__item-thumbnail {
  /* 图片在方框内显示长边 */
  object-fit: cover;
}
</style>