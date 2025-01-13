<template>
        <el-button class="login-btn" type="primary" @click="dialogFormVisible = true">注册</el-button>
    <el-dialog v-model="dialogFormVisible" title="注册" class="signup-block" :rules="rules">
      <el-form :model="form">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input v-model="form.passwordconfirm" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off" />
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
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";

const form = reactive({
  username: "",
  password: "",
  passwordconfirm: "",
  email:"",
});
const rules = reactive({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
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