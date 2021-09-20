<template>
  <div>
    <el-button @click="showCateDialog" class="catgoriesAddbtn" type="primary"
      >添加类</el-button
    >
    <tree-table
      :data="cateList"
      :columns="columns"
      show-index
      border
      :selection-type="false"
      :expand-type="false"
      index-text="#"
    >
      <!-- 是否有效 -->
      <template slot="isOK" slot-scope="scope">
        <i
          v-if="!scope.row.cat_pid"
          style="color: lightgreen"
          class="el-icon-success"
        ></i>
        <i v-else style="color: red" class="el-icon-error"></i>
      </template>
      <!-- 排序 -->
      <template slot="order" slot-scope="scope">
        <el-tag
          :type="
            scope.row.cat_level === 0
              ? 'primary'
              : scope.row.cat_level === 1
              ? 'success'
              : 'warning'
          "
        >
          {{ scope.row.cat_level | level }}
        </el-tag>
      </template>
      <!-- 操作 -->
      <template slot="opt" slot-scope="scope">
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-edit"
          @click="editCateData(scope.row.cat_id)"
          >编辑</el-button
        >
        <el-button
          type="danger"
          size="mini"
          icon="el-icon-delete"
          @click="delCate(scope.row.cat_id)"
          >删除</el-button
        >
      </template>
    </tree-table>
    <!-- 分页器 -->
    <el-pagination
      @current-change="handlePagenum"
      :current-page.sync="querInfo.pagenum"
      :page-size="5"
      layout="total,  prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 添加分类Dialog -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      @close="addCateDialogClose"
      width="50%"
    >
      <el-form
        ref="addCateFormRef"
        :model="addCateform"
        :rules="addCateFormRules"
        label-width="80px"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateform.cat_name"></el-input> </el-form-item
        ><el-form-item label="父级分类">
          <el-cascader
            :options="ParentsCateList"
            :props="{
              value: 'cat_id',
              label: 'cat_name',
              children: 'children',
              expandTrigger: 'hover',
              checkStrictly: true,
            }"
            v-model="selectedKey"
            @change="parentsCateChange"
            clearable
          ></el-cascader
        ></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑分类 -->
    <el-dialog
      title="提示"
      :visible.sync="editCateDialogVisible"
      width="50%"
      @close="editCateClose"
    >
      <el-form
        :model="editCateForm"
        :rules="editCaterules"
        ref="editCateFormRef"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="修改分类名称" prop="cat_name">
          <el-input v-model="editCateForm.cat_name"></el-input> </el-form-item
      ></el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cateList: [],
      // 查询条件
      querInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      // 总条数
      total: null,
      // 为table指定列的定义
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          // 表示将该列定义为模板列
          type: "template",
          template: "isOK",
        },
        {
          label: "排序",
          // 表示将该列定义为模板列
          type: "template",
          template: "order",
        },
        {
          label: "操作",
          // 表示将该列定义为模板列
          type: "template",
          template: "opt",
        },
      ],
      addCateDialogVisible: false,
      // 添加分类的表单数据对象
      addCateform: {
        cat_name: "",
        cat_pid: "0",
        cat_level: "0",
      },
      // 添加分类的表单数据对象的校验规则
      addCateFormRules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
      // 父级数据列表
      ParentsCateList: null,
      // 选中的父组件的Id
      selectedKey: [],
      //编辑分类的表单数据对象
      editCateForm: { cat_name: "", cat_id: null },
      // 编辑分类的表单数据对象的校验规则
      editCaterules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
      editCateDialogVisible: false,
    };
  },
  filters: {
    level: function (value) {
      return value === 0
        ? (value = "一级")
        : value === 1
        ? (value = "二级")
        : (value = "三级");
    },
  },
  created() {
    this.getcateList();
  },
  methods: {
    async getcateList() {
      const res = await this.$axios.get("categories", {
        params: this.querInfo,
      });
      this.cateList = res.data.result;
      this.total = res.data.total;
      console.log(this.cateList);
    },
    handlePagenum() {
      this.getcateList();
    },
    // 获取父级分类的数据列表
    async getParentsCateList() {
      const res = await this.$axios.get("categories", { params: { type: 2 } });
      this.ParentsCateList = res.data;
      console.log(this.ParentsCateList);
    },
    // 展示添加分类的Dialog
    showCateDialog() {
      this.addCateDialogVisible = true;
      this.getParentsCateList();
    },
    // cascader组件当选中节点变化时触发函数
    parentsCateChange() {
      console.log(this.selectedKey);
      if (this.selectedKey.length > 0) {
        console.log(11);
        this.addCateform.cat_pid =
          this.selectedKey[this.selectedKey.length - 1];
        this.addCateform.cat_level = this.selectedKey.length;
      } else {
        this.addCateform.cat_pid = 0;
        this.addCateform.cat_level = 0;
      }
    },
    addCateDialogClose() {
      this.$refs.addCateFormRef.resetFields();
      this.selectedKey = [];
      this.addCateform.cat_pid = 0;
      this.addCateform.cat_level = 0;
    },
    // 添加分类
    addCate() {
      console.log(this.addCateform);
      this.$refs.addCateFormRef.validate(async (valid) => {
        if (!valid) {
          this.$message.error("添加分类失败");
          return;
        }
        const { data: res, meta } = await this.$axios.post(
          "categories",
          this.addCateform
        );
        if (meta.status !== 201) {
          this.$message.error("添加分类失败");
        }
        this.$message.success("添加分类成功");
        this.getParentsCateList();
        this.getcateList();
        this.addCateDialogVisible = false;
      });
    },
    // 删除分类
    async delCate(cat_id) {
      const confirmresult = await this.$confirm(
        "此操作将永久删除该分类, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmresult !== "confirm") {
        this.$message.error("已取消删除");
        return;
      }
      const { meta } = await this.$axios.delete(`categories/${cat_id}`);
      // console.log(this.cateList, meta, cat_id);
      if (meta.status !== 200) {
        return this.$message.error("删除失败");
      }
      this.$message.success("删除成功");
      this.getParentsCateList();
      this.getcateList();
    },
    // 根据Id获取要编辑的数据
    async editCateData(cat_id) {
      this.editCateDialogVisible = true;
      const { data: res, meta } = await this.$axios.get(`categories/${cat_id}`);
      this.editCateForm.cat_name = res.cat_name;
      this.editCateForm.cat_id = res.cat_id;
    },
    // 编辑点击确认是的函数
    editCate() {
      console.log(this.editCateForm);
      this.$refs.editCateFormRef.validate(async (valid) => {
        if (!valid) {
          return this.message.error("修改失败");
        }
        const { cat_name, cat_id } = this.editCateForm;
        const { data: res, meta } = await this.$axios.put(
          `categories/${cat_id}`,
          { cat_name: cat_name }
        );
        if (meta.status !== 200) {
          return this.$message.error("修改分类失败");
        }
        this.$message.success("修改分类名成功");
        this.editCateDialogVisible = false;
        this.getParentsCateList();
        this.getcateList();
        console.log(res, meta);
      });
    },
    async editCateClose() {},
  },
};
</script>

<style>
.catgoriesAddbtn {
  margin-bottom: 20px;
}
.el-cascader-panel {
  height: 300px;
}
.el-cascader {
  width: 100%;
}
</style>