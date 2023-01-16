<template>
  <div>
    <banner msg="租猫"></banner>
    <el-row :gutter="20">
      <el-col
        :span="6"
        v-for="item in catArr"
        style="margin: 10px 0"
        :key="item"
      >
        <el-card body-style="height:250px" id="cat_description_box">
          <el-image
            fit="cover"
            :src="item"
            style="width: 250px; height: 200px"
          />
          <span class="cat_price">￥{{item.price}}</span>
          <span class="cat_name">昵称：{{item.nickname}}</span>
          <p class="cat_species">种类：{{item.catSpecies}}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Banner from "@/components/Banner.vue";
export default {
  components: { Banner },
  data() {
    return {
      catName: "",
      bannerArr: [
        require("@/assets/banner/banner1.webp"),
        require("@/assets/banner/banner2.jpg"),
        require("@/assets/banner/banner3.png"),
        require("@/assets/banner/banner4.jpg"),
        require("@/assets/banner/banner5.webp"),
        require("@/assets/banner/banner6.webp"),
      ],
      catArr:[
        {
          price:2000.00,
          nickname:'妹妹',
          catSpecies:'金渐层'
        },
                {
          price:199.99,
          nickname:'哥哥',
          catSpecies:'银渐层'
        },
                {
          price:20.00,
          nickname:'包子',
          catSpecies:'斯芬克斯'
        },
                {
          price:999.99,
          nickname:'馒头',
          catSpecies:'橘猫'
        },
      ]
    };
  },
  methods: {},
  computed: {},
  watch: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
#cat_description_box{
  position: relative;
  .cat_price{
    color: #CC5120;
  }
  .cat_name{
    position: absolute;
    right: 20px;
    color: #c9cdd4;
  }
  .cat_species{
    position: absolute;
    right: 20px;
  }
}
</style>