<template>
  <div>
    <div class="main-head">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="search-bth">
      <el-input
        v-model.number="ordersparams.query"
        placeholder="请输入用户名"
        :style="{ width: '300px' }"
      />
      <el-button
        @click="searchOrders(ordersparams.query)"
        icon="el-icon-search"
      ></el-button>
    </div>
    <!-- 表格内容 -->
    <el-table :data="ordersList" border style="width: 100%">
      <el-table-column
        width="60"
        align="center"
        type="index"
        label="#"
      ></el-table-column>
      <el-table-column prop="order_number" label="订单编号"></el-table-column>
      <el-table-column prop="order_price" label="订单价格"></el-table-column>
      <el-table-column prop="order_pay" label="是否付款">
        <template slot-scope="scope">
          <el-tag :type="scope.row.order_pay === '0' ? 'warning' : 'success'">{{
            scope.row.order_pay | payStatus
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货"> </el-table-column>
      <el-table-column prop="create_time" label="下单时间">
        <template slot-scope="scope">{{
          scope.row.create_time | format("YYYY-MM-DD HH:mm:ss")
        }}</template>
      </el-table-column>
      <el-table-column prop="level" width="150" label="操作">
        <template>
          <el-button @click="dialogFormVisible = true" type="primary"
            ><i class="el-icon-edit"></i
          ></el-button>
          <el-button type="warning"
            ><i class="el-icon-location-outline"></i
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-dialog title="修改地址" :visible.sync="dialogFormVisible">
      <el-form :model="searchOrdersText">
        <el-form-item label="活动名称" :label-width="100">
          <el-input v-model="searchOrdersText.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="100">
          <el-input v-model="searchOrdersText.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      ordersList: null,
      searchOrdersText: null,
      ordersparams: {
        query: "",
        pagenum: 1,
        pagesize: 10,
        user_id: "",
        pay_status: "",
        is_send: "",
        order_fapiao_title: "",
        order_fapiao_company: "",
        order_fapiao_content: "",
        consignee_addr: "",
      },
    };
  },
  filters: {
    payStatus: function (value) {
      return value === "0" ? (value = "未付款") : "已付款";
    },
  },
  async created() {
    const res = await this.$axios.get("orders", {
      params: this.ordersparams,
    });
    this.ordersList = res.data.goods;
    console.log(res.data.goods);
  },
  methods: {
    async searchOrders(id) {
      const res = await this.$axios.get(`orders/${id}`);
      this.ordersList = [res.data];
      console.log(this.ordersList);
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