<template>
  <div class="fillcontain">
    <div>
      <el-form :inline="true">
        <el-form-item class="btn-right">
          <el-button type="primary" size="small" @click="handleAdd"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </div>
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
  <DialogModal
    :show="show"
    @closeModal="show = false"
    @handleUpdateProfiles="handleUpdateProfiles"
    :editData="editData"
  />
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import axios from "../utils/http";
import { formDataType } from "../utils/types";

const tableData = ref<never[]>([]);
const show = ref<boolean>(false);
const editData = ref<formDataType>();

const getProfiles = async () => {
  const { data } = await axios("/api/profiles");

  tableData.value = data;
};

watchEffect(() => getProfiles());
const handleEdit = (row: formDataType) => {
  show.value = true;
  editData.value = row;
  console.log(row);
};
const handleDelete = (row: formDataType, index: number) => {};
const handleAdd = () => {
  show.value = true;
};

const handleUpdateProfiles = () => {
  getProfiles();
};
</script>

<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}

.btn-right {
  float: right;
}
</style>