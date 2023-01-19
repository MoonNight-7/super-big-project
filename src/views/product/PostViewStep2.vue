<template>
<el-row type="flex" justify="center">
  <el-col :span="16">
    <el-card>
      <el-form :model="catPostForm" label-width="120px">
        <el-form-item label="猫猫昵称">
          <el-input style="width:200px" v-model="catPostForm.nickname" placeholder="请输入恶喵的昵称"></el-input>
        </el-form-item>
        <el-form-item label="猫猫品种"></el-form-item>
      </el-form>
    </el-card>
  </el-col>
</el-row>
</template>

<script>
export default {
  name:'postCat2',
  data(){
    return{
      catPostForm:{},
      rent:''
    }
  },
  methods:{
    loadLocalCatPostForm(){
      let form = localStorage.getItem("catPostForm")
      if (form) {
        this.catPostForm = JSON.parse(form)
      }
    }
  },
  mounted(){
    this.loadLocalCatPostForm()
    let isRent = this.catPostForm.isRent
    console.log('isRent='+isRent);
    isRent == 0 ? this.rent='卖猫猫' : this.rent='租猫猫'
  }
}
</script>

<style>

</style>