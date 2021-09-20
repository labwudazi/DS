<template>
  <div class="home-right">
    <div class="header-img" v-if="$route.path === '/'">
      <h2 class="home-title">保障数据安全，护航品牌出海</h2>
      <div class="level">2.0</div>
    </div>
    <div class="main-content" v-else><router-view /></div>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style>
.home-right {
  background-color: #e9eef3;
  height: calc(100vh - 60px);
}
.header-img {
  height: calc(100vh - 60px);
  background-image: url("../assets/3.jpg");
  background-repeat: no-repeat;
  background-size: 1720px;
}
.main-content {
  background-color: #e9eef3;
  padding: 20px;
}
.home-title {
  font-size: 56px;
  text-align: center;
  padding-top: 200px;
  min-width: 850px;
  color: #fff;
}
.level {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100px auto;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 4px solid #fff;
  color: #fff;
  font-size: 80px;
}
.router-link-exact-active {
  color: #00b3d4;
}
</style>