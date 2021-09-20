<template>
  <div class="about">
    <div class="main-head">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 搜索栏 -->
    <div class="search-bth">
      <el-input
        placeholder="请输入用户名"
        v-model="userslist.query"
        :style="{ width: '300px' }"
      />
      <el-button @click="search" icon="el-icon-search"></el-button
      ><el-button type="primary" @click="dialogFormVisible = true"
        >添加</el-button
      >
    </div>
    <!-- 表格 -->
    <el-table
      v-if="tableData.length"
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        width="60"
        align="center"
        type="index"
        label="#"
      ></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="create_time" label="电话"></el-table-column>
      <el-table-column prop="role_name" label="角色"></el-table-column>
      <el-table-column width="300" label="操作">
        <template v-slot="{ row }">
          <el-button type="primary" @click="editfrom(row.id)">编辑</el-button>
          <el-popconfirm
            @confirm="del(row.id)"
            :style="{ margin: '0 10px' }"
            title="确定删除内容吗？"
          >
            <el-button type="danger" slot="reference">删除</el-button>
          </el-popconfirm>
          <el-button type="warning">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-else>暂无该用户。。。</div>
    <!-- 分页器 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page.sync="userslist.pagenum"
      :page-sizes="[1, 2, 4]"
      :page-size.sync="userslist.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 添加用户弹框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="addfrom">
        <el-form-item label="姓名" label-width="60px">
          <el-input v-model="addfrom.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="60px">
          <el-input v-model="addfrom.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="60px">
          <el-input v-model="addfrom.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="60px">
          <el-input v-model="addfrom.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表格数据
      tableData: [],
      addfrom: {
        email: "",
        mobile: "",
        password: "",
        username: "",
      },
      dialogFormVisible: false,
      // 请求参数
      userslist: {
        query: "",
        pagenum: 1,
        pagesize: 4,
      },
      // 总条数
      total: 4,
    };
  },
  // 初始请求数据
  async created() {
    this.getPost();
  },
  methods: {
    // 拿数据方法
    async getPost() {
      const res = await this.$axios.get("users", { params: this.userslist });
      this.tableData = res.data.users;
    },
    // 每页条数改变时请求
    sizeChange() {
      this.getPost();
    },
    // 当前页改变时请求
    currentChange() {
      this.getPost();
    },
    async search() {
      if (this.userslist.query !== "") {
        this.getPost();
      }
    },
    async add() {
      const res = await this.$axios.post("users", {
        ...this.addfrom,
      });
      this.tableData.push({ ...res.data, role_name: "test" });
      this.dialogFormVisible = false;
      this.addfrom = {
        email: "",
        mobile: "",
        password: "",
        username: "",
      };
    },
    // 删除功能
    async del(id) {
      const res = await this.$axios.delete(`users/${id}`);
      this.getPost();
      this.$notify({
        title: "成功",
        message: "删除成功",
        type: "success",
      });
    },
    //
    async editfrom(id) {
      this.dialogFormVisible = true;
      const res = await this.$axios.put(`users/${id}`);
      this.addfrom = {
        username: res.data.username,
      };
      console.log(res);
    },
  },
};
</script>

<style>
.search-bth {
  margin: 10px 0;
  color: #13ce66;
}
</style>
