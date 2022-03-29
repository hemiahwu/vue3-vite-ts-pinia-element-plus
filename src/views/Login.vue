<template>
  <div class="login">
    <section class="form-container">
      <div class="manage-tip">
        <span class="title">后台管理系统</span>
        <el-form
          :rules="rules"
          ref="ruleFormRef"
          :model="loginUser"
          class="loginForm"
          label-width="80px"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="loginUser.email"
              placeholder="请输入邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="loginUser.password"
              placeholder="请输入密码"
              type="password"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="handleSubmit(ruleFormRef)" class="submit-btn"
              >登录</el-button
            >
          </el-form-item>

          <div class="tiparea">
            <p>
              还没有账号? 现在<router-link to="/register">注册</router-link>
            </p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { registerType, registerRulesType, userType } from "../utils/types";
import { FormInstance } from "element-plus";
import axios from "../utils/http";
import { useRouter } from "vue-router";
import jwt_decode from "jwt-decode";
import { useAuthStore } from "../store";

const ruleFormRef = ref<FormInstance>();
const router = useRouter();
const store = useAuthStore();

const loginUser = ref<registerType>({
  email: "27732357@qq.com",
  password: "321321",
});

const rules = reactive<registerRulesType>({
  email: [
    {
      type: "email",
      required: true,
      message: "邮箱格式不正确",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 6, max: 30, message: "长度在6到30个字符之间", trigger: "blur" },
  ],
});

const handleSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid: boolean) => {
    if (valid) {
      const {
        data: { success, token },
      } = await axios.post("/api/users/login", loginUser.value);

      if (success && token) {
        localStorage.setItem("token", token);

        // 解析token
        const decode: userType = jwt_decode(token);
        console.log(decode);

        store.setAuth(!!decode);
        store.setUser(decode);

        // @ts-ignore
        ElMessage({
          message: "用户登录成功.",
          type: "success",
        });

        router.push("/");
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>

<style scoped>
</style>