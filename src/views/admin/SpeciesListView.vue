<template>
  <div>
    <el-table :data="speciesArr">
      <el-table-column
        label="猫猫种类"
        prop="catSpecies"
        width="100px"
      ></el-table-column>
      <el-table-column
        label="猫猫简介"
        prop="description"
        width="600px"
      ></el-table-column>
      <el-table-column label="猫猫图片" prop="pictures">
        <template slot-scope="scope">
          <el-image
            :src="$host +scope.row.pictures"
            fit="cover"
            :alt="scope.row.catSpecies"
            style="width: 100px; height: 100px"
          ></el-image>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      speciesArr: [],
    };
  },
  methods:{
    show(row){
      console.log(row);
    }
  },
  mounted() {
    this.$api.speciesList().then((res) => {
      this.speciesArr = res.data;
      console.log(this.speciesArr);
    });
  },
};
</script>

<style>
</style>