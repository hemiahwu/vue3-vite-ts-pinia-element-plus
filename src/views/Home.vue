<template>
  <div class="home">
    <Navbar />
    <Sidebar />
    <div class="container-right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import axios from "../utils/http";

onMounted(async () => {
  try {
    const data = await axios.get("/api/users/current");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.container-right {
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>