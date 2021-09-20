<template>
  <div>
    <div class="add-head">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="add-goods">
      <el-alert
        title="添加商品信息"
        :closable="false"
        type="info"
        center
        show-icon
      >
      </el-alert>
      <div class="alert">
        <el-steps :active="active" finish-status="success">
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品信息"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </div>
      <div class="add-info">
        <ul class="add-list">
          <li>
            <router-link
              class="edit-btn"
              exact-active-class="border-color"
              to="/addgoods/info"
              >基本信息</router-link
            >
          </li>
          <li>
            <router-link
              class="edit-btn"
              exact-active-class="border-color"
              to="/addgoods/params"
              >商品参数</router-link
            >
          </li>
          <li>
            <router-link
              class="edit-btn"
              exact-active-class="border-color"
              to="/addgoods/attr"
              >商品属性</router-link
            >
          </li>
          <li>
            <router-link
              class="edit-btn"
              exact-active-class="border-color"
              to="/addgoods/img"
              >商品图片</router-link
            >
          </li>
          <li>
            <router-link
              class="edit-btn"
              exact-active-class="border-color"
              to="/addgoods/content"
              >商品内容</router-link
            >
          </li>
        </ul>
        <div class="goods-main"><router-view /></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
  created() {
    this.active = Number(window.sessionStorage.getItem("active"));
    console.log(this.active);
  },
  updated() {
    sessionStorage.setItem("active", this.active);
    this.active = Number(window.sessionStorage.getItem("active"));
    console.log(this.active);
  },
  watch: {
    "$route.path"(newValue) {
      switch (newValue) {
        case "/addgoods/info":
          this.active = 0;
          break;
        case "/addgoods/params":
          this.active = 1;
          break;
        case "/addgoods/attr":
          this.active = 2;
          break;
        case "/addgoods/img":
          this.active = 3;
          break;
        case "/addgoods/content":
          this.active = 4;
          break;
        default:
          this.active = 6;
          break;
      }
    },
  },
};
</script>

<style>
.add-goods {
  background-color: #fff;
  padding: 20px 0;
  border-radius: 3px;
}
.add-list {
  padding-left: 10px;
  width: 120px;
  height: 200px;
  margin: 0;
  list-style-type: none;
  border-right: 3px solid #ccc;
}
.border-color {
  border-right: 3px solid #00b3d4;
  color: #00b3d4;
}
.edit-btn {
  display: inline-block;
  padding: 10px 0;
}
.add-list li,
.edit-btn {
  text-align: center;
  width: 100%;
}
.alert {
  margin-left: 100px;
  width: 70%;
  padding: 20px;
}
.add-info {
  display: flex;
  justify-content: start;
}
.goods-main {
  flex-grow: 1;
}
</style>