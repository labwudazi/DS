<template>
  <div class="home-left">
    <el-menu
      v-if="list.length"
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#000"
      active-text-color="#00b3d4"
      :unique-opened="true"
    >
      <MyMenu :menu="list" />
    </el-menu>
  </div>
</template>

<script>
import MyMenu from "./MyMenu.vue";
import axios from "axios";
export default {
  data() {
    return {
      list: [],
    };
  },
  components: {
    MyMenu,
  },
  async created() {
    const res = await axios.get("menus");
    this.list = res.data;
    console.log(this.list);
  },
};
</script>

<style>
.home-left {
  width: 200px;
  height: 100%;
  background-color: #545c64;
  flex-shrink: 0;
}
.el-menu {
  border-right: 0 !important;
}
</style>