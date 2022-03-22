<template>
  <div class="index">初始化页面</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import axios from "axios";

onMounted(async () => {
  try {
    const data = await axios.get("/api/users/current", {
      headers: {
        Authorization: localStorage.token,
      },
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});
</script>

<style>
</style>