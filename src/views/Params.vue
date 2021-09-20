<template>
  <div>
    <div class="categories-head">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="categories">
      <el-alert
        class="alert"
        title="注意:只允许为第三级分类设置相关参数！"
        type="warning"
        show-icon
      >
      </el-alert>
      <div class="classification">
        <span>选择商品分类 : </span>
        <el-cascader
          v-model="value"
          :options="options"
          :props="{
            value: 'cat_id',
            label: 'cat_name',
            expandTrigger: 'hover',
          }"
          :clearable="true"
          @change="handleChange"
        ></el-cascader>
      </div>
      <!-- tab 页签区域 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button
            @click="addDialogVisible = true"
            :disabled="isBtnisabled"
            type="primary"
            size="mini"
            class="paramsAdd"
            >添加参数</el-button
          >
          <el-table :data="manyTableData" stripe border style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  v-for="(item, i) in scope.row.attr_vals"
                  :key="i"
                  closable
                  @close="handleClose(i, scope.row)"
                  >{{ item }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="attr_name" label="参数名称">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="showEidtDialog(scope.row.attr_id)"
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                >
                  编辑</el-button
                >
                <el-button
                  slot="reference"
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="removeParams(scope.row.attr_id)"
                >
                  删除</el-button
                >
              </template>
            </el-table-column>
          </el-table></el-tab-pane
        >
        <el-tab-pane label="静态属性" name="only">
          <el-button
            @click="addDialogVisible = true"
            :disabled="isBtnisabled"
            type="primary"
            size="mini"
            class="paramsAdd"
            >添加参数</el-button
          >
          <el-table :data="onlyTableData" stripe border style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  v-for="(item, i) in scope.row.attr_vals"
                  :key="i"
                  closable
                  @close="handleClose(i, scope.row)"
                  >{{ item }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="attr_name" label="属性名称">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="showEidtDialog(scope.row.attr_id)"
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                >
                  编辑</el-button
                >
                <el-button
                  slot="reference"
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="removeParams(scope.row.attr_id)"
                >
                  删除</el-button
                >
              </template>
            </el-table-column>
          </el-table></el-tab-pane
        >
      </el-tabs>
      <!-- 添加参数的对话框 -->
      <el-dialog
        :title="'添加' + titleText"
        :visible.sync="addDialogVisible"
        width="50%"
      >
        <el-form
          :model="addForm"
          :rules="addFormRef"
          ref="addFormRef"
          label-width="100px"
          @close="addDiaglogClosed"
        >
          <!-- 添加参数表单 -->
          <el-form-item :label="titleText" prop="attr_name">
            <el-input v-model="addForm.attr_name"></el-input> </el-form-item
        ></el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addParams">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑参数的对话框 -->
      <el-dialog
        :title="'修改' + titleText"
        :visible.sync="editDialogVisible"
        width="50%"
      >
        <el-form
          :model="editForm"
          :rules="editFormRef"
          ref="editFormRef"
          label-width="100px"
          @close="editDiaglogClosed"
        >
          <!-- 添加参数表单 -->
          <el-form-item :label="titleText" prop="attr_name">
            <el-input v-model="editForm.attr_name"></el-input> </el-form-item
        ></el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editParams">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [],
      options: null,
      // 参数类型
      activeName: "many",
      manyTableData: [],
      onlyTableData: [],
      addDialogVisible: false,
      // 添加参数的表单数据对象
      addForm: {
        attr_name: "",
      },
      // 添加表单数据的验证规则
      addFormRef: {
        attr_name: {
          required: true,
          message: "请输入参数名称",
          trigger: "blur",
        },
      },
      editDialogVisible: false,
      editForm: { attr_name: "" },
      editFormRef: {
        attr_name: {
          required: true,
          message: "请输入参数名称",
          trigger: "blur",
        },
      },
    };
  },
  async created() {
    const res = await this.$axios.get("categories");
    this.options = res.data;
    console.log(this.options);
  },
  methods: {
    // 选中三级数据时触发
    handleChange(value) {
      this.getParamsData();
    },
    // 点击动态，静态时触发
    handleTabClick() {
      console.log(this.activeName);
      this.getParamsData();
    },
    // 获取三级数据的函数
    async getParamsData() {
      if (this.value.length !== 3) {
        this.value = [];
        this.manyTableData = [];
        this.onlyTableData = [];
      }
      const { data: res, meta } = await this.$axios.get(
        `categories/${this.cateId}/attributes`,
        { params: { sel: this.activeName } }
      );
      if (meta.status !== 200) {
        return this.$message("获取参数失败");
      }
      res.forEach((item) => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(",") : [];
        // 控制文本框的隐藏与显示
        item.inputVisible = false;
        item.inputValue = "";
      });
      console.log(res);
      if (this.activeName === "many") {
        this.manyTableData = res;
      } else {
        this.onlyTableData = res;
      }
    },
    // 监听添加对话框的关闭事件
    addDiaglogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 添加参数
    addParams() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res, meta } = await this.$axios.post(
          `categories/${this.cateId}/attributes`,
          {
            attr_name: this.addForm.attr_name,
            attr_sel: this.activeName,
          }
        );
        if (meta.status !== 201) {
          this.$message.console.error();
          ("添加参数失败");
        } else {
          this.$notify({
            type: "success",
            message: "添加参数成功",
          });
          this.addDialogVisible = false;
          this.addForm = {
            attr_name: "",
          };
          this.getParamsData();
        }
      });
    },
    // 展示编辑弹出框，并获取当前三级数据
    async showEidtDialog(attr_id) {
      this.editDialogVisible = true;
      const { data: res, meta } = await this.$axios.get(
        `categories/${this.cateId}/attributes/${attr_id}`,
        {
          params: {
            attr_sel: this.activeName,
          },
        }
      );
      if (meta.status !== 200) {
        this.$message.error("修改参数失败");
      }
      this.editForm = res;
      console.log(res, meta);
    },
    editDiaglogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 修改参数
    editParams() {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res, meta } = await this.$axios.put(
          `categories/${this.cateId}/attributes/${this.editForm.attr_id}`,
          {
            attr_name: this.editForm.attr_name,
            attr_sel: this.activeName,
          }
        );
        if (meta.status !== 200) {
          this.$message.error("修改参数失败");
        }
        this.$message.success("修改参数成功");
        this.getParamsData();
        this.editDialogVisible = false;
      });
    },
    // 删除
    async removeParams(attr_id) {
      const confirmresult = await this.$confirm(
        "此操作将永久删除此参数, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmresult !== "confirm") {
        return this.$message({
          type: "info",
          message: "已取消删除",
        });
      }
      const { data: res, meta } = await this.$axios.delete(
        `categories/${this.cateId}/attributes/${attr_id}`
      );
      console.log(res);
      if (meta.status !== 200) {
        return this.$message.error("删除参数失败");
      }
      this.$message.success("删除参数成功");
      this.getParamsData();
    },
    // 点击
    async handleInputConfirm(row) {
      if (!row.inputValue.trim().length) {
        row.inputVisible = false;
        row.inputValue = "";
        return;
      }
      row.attr_vals.push(row.inputValue);
      row.inputVisible = false;
      row.inputValue = "";
      this.saveAttrvals(row);
    },
    // 保存修改的参数项到后台
    async saveAttrvals(row) {
      const res = await this.$axios.put(
        `categories/${this.cateId}/attributes/${row.attr_id}`,
        {
          attr_name: row.attr_name,
          attr_sel: row.attr_sel,
          attr_vals: row.attr_vals.join(","),
        }
      );
      if (res.meta.status !== 200) {
        this.$message.error("修改参数项失败");
      }
      this.$message.success("修改参数项成功");
      console.log(res);
    },
    // 点击tag标签时触发的函数
    handleClose(i, row) {
      row.attr_vals.splice(i, 1);
      this.saveAttrvals(row);
    },
    // 让文本框自动获得焦点
    showInput(row) {
      row.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
  },
  computed: {
    // 如果按钮需要被禁用，则返回true 否则返回 false
    isBtnisabled() {
      if (this.value.length !== 3) {
        return true;
      }
      return false;
    },
    // 当前选中分类的三级Id
    cateId() {
      if (this.value.length !== 3) {
        return null;
      }
      return this.value[2];
    },
    // 计算标题的文本
    titleText() {
      if (this.activeName === "many") {
        return "动态参数";
      }
      return "静态属性";
    },
  },
};
</script>

<style >
.categories {
  background-color: #fff;
  padding: 20px;
}
.alert {
  margin-bottom: 20px;
}
.classification span {
  font-size: 20px;
}
.el-cascader-panel {
  height: 300px;
}

.el-tab-pane {
  font-size: 20px;
}
.paramsAdd {
  margin-bottom: 20px;
}
.delete {
  margin-left: 10px;
}
.el-tag {
  margin-right: 10px;
}
.input-new-tag {
  width: 100px;
}
</style>