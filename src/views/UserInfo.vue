<template>
  <div class="info-container">
    <el-row type="flex" class="content" justify="center">
      <el-col :span="8">
        <div class="user">
          <img
            v-if="store.user.avatar"
            :src="store.user.avatar"
            class="avatar"
            alt=""
          />
          <img v-else src="../assets/default.jpeg" class="avatar" alt="" />
        </div>
      </el-col>
      <el-col :span="16">
        <div class="userinfo">
          <div class="user-item">
            <i class="fa fa-user"></i>
            <span>{{ store.user.name }}</span>
          </div>
          <div class="user-item">
            <i class="fa fa-cog"></i>
            <span>{{
              store.user.identity === "manager" ? "管理员" : "普通用户"
            }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "../store";

const store: any = useAuthStore();
</script>

<style scoped>
.info-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* padding: 16px; */
}
.content {
  width: 100%;
  height: 100%;
}
.user {
  text-align: center;
  position: relative;
  top: 30%;
}
.user img {
  width: 150px;
  border-radius: 50%;
}
.user span {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo {
  height: 100%;
  background-color: #eee;
}
.user-item {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: #333;
}
</style>