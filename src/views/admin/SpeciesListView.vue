<template>
  <div>
    种类列表
  </div>
</template>

<script>
export default {
  data() {
    return {
      speciesArr:[]
    };
  },
  mounted(){
    this.$api.speciesList().then((res)=>{
      this.speciesArr = res.data;
      console.log(this.speciesArr);
    })
  }
};
</script>

<style>
</style>