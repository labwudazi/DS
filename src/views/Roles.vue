<template>
  <div class="roles">
    <div class="main-head">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 搜索栏 -->
    <div class="search-bth">
      <el-input
        placeholder="请输入用户名"
        v-model.number="searchText"
        :style="{ width: '300px' }"
      />
      <el-button @click="search" icon="el-icon-search"></el-button
      ><el-button type="primary" @click="dialogFormVisible = true"
        >添加</el-button
      >
    </div>
    <!-- 表格 -->
    <el-table v-if="list.length" :data="list" border style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row
            class="level-row"
            v-for="roles in props.row.children"
            :key="roles.id"
          >
            <el-col :span="5"
              ><el-tag closable>{{ roles.authName }}</el-tag>
              <i class="el-icon-caret-right"></i>
            </el-col>
            <el-col :span="19">
              <el-row
                class="level-row2"
                v-for="twoRoles in roles.children"
                :key="twoRoles.id"
              >
                <el-col :span="6"
                  ><el-tag type="success" closable
                    >{{ twoRoles.authName }}
                  </el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="15">
                  <el-tag
                    calss="level-tag"
                    v-for="threeRoles in twoRoles.children"
                    :key="threeRoles.children"
                    type="warning"
                    closable
                    >{{ threeRoles.authName }}</el-tag
                  ></el-col
                >
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        width="60"
        align="center"
        type="index"
        label="#"
      ></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
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
    <!-- 添加用户弹框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="listparams">
        <el-form-item label="角色名称" label-width="100px">
          <el-input v-model="listparams.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="100px">
          <el-input v-model="listparams.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelBtn">取 消</el-button>
        <el-button type="primary" @click="dialogConfirmBtnClick"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表格数据
      list: [],
      // 角色编辑参数
      id: null,
      searchText: null,
      // 添加角色列表参数
      listparams: {
        roleName: "",
        roleDesc: "",
      },
      dialogFormVisible: false,
    };
  },
  // 初始请求数据
  async created() {
    this.getPost();
  },
  methods: {
    // 拿数据方法
    async getPost() {
      const res = await this.$axios.get("roles");
      this.list = res.data;
      console.log(res);
      console.log(res.data[0].children[0].authName);
    },
    async search() {
      if (this.searchText) {
        const res = await this.$axios.get(`roles/${this.searchText}`);
        this.list = [{ ...res.data, id: this.searchText }];
      }
    },
    async add() {
      const res = await this.$axios.post("roles", {
        ...this.listparams,
      });
      this.list.push({ ...res.data });
      this.dialogFormVisible = false;
      this.listparams = {
        roleName: "",
        roleDesc: "",
      };
    },
    // 删除功能
    async del(id) {
      const res = await this.$axios.delete(`roles/${id}`);
      this.getPost();
      this.$notify({
        title: "成功",
        message: "删除成功",
        type: "success",
      });
    },
    async editfrom(id) {
      this.dialogFormVisible = true;
      this.id = id;
      console.log(this.id);
      const res = await this.$axios.get(`roles/${id}`);
      this.listparams = {
        roleName: res.data.roleName,
        roleDesc: res.data.roleDesc,
      };
    },
    async edit() {
      this.dialogFormVisible = false;
      const res = await this.$axios.put(`roles/${this.id}`, this.listparams);
      this.getPost();
      console.log(res);
      this.listparams = {
        roleName: "",
        roleDesc: "",
      };
      this.id = null;
    },
    dialogConfirmBtnClick() {
      this.id ? this.edit() : this.add();
    },
    cancelBtn() {
      this.dialogFormVisible = false;
      this.listparams = {
        roleName: "",
        roleDesc: "",
      };
      this.id = null;
    },
  },
};
</script>

<style lang="less">
.search-bth {
  margin: 10px 0;
  color: #13ce66;
}
.level-row {
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
}
.level-row2 {
  padding: 20px 0;
}
.el-tag {
  margin-right: 10px;
}
</style>
