<script setup lang="ts">
import { watchEffect } from "vue";
import jwt_decode from "jwt-decode";
import { useAuthStore } from "./store";
import { userType } from "./utils/types";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";

const store = useAuthStore();

watchEffect(() => {
  if (localStorage.token) {
    const decode: userType = jwt_decode(localStorage.token);
    store.setAuth(!!decode);
    store.setUser(decode);
  }
});
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}

.register,
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(./assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form-container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form-container .manage-tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}

.registerForm,
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit-btn {
  width: 100%;
}

.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>
