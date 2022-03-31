<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="450"
      border
      v-if="tableData.length > 0"
    >
      <el-table-column type="index" label="序号" align="center" width="70" />
      <el-table-column label="时间" align="center" width="auto" prop="date" />
      <el-table-column
        label="收支类型"
        align="center"
        width="auto"
        prop="type"
      />
      <el-table-column
        label="收支描述"
        align="center"
        width="auto"
        prop="describe"
      />
      <el-table-column label="收入" align="center" width="auto" prop="income" />
      <el-table-column label="支出" align="center" width="auto" prop="expend" />
      <el-table-column label="现金" align="center" width="auto" prop="cash" />
      <el-table-column label="备注" align="center" width="auto" prop="remark" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import axios from "../utils/http";

const tableData = ref([]);

const getProfiles = async () => {
  const { data } = await axios("/api/profiles");

  tableData.value = data;

  console.log(data);
};

watchEffect(() => getProfiles());
</script>

<style scoped>
</style>