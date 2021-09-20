<template>
  <div class="home-head">
    <img class="title-img" src="../assets/friend.jpg" alt="" />
    <h2 class="home-title">电商管理系统</h2>
    <div class="sign-btn"><el-button @click="signOut">退出</el-button></div>
  </div>
</template>

<script>
export default {
  methods: {
    signOut() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.home-head {
  height: 60px;
  display: flex;
  justify-content: start;
}
.title-img {
  width: 160px;
  margin-right: 20px;
}
.home-title {
  flex-grow: 1;
}
.sign-btn {
  width: 80px;
  height: 60px;
}
</style>