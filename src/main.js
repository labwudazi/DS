import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "./assets/global.css";
import TreeTable from "vue-table-with-tree-grid";
import axios from "axios";
// 全局过滤器
import moment from "moment";
//定义全局过滤器实现日期格式化
Vue.filter("format", function(input, fmtstring) {
  // 使用momentjs这个日期格式化类库实现日期的格式化功能
  return moment(input).format(fmtstring);
});

Vue.prototype.$moment = moment;
Vue.component("tree-table", TreeTable);
// 添加请求基础路径，请求的时候少写一点
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/";
// 因为 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
// 基本上除了登录之外的所有请求都是需要授权的
// 所以需要 添加 axios 请求拦截器，在发送所有请求的时候加上一些配置
axios.interceptors.request.use((config) => {
  // 为请求头对象添加 token 验证的 Authorization 字段
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
});
axios.interceptors.response.use((res) => res.data);
// 将加了配置的 axios 做成全局的属性
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
