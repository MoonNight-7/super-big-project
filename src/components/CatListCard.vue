<template>
  <el-row :gutter="20">
      <el-col
        :span="6"
        v-for="(item,index) in catList.slice(0,3)"
        style="margin: 10px 0"
        :key="index"
      >
        <el-card body-style="height:250px" id="cat_description_box" shadow="hover">
          <el-image
            fit="cover"
            :src="item.pictures"
            style="width: 250px; height: 200px"
          />
          <span class="cat_price">￥{{ item.price }}</span>
          <span class="cat_name">昵称：{{ item.nickname }}</span>
          <p class="cat_species">种类：{{ item.catSpecies }}</p>
        </el-card>
      </el-col>
    </el-row>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  props:{
    catList:{
      type:Array,
      default: function () {
        return [];
      }
    }
  }
}
</script>

<style lang="less" scoped>
#cat_description_box {
  position: relative;
  .cat_price {
    color: #cc5120;
  }
  .cat_name {
    position: absolute;
    right: 20px;
    color: #c9cdd4;
  }
  .cat_species {
    position: absolute;
    right: 20px;
  }
}
</style>