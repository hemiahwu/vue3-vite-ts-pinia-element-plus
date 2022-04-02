<template>
  <div class="fillcontain">
    <div>
      <el-form :inline="true">
        <el-form-item label="时间筛选">
          <el-date-picker
            v-model="startTime"
            type="datetime"
            placeholder="选择开始时间"
          >
          </el-date-picker>
          --
          <el-date-picker
            v-model="endTime"
            type="datetime"
            placeholder="选择结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="handleSort"
            >筛选</el-button
          >
        </el-form-item>
        <el-form-item class="btn-right" v-if="user.identity === 'manager'">
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
        v-if="user.identity === 'manager'"
        label="操作"
        align="center"
        width="auto"
        prop="operation"
      >
        <template #default="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button size="small" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row>
      <el-col :span="24">
        <div class="pagination">
          <el-pagination
            v-if="total > 0"
            v-model:currentPage="page_index"
            v-model:page-size="page_size"
            :page-sizes="page_sizes"
            small="small"
            :layout="layout"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-col>
    </el-row>
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
import { formDataType, userType } from "../utils/types";
import { useAuthStore } from "../store";

const tableData = ref<formDataType[]>([]);
const allTableData = ref<formDataType[]>([]);
const filterTableData = ref<formDataType[]>([]);
const store = useAuthStore();
const user = ref<userType | any>();
const show = ref<boolean>(false);
const editData = ref<formDataType>();
const page_index = ref(1), // 当前位于哪一页
  page_size = ref(5), // 1页显示多少条
  total = ref(0), // 总条数
  page_sizes = [5, 10, 15, 20], // 每页显示多少条
  layout = "total, sizes, prev, pager, next, jumper"; // 翻页属性

// 时间筛选
const startTime = ref<Date>(),
  endTime = ref<Date>();

const getProfiles = async () => {
  const { data } = await axios("/api/profiles");

  tableData.value = data;
  allTableData.value = data;
  filterTableData.value = data;
  setPaginations();
};

watchEffect(() => {
  user.value = store.getUser;
  getProfiles();
});

const handleEdit = (row: formDataType) => {
  show.value = true;
  editData.value = row;
};
const handleDelete = async (row: formDataType) => {
  console.log(row);
  await axios.delete(`/api/profiles/delete/${row._id}`);

  // @ts-ignore
  ElMessage.success("删除成功");
  getProfiles();
};
const handleAdd = () => {
  show.value = true;
};

const handleUpdateProfiles = () => {
  getProfiles();
};

const handleSizeChange = (pages: number) => {
  // console.log(pages);
  page_index.value = 1;
  page_size.value = pages;

  // 重构数据
  tableData.value = allTableData.value.filter((item: any, index: number) => {
    return index < page_size.value;
  });
};
const handleCurrentChange = (page: number) => {
  // console.log(page);
  let currentPage = page_size.value * (page - 1);
  let pageData = allTableData.value.filter((item: any, index: number) => {
    return index >= currentPage;
  });
  tableData.value = pageData.filter((item: any, index: number) => {
    return index < page_size.value;
  });
};

const setPaginations = () => {
  total.value = allTableData.value.length;
  page_index.value = 1;
  page_size.value = 5;
  // 具体显示几页 6 5 2页 第一页5 第二页1
  tableData.value = allTableData.value.filter((item: any, index: number) => {
    return index < page_size.value;
  });
};

// 筛选
const handleSort = () => {
  if (!startTime.value || !endTime.value) {
    // @ts-ignore
    ElMessage({
      type: "warning",
      message: "请选择时间区间",
    });

    getProfiles();

    return;
  }

  // 实现过滤
  const stime = startTime.value.getTime();
  const etime = endTime.value.getTime();

  allTableData.value = filterTableData.value.filter((item: any) => {
    let date = new Date(item.date);
    let time = date.getTime();
    return time >= stime && time <= etime;
  });

  // 调用分页功能
  setPaginations();
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

.pagination {
  float: right;
  margin-top: 10px;
}
</style>