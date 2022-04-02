<template>
  <el-dialog
    :before-close="handleClose"
    v-model="show"
    :title="editData ? '编辑收支信息' : '添加收支信息'"
  >
    <el-form
      :model="formData"
      ref="form"
      :rules="formRules"
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
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit(form)">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { FormInstance } from "element-plus";
import { formDataType, formRulesType } from "../utils/types";
import axios from "../utils/http";

const typeList = ref(["现金", "微信", "支付宝", "银行卡"]);
const form = ref<FormInstance>();

const formData = ref<formDataType | any>({
  type: "现金",
  describe: "购买课程",
  income: "1580",
  expend: "158",
  cash: "2000",
  remark: "提升技能,升职加薪",
});

const formRules: formRulesType = {
  describe: [{ required: true, message: "收支描述不能为空", trigger: "blur" }],
  income: [{ required: true, message: "收入不能为空", trigger: "blur" }],
  expend: [{ required: true, message: "支出不能为空", trigger: "blur" }],
  cash: [{ required: true, message: "账户现金不能为空", trigger: "blur" }],
};

const handleSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid: boolean) => {
    if (valid) {
      //   console.log(formData.value);
      const url = !props.editData?._id ? "add" : `edit/${props.editData._id}`;
      await axios.post(`/api/profiles/${url}`, formData.value);
      // @ts-ignore
      ElMessage.success("保存成功");

      emits("handleUpdateProfiles");
      emits("closeModal");
    } else {
    }
  });
};

const handleClose = () => {
  emits("closeModal");
};

const emits = defineEmits(["closeModal", "handleUpdateProfiles"]);

watch(
  () => props.editData,
  () => {
    formData.value = props.editData;
  }
);

const props = defineProps({
  show: {
    type: Boolean,
  },
  editData: {
    type: Object as () => formDataType,
  },
});
</script>

<style>
</style>