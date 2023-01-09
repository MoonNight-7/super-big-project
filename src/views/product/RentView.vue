<template>
  <div>
    <banner msg="租猫"></banner>
  </div>
</template>

<script>
import Banner from "@/components/Banner.vue";
import router from "@/router";
import store from "@/store";
export default {
  components: { Banner },
  data() {
    return {
      catName: '',
    };
  },
  methods: {},
  computed: {
    data() {
      return store.state.isFree;
    },
  },
  watch: {
    data(currentIsFree) {
      if (currentIsFree == 1) {
        this.catName = "免费的猫";
      } else if (currentIsFree == 0) {
        this.catName = "不免费的猫";
      } else {
        this.catName = "没有名字的猫";
      }
    },
  },
  mounted() {
    let isFreeState = store.state.isFree;
    if (isFreeState == 1) {
      this.catName = "免费的猫";
    } else if (isFreeState == 0) {
      this.catName = "不免费的猫";
    } else {
      this.catName = "没有名字的猫";
    }
    console.log("【Rent初始化】这是RentView组件", store.state.isFree);
  },
};
</script>

<style>
</style>