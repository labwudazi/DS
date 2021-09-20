<template>
  <div class="header">
    <div class="main-head">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table :data="rightsList" border style="width: 100%">
      <el-table-column
        width="60"
        align="center"
        type="index"
        label="#"
      ></el-table-column>
      <el-table-column prop="authName" label="权限名称"></el-table-column>
      <el-table-column prop="path" label="权限路径"></el-table-column>
      <el-table-column prop="level" label="权限等级">
        <template slot-scope="scope">
          <el-tag
            :type="
              scope.row.level === '0'
                ? 'primary'
                : scope.row.level === '1'
                ? 'success'
                : 'info'
            "
            >{{ scope.row.level | level }}</el-tag
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightsList: null,
    };
  },
  filters: {
    level: function (value) {
      return value === "0"
        ? (value = "一级")
        : value === "2"
        ? (value = "二级")
        : (value = "三级");
    },
  },
  async created() {
    const res = await this.$axios("rights/list");
    this.rightsList = res.data;
    console.log(res.data);
  },
};
</script>

<style  scoped>
body {
  height: 100%;
}
.main-head {
  padding-bottom: 20px;
}
</style>>
