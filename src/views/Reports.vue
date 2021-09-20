<template>
  <div class="reports">
    <div class="main-head">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据统计</el-breadcrumb-item>
        <el-breadcrumb-item>数据报表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="report-form"><div id="main"></div></div>
  </div>
</template>

<script>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import { LineChart } from "echarts/charts";
// 引入提示框，直角坐标系组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
} from "echarts/components";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";

// 注册必须的组件
echarts.use([
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  LegendComponent,
  ToolboxComponent,
  TitleComponent,
]);
export default {
  async mounted() {
    const res = await this.$axios.get("reports/type/1");
    console.log(res.data);
    // console.log(this.option);
    // const { option } = this.option;
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    // 绘制图表
    myChart.setOption({
      title: {
        text: "用户来源",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#E9EEF3",
          },
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      ...res.data,
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: res.data.xAxis[0].data,
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
    });
  },
};
</script>

<style>
.report-form {
  padding: 20px;
  background-color: #fff;
  margin-top: 20px;
}
#main {
  width: 1000px;
  height: 500px;
}
</style>