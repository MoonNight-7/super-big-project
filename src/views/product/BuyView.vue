<template>
  <div>
    <Banner />
    <List :catList="catArr" />
  </div>
</template>

<script>
import Banner from "@/components/Banner.vue";
import List from "@/components/CatListCard.vue";
export default {
  components: { Banner,List },
  data() {
    return {
      catArr: [
        {
          price: 2000.0,
          nickname: "妹妹",
          catSpecies: "金渐层",
          pictures: require("@/assets/banner/banner1.webp"),
        },
        {
          price: 199.99,
          nickname: "哥哥",
          catSpecies: "银渐层",
          pictures: require("@/assets/banner/banner1.webp"),
        },
        {
          price: 20.0,
          nickname: "包子",
          catSpecies: "斯芬克斯",
          pictures: require("@/assets/banner/banner1.webp"),
        },
        {
          price: 999.99,
          nickname: "馒头",
          catSpecies: "橘猫",
          pictures: require("@/assets/banner/banner1.webp"),
        },
        {
          price: 2000.0,
          nickname: "妹妹",
          catSpecies: "金渐层",
          pictures: require("@/assets/banner/banner1.webp"),
        },
        {
          price: 199.99,
          nickname: "哥哥",
          catSpecies: "银渐层",
          pictures: require("@/assets/banner/banner1.webp"),
        },
        {
          price: 20.0,
          nickname: "包子",
          catSpecies: "斯芬克斯",
          pictures: require("@/assets/banner/banner1.webp"),
        },
        {
          price: 999.99,
          nickname: "馒头",
          catSpecies: "橘猫",
          pictures: require("@/assets/banner/banner1.webp"),
        },
        {
          price: 2000.0,
          nickname: "妹妹",
          catSpecies: "金渐层",
          pictures: require("@/assets/banner/banner1.webp"),
        },
        {
          price: 199.99,
          nickname: "哥哥",
          catSpecies: "银渐层",
          pictures: require("@/assets/banner/banner1.webp"),
        },
        {
          price: 20.0,
          nickname: "包子",
          catSpecies: "斯芬克斯",
          pictures: require("@/assets/banner/banner1.webp"),
        },
        {
          price: 999.99,
          nickname: "馒头",
          catSpecies: "橘猫",
          pictures: require("@/assets/banner/banner1.webp"),
        },
        {
          price: 2000.0,
          nickname: "妹妹",
          catSpecies: "金渐层",
          pictures: require("@/assets/banner/banner1.webp"),
        },
        {
          price: 199.99,
          nickname: "哥哥",
          catSpecies: "银渐层",
          pictures: require("@/assets/banner/banner1.webp"),
        },
        {
          price: 20.0,
          nickname: "包子",
          catSpecies: "斯芬克斯",
          pictures: require("@/assets/banner/banner1.webp"),
        },
        {
          price: 999.99,
          nickname: "馒头",
          catSpecies: "橘猫",
          pictures: require("@/assets/banner/banner1.webp"),
        },
      ],
    };
  },
  mounted() {},
};
</script>

<style>
</style>