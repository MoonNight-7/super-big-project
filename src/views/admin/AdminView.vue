<template>
  <el-container>
    <el-aside width="200px"
      ><el-menu
        router
        active-text-color="#37D4CF"
        :default-active="avtiveMenuPath"
        class="el-menu-vertical-demo"
      >
        <el-menu-item index="/adminHome">
          <i class="el-icon-ice-cream-round"></i>
          <span>首页</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>猫猫管理</span>
          </template>
          <el-menu-item-group>
            <template slot="title">品种管理</template>
            <el-menu-item index="/addSpecies">新增品种</el-menu-item>
            <el-menu-item index="1-2">品种列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu></el-aside
    >
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import router from "@/router";
export default {
  data() {
    return {
      avtiveMenuPath: this.$router.currentRoute.path,
    };
  },
  methods: {},
  mounted() {
    let path = router.currentRoute.path;
    this.activeMenuPath = path;
    console.log(path);
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo {
  overflow: hidden;
}
</style>