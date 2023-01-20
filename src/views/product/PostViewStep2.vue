<template>
  <el-row type="flex" justify="center">
    <el-col :span="12">
      <el-card>
        <el-form :model="catPostForm" label-width="120px">
          <el-form-item label="猫猫昵称">
            <el-input
              style="width: 200px"
              v-model="catPostForm.nickname"
              placeholder="请输入恶喵的昵称"
            ></el-input>
          </el-form-item>
          <el-form-item label="猫猫品种">
            <el-select
              v-model="catPostForm.catSpeciesId"
              placeholder="请谨慎选择品种"
              style="width: 60%"
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
          <el-form-item label="年龄">
            <el-input-number
              v-model="catPostForm.age"
              :precision="1"
              :min="0"
              :max="40"
              placeholder="单位/年"
            ></el-input-number>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "postCat2",
  data() {
    return {
      catPostForm: {},
      rent: "",
      catSpeciesArr: [],
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
  },
  mounted() {
    // 【初始化】localStorage中的catPostForm
    this.loadLocalCatPostForm();
    let isRent = this.catPostForm.isRent;
    console.log("isRent=" + isRent);
    isRent == 0 ? (this.rent = "卖猫猫") : (this.rent = "租猫猫");

    // 【初始化】猫猫列表
    this.loadCatSpeciesList();
  },
};
</script>

<style>
</style>