<template>
    <el-button class="login-btn" :size ="size" type="primary" @click="dialogFormVisible = true">登录</el-button>
    <el-dialog v-model="dialogFormVisible" title="登录" class="login-block">
      <el-form :model="form">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { defineProps } from "vue";
const props = defineProps({
  size: {
    type: String,
    default: 'medium' // 默认大小
  },
});
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";

const form = reactive({
  id: "",
  password: "",
});
</script>
<style scoped>
.login-btn{
    width: 200px;
    height: 85px;
    font-family: 'Courier New', Courier, monospace;
    font-size:xx-large;
}
</style>