<template>
  <div>
    <template v-for="item in menu">
      <el-submenu
        v-if="item.children.length"
        :index="item.id.toString()"
        :key="item.id"
      >
        <template slot="title">
          <i :class="iconObj[item.id]"></i>
          <span>{{ item.authName }}</span>
        </template>
        <MyMenu :menu="item.children" />
      </el-submenu>
      <el-menu-item v-else :index="item.id.toString()" :key="item.id">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span
            ><router-link :to="{ name: `${item.path}` }">{{
              item.authName
            }}</router-link></span
          >
        </template>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "MyMenu",
  props: ["menu"],
  data() {
    return {
      iconObj: {
        125: "el-icon-s-custom",
        103: "el-icon-s-release",
        101: "el-icon-s-goods",
        102: "el-icon-s-order",
        145: "el-icon-s-marketing",
      },
    };
  },
};
</script>

<style>
</style>