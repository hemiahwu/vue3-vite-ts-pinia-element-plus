<template>
  <el-dialog v-model="show" title="添加收支信息">
    <el-form ref="form" label-width="120px" style="margin: 10px; width: auto">
      <el-form-item label="收支类型">
        <el-select placeholder="收支类型">
          <el-option>现金</el-option>
          <el-option>微信</el-option>
          <el-option>支付宝</el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="describe" label="收支描述">
        <el-input type="describe"></el-input>
      </el-form-item>
      <el-form-item prop="income" label="收入">
        <el-input type="income"></el-input>
      </el-form-item>
      <el-form-item prop="expend" label="支出">
        <el-input type="expend"></el-input>
      </el-form-item>
      <el-form-item prop="cash" label="账户现金">
        <el-input type="cash"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea"></el-input>
      </el-form-item>
      <el-form-item class="text-right">
        <el-button>取消</el-button>
        <el-button type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
defineProps({
  show: {
    type: Boolean,
  },
});
</script>

<style>
</style>