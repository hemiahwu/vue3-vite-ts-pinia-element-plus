<template>
  <div class="index">
    <Navbar />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import axios from "../utils/http";
import Navbar from "../components/Navbar.vue";

onMounted(async () => {
  try {
    const data = await axios.get("/api/users/current");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});
</script>

<style>
</style>