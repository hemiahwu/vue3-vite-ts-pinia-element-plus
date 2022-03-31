<template>
  <el-dialog v-model="show" title="添加收支信息">
    <el-form
      :model="formData"
      ref="form"
      label-width="120px"
      style="margin: 10px; width: auto"
    >
      <el-form-item label="收支类型">
        <el-select v-model="formData.type" placeholder="收支类型">
          <el-option
            v-for="(formType, index) in typeList"
            :key="index"
            :label="formType"
            :value="formType"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="describe" label="收支描述">
        <el-input v-model="formData.describe" type="describe"></el-input>
      </el-form-item>
      <el-form-item prop="income" label="收入">
        <el-input v-model="formData.income" type="income"></el-input>
      </el-form-item>
      <el-form-item prop="expend" label="支出">
        <el-input v-model="formData.expend" type="expend"></el-input>
      </el-form-item>
      <el-form-item prop="cash" label="账户现金">
        <el-input v-model="formData.cash" type="cash"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formData.remark" type="textarea"></el-input>
      </el-form-item>
      <el-form-item class="text-right">
        <el-button>取消</el-button>
        <el-button type="primary" @click="hadnleSubmit('form')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const typeList = ref(["现金", "微信", "支付宝", "银行卡"]);
const form = ref({});

const formData = ref({
  type: "现金",
  describe: "购买课程",
  income: "1580",
  expend: "158",
  cash: "2000",
  remark: "提升技能,升职加薪",
});

const hadnleSubmit = () => {
  // @ts-ignore
  form.value.validate((valid) => {
    console.log(formData.value);
  });
};

defineProps({
  show: {
    type: Boolean,
  },
});
</script>

<style>
</style>