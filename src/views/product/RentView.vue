<template>
  <div>
    <Banner />
    <List :catList="catArr" />
  </div>
</template>

<script>
import Banner from "@/components/Banner.vue";
import List from "@/components/CatListCard.vue";
import api from "@/api";
export default {
  name:"rentCat",
  components: { Banner, List },
  data() {
    return {
      catArr: [
        
      ],
    };
  },
  methods: {
    initCatArr() {
      api
        .catRentList(localStorage.getItem("userId"))
        .then((res) => {
          this.catArr = res.data;
          console.log(res.data);
        })
        .catch((err) => this.$message.error(err.message));
    },
  },
  computed: {},
  watch: {},
  mounted() {
    this.initCatArr();
  },
};
</script>

<style lang="less" scoped>
</style>