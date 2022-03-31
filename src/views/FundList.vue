<template>
  <div class="fillcontain">
    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="450"
      border
      v-if="tableData.length > 0"
    >
      <el-table-column type="index" label="序号" align="center" width="70" />
      <el-table-column label="时间" align="center" width="auto" prop="date">
        <template #default="scope">
          <el-icon><Timer /></el-icon>
          <span style="margin-left: 10px">
            {{ scope.row.date.slice(0, 10) }}
          </span>
        </template>
      </el-table-column>
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
      <el-table-column label="收入" align="center" width="auto" prop="income">
        <template #default="scope">
          <span style="color: #00d053"> +{{ scope.row.income }} </span>
        </template>
      </el-table-column>
      <el-table-column label="支出" align="center" width="auto" prop="expend">
        <template #default="scope">
          <span style="color: #f56767"> -{{ scope.row.expend }} </span>
        </template>
      </el-table-column>
      <el-table-column label="现金" align="center" width="auto" prop="cash">
        <template #default="scope">
          <span style="color: #4db3ff">
            {{ scope.row.cash }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" width="auto" prop="remark" />

      <el-table-column
        label="操作"
        align="center"
        width="auto"
        prop="operation"
      >
        <template #default="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$idnex, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
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
const handleEdit = (row: any) => {};
const handleDelete = (row: any, inde: any) => {};
</script>

<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
</style>