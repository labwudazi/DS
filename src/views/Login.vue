<template>
  <div class="login">
    <!-- 登陆表单 -->
    <el-form
      :model="loginForm"
      :rules="loginFormRules"
      ref="ruleForm"
      class="login-from"
    >
      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input
          prefix-icon="iconfont icon-yonghuming"
          placeholder="用户名"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input
          type="password"
          prefix-icon="iconfont icon-mima"
          placeholder="密　码"
          v-model="loginForm.password"
        ></el-input>
      </el-form-item>
      <!-- 按钮 -->
      <el-form-item class="login-btn">
        <el-button type="primary" @click="login">登陆</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  data() {
    return {
      // 登陆对象
      loginForm: {
        password: "123456",
        username: "admin",
      },
      // 登陆验证规则
      loginFormRules: {
        // 用户名验证
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 10, message: "长度在5到10个字符", trigger: "blur" },
        ],
        //  密码验证
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在6到15个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 登陆键
    login() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return false;
        const { data, meta } = await this.$axios.post("login", this.loginForm);
        if (meta.status !== 200) return this.$message.error(meta.msg);
        this.$message.success("登陆成功");
        window.sessionStorage.setItem("token", data.token);
        this.$router.push("/");
      });
    },
    // 重置键
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>

<style>
.login {
  width: 300px;
  height: 200px;
  background-color: rgb(217, 236, 217);
  margin: 100px auto;
  padding: 40px 20px;
  border-radius: 5px;
}
.login-btn {
  display: flex;
  justify-content: flex-end;
}
body {
  background-image: url("../assets/风车.jpg");
}
</style>