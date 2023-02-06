<template>
  <div>
    <Banner />
    <List :catList="catArr" />
  </div>
</template>

<script>
import api from "@/api";
import Banner from "@/components/Banner.vue";
import List from "@/components/CatListCard.vue";
export default {
  components: { Banner, List },
  data() {
    return {
      catArr: [
        
      ],
    };
  },
  methods: {
    initCatArr() {
      api.catSaleList(localStorage.getItem("userId")).then((res) => {this.catArr = res.data});
    },
  },
  mounted() {
    this.initCatArr()
  },
};
</script>

<style>
</style>