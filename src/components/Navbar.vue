<template>
  <nav class="nav">
    <el-row>
      <el-col :span="12" class="logo-container">
        <img src="../assets/logo.png" class="logo" alt="logo" />
        <span class="title">后台管理系统</span>
      </el-col>
      <el-col :span="12" class="user">
        <div class="userinfo">
          <img
            v-if="store.user.avatar"
            :src="store.user.avatar"
            class="avatar"
            alt=""
          />
          <img v-else src="../assets/default.jpeg" class="avatar" alt="" />
          <div class="welcome-content">
            <p class="content welcome">欢迎</p>
            <p class="content username">{{ store.user.name }}</p>
          </div>
          <span class="dropdown">
            <el-dropdown trigger="click" @command="handleDropdown">
              <span class="el-dropdown-link">
                <el-icon><arrow-down /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="info">个人信息</el-dropdown-item>
                  <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </nav>
</template>

<script  setup lang="ts">
import { ArrowDown } from "@element-plus/icons-vue";
import router from "../router";
import { useAuthStore } from "../store";

const store: any = useAuthStore();

const handleDropdown = (item: string) => {
  switch (item) {
    case "info":
      showUserInfo();
      break;
    case "logout":
      logout();
      break;
  }
};

const showUserInfo = () => {
  console.log("跳转到个人信息");
};

const logout = () => {
  localStorage.removeItem("token");

  store.setAuth(false);
  store.setUser(null);

  router.push("/login");
};
</script>

<style scoped>
.nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #074c62;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}

.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}

.user {
  line-height: 60px;
  text-align: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome-content {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.content {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.welcome {
  font-size: 12px;
}
.username {
  color: #409eff;
  font-weight: bolder;
}
.dropdown {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}

.dropdown i {
  margin-top: 20px;
}
</style>