<template>
  <div class="goods-info">
    <el-form
      class="goods-from"
      label-position="top"
      label-width="80px"
      :model="goodsInfo"
    >
      <el-form-item label="商品名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="商品重量">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="商品数量">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-cascader
          v-model="value"
          :options="options"
          :props="{ label: 'cat_name', expandTrigger: 'hover' }"
          :clearable="true"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [],
      options: null,
      goodsInfo: null,
    };
  },
  async created() {
    const res = await this.$axios.get("categories", { tyope: [1, 2, 3] });
    this.options = res.data;
    console.log(res);
    console.log(this.$route.path);
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>

<style>
.goods-info {
  padding: 20px;
}
.goods-from > .el-form-item > .el-input {
  padding: 0;
}
.el-cascader-panel {
  height: 300px;
}
</style>