<template>
  <!-- 侧边栏 -->
  <el-row class="menu-container">
    <el-col :span="12">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#074c62"
        class="el-menu-vertical-demo"
        default-active="1"
        text-color="#fff"
      >
        <el-menu-item index="1">
          <!-- <el-icon><icon-menu /></el-icon> -->
          <span>首页</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <!-- <el-icon><location /></el-icon> -->
            <span>资金管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">资金流水</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <!-- <el-icon><location /></el-icon> -->
            <span>信息管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">个人信息</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
</script>

<style scoped>
.menu-container {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #074c62;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 100vh;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-sub-menu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>