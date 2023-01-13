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

  },
  watch: {

  },
  mounted() {
  },
};
</script>

<style>
</style>