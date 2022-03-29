<template>
  <div class="home">
    <Navbar />
    <router-view></router-view>
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
</style>