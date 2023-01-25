<template>
  <el-row type="flex" justify="center">
    <el-col :span="12">
      <el-card>
        <el-form
          :model="catPostForm"
          :rules="rules"
          label-width="120px"
          ref="catPostForm"
        >
          <el-form-item label="猫猫昵称" prop="nickname">
            <el-input
              style="width: 60%"
              v-model="catPostForm.nickname"
              placeholder="请输入恶喵的昵称"
            ></el-input>
          </el-form-item>
          <el-form-item label="猫猫品种" prop="catSpeciesId">
            <el-select
              v-model="catPostForm.catSpeciesId"
              placeholder="请谨慎选择品种"
              style="width: 60%"
              @change="handleChange"
            >
              <el-option
                v-for="item in catSpeciesArr"
                :key="item.id"
                :label="item.catSpecies"
                :value="item.id"
                style="height: 50px"
              >
                <el-image
                  style="width: 45px; height: 45px"
                  fit="cover"
                  :src="$host + item.pictures"
                />
                <span
                  style="
                    float: right;
                    color: #8492a6;
                    font-size: 19px;
                    line-height: 50px;
                  "
                  >{{ item.catSpecies }}</span
                ></el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input-number
              v-model="catPostForm.age"
              :precision="1"
              :step="0.1"
              :min="0"
              :max="40"
              placeholder="单位/年"
            ></el-input-number>
          </el-form-item>
          <!-- TODO: 此处出租/出售应修改 -->
          <el-form-item
            :label="catPostForm.isRent == 1 ? '出租价格(月租)' : '出售价格'"
            :prop="catPostForm.isRent == 1 ? 'rentPrice' : 'salePrice'"
          >
            <el-input
              v-model="catPostForm.rentPrice"
              placeholder="0~999999元"
              v-if="catPostForm.isRent == 1"
              maxlength="8"
              style="width: 60%"
            ></el-input>
            <el-input
              v-model="catPostForm.salePrice"
              placeholder="1~999999元"
              v-if="catPostForm.isRent == 0"
              maxlength="8"
              style="width: 60%"
            ></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="description">
            <el-input
              v-model="catPostForm.description"
              type="textarea"
              :placeholder="'介绍一下你的宝宝' + descriptionInfo"
            ></el-input>
          </el-form-item>
          <el-form-item label="上传图片" required>
            <!-- TODO: 上传图片功能尚未实现 ，支持的格式有webp、jpg、jpeg、jfif-->
            <el-upload
              :action="this.$host + '/upload'"
              :headers="heads"
              name="pic"
              list-type="picture-card"
              :limit="limit"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :on-preview="handlePictureCardPreview"
            >
              <i slot="default" class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img src="http://192.168.3.21:18080/avatar/avator1.webp" style="width:100%;height:100%" />
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button type="primary" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import api from '@/api';
export default {
  name: "postCat2",
  data() {
    return {
      catPostForm: {
      },
      catSpeciesArr: [],
      descriptionInfo: "",
      heads: { Authorization: "" },
      imageUrl: "",
      dialogVisible: false,
      dialogImageUrl:'',
      limit: 1,

      rules: {
        nickname: [{ required: true, message: "请输入猫咪的爱称" }],
        catSpeciesId: [
          { required: true, message: "请输入猫咪的品种", trigger: "blur" },
        ],
        age: [
          { required: true, message: "请输入猫咪的年龄" },
          {
            type: "number",
            min: 0,
            max: 40,
            message: "年龄在0~40岁之间",
            trigger: "blur",
          },
        ],
        salePrice: [{ required: true, message: "请输入价格" }],
        rentPrice: [{ required: true, message: "请输入价格" }],
        description: [{ required: true, message: "请简单描述你的爱猫" }],
      },
    };
  },
  methods: {
    loadLocalCatPostForm() {
      let form = localStorage.getItem("catPostForm");
      if (form) {
        this.catPostForm = JSON.parse(form);
      }
    },
    loadCatSpeciesList() {
      this.$api.speciesList().then((res) => {
        this.catSpeciesArr = res.data;
      });
    },
    handleChange(speciesId) {
      this.catSpeciesArr.forEach((item) => {
        if (item.id == speciesId) {
          this.descriptionInfo = "，例：" + item.description;
        }
      });
    },
    handleSuccess(res) {
      this.catPostForm.pictures = res.data;
      console.log("上传成功");
    },
    handlePictureCardPreview() {
      this.dialogVisible = true
    },
    handleRemove() {//删除图片
      console.log("执行了删除函数");
      this.$api.deleteImg(this.catPostForm.pictures).then((res)=>{
        console.log(res);
      })
    },
    submitForm() {//提交表单
    console.log(this.catPostForm);
      this.$refs.catPostForm.validate((valid) => {
        if (valid) {
          console.log("校验通过");
          api.catAddNew(this.catPostForm).then((res)=>{
            if (res.state == 200) {
              this.$message.success('发布成功')
              return
            }else{
              this.$message.error(res.message)
            }
          })
        // } else {
          return false;
        }
      });
    },
    resetForm(){//重置表单
      this.$refs.catPostForm.resetFields()
    }
  },
  mounted() {
    // 【初始化】localStorage中的catPostForm
    this.loadLocalCatPostForm();
    let isRent = this.catPostForm.isRent;

    // 【初始化】猫猫列表
    this.loadCatSpeciesList();
    // 【加载上传请求头】
    this.heads.Authorization = localStorage.getItem("jwt");
  },
};
</script>

<style lang="less" scoped>
img.el-upload-list__item-thumbnail {
  /* 图片在方框内显示长边 */
  object-fit: cover;
}
</style>