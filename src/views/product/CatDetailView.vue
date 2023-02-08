<template>
  <el-row type="flex" justify="center" class="detail_out_box" :gutter="20">
    <el-col :span="10">
      <el-card id="left_cad_box">
        <el-image
          :src="this.$host + catDetail.pictures"
          style="width: 100%"
          fit="cover"
        />
      </el-card>
    </el-col>
    <el-col :span="10">
      <p class="cat_nickname_box">猫猫昵称：{{ catDetail.catNickname }}</p>
      <span v-if="catDetail.isRent == 0" class="price_box sec-line"
        >出售价格：{{ catDetail.salePrice }}元</span
      >
      <span v-else class="price_box sec-line"
        >出租价格：{{ catDetail.rentPrice }}元/月</span
      >
      <span class="master_box sec-line">主人：{{ catDetail.userNickname }}</span>
      <span class="species_box sec-line">品种：{{ catDetail.catSpecies }}</span>
      <p class="description_box">简介：{{ catDetail.description }}</p>
      <el-button type="primary" icon="el-icon-tableware" size="medium" @click="buyCat(catDetail.id)"
        >购买</el-button
      >
    </el-col>
  </el-row>
</template>

<script>
import api from "@/api";
import router from "@/router";
export default {
  name: "catDetial",
  data() {
    return {
      catDetail: {},
    };
  },
  methods: {
    initCatDetail() {
      api
        .catDetail(this.$route.query.id)
        .then((res) => {
          this.catDetail = res.data;
          console.log(this.catDetail);
        })
        .catch((err) => {
          this.$message.error(err.message);
          //TODO: 跳转回首页
          router.push("/rentCat");
        });
    },
    buyCat(id){
      this.$message.success(id)
    }
  },
  mounted() {
    this.initCatDetail();
  },
};
</script>

<style lang="less" scoped>
.detail_out_box {
  margin-top: 20px;
  .cat_nickname_box {
    font-size: 60px;
  }
  .description_box {
    margin-bottom: 20px ;
  }
  .sec-line{
    display: inline-block;
    // background-color: red;
    margin: 20px 90px 20px 0 ;
  }
}
</style>