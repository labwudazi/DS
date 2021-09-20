<template>
  <div class="home">
    <el-container>
      <el-header>
        <HomeHead />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <HomeLeft />
        </el-aside>
        <el-main>
          <HomeRight />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HomeLeft from "../components/HomeLeft.vue";
import HomeRight from "../components/HomeRight.vue";
import HomeHead from "../components/HomeHead.vue";
export default {
  name: "Home",
  components: { HomeLeft, HomeRight, HomeHead },
};
</script>
<style>
.el-header {
  background-color: rgb(125, 241, 193);
  line-height: 60px;
}
.el-main {
  background-color: #e9eef3;
  height: calc(100vh - 60px);
  padding: 0 !important;
}
</style>
