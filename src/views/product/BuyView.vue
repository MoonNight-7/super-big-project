<template>
  <div>
    <Banner msg="买猫"/>
    <img :src="$host + img" width="100" height="100" alt="加载失败">
  </div>
</template>

<script>
import Banner from '@/components/Banner.vue';
export default {
  components: { Banner },
  data(){
    return{
      img:'/avatar/avator1.webp'
    }
  },
  mounted(){
    
  }
  };
</script>

<style>
</style>