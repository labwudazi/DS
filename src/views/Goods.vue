<template>
  <div>
    <div class="goods-head">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search-goods">
      <el-input
        v-model="value"
        :clearable="true"
        placeholder="请输入用户名"
        :style="{ width: '300px' }"
      />
      <el-button type="info" plain icon="el-icon-search"></el-button
      ><el-button type="primary"
        ><router-link class="addgoodsbtn" to="/addgoods"
          >添加商品</router-link
        ></el-button
      >
    </div>
    <el-table :data="goodsList" border style="width: 100%">
      <el-table-column
        width="60"
        align="center"
        type="index"
        label="#"
      ></el-table-column>
      <el-table-column prop="goods_name" label="商品名称"></el-table-column>
      <el-table-column
        width="120"
        prop="goods_price"
        label="商品价格(元)"
      ></el-table-column>
      <el-table-column width="100" prop="goods_number" label="商品重量">
      </el-table-column>
      <el-table-column width="200" prop="create_time" label="创建时间">
        <template slot-scope="scope">{{
          scope.row.add_time | format("YYYY-MM-DD HH:mm:ss")
        }}</template>
      </el-table-column>
      <el-table-column prop="level" width="150" label="操作">
        <template>
          <el-button type="primary"><i class="el-icon-edit"></i></el-button>
          <el-button type="warning"><i class="el-icon-delete"></i></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page.sync="goodsParams.pagenum"
      :page-size.sync="goodsParams.pagesize"
      :page-sizes="[1, 5, 10]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      goodsList: null,
      total: null,
      goodsParams: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
    };
  },
  async created() {
    this.getGoodsList();
  },
  methods: {
    async getGoodsList() {
      const res = await this.$axios.get("goods", { params: this.goodsParams });
      this.goodsList = res.data.goods;
      this.total = res.data.total;
    },
    sizeChange() {
      this.getGoodsList();
    },
    currentChange() {
      this.getGoodsList();
    },
  },
};
</script>

<style>
.goods-head {
  padding-bottom: 20px;
}
.search-goods {
  margin-bottom: 20px;
}
.addgoodsbtn {
  color: #fff;
}
</style>