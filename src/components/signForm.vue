<template>
  <div class="login-container">
    <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" label-position="top">
      <el-form-item label="账号" prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入您的账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password" placeholder="输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin" size="large">登录</el-button>

      </el-form-item>
    </el-form>
    <div class="tip" @click="handleRegister">还未有chd123账户？立即注册></div>
    <div class="tip" @click="goto('home')">随便逛逛</div>
    <el-dialog
      v-model="registerDialogVisible"
      title="立即注册，加入chd123"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="registerForm" :rules="registerRules" ref="registerFormRef" label-position="top">
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="registerForm.nickname" placeholder="起一个简单的名字"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email" placeholder="请输入您的邮箱作为账号凭证"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password" type="password" placeholder="请输入6-12位密码，任意数字或字符"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="registerForm.confirmPassword" type="password" placeholder="确认密码"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="registerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleRegisterSubmit">注册</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import router from '@/router';
function goto(s:string) {
  router.push(s)
}
const loginForm = ref({
  username: '',
  password: '',
});

const loginRules = {
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { pattern: /^\d{6}$/, message: '账号必须是6位数字', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '密码长度必须在6到12位之间', trigger: 'blur' },
  ],
};

const registerDialogVisible = ref(false);

const registerForm = ref({
  nickname: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const registerRules = {
  nickname: [
    { required: true, message: '3-12个字符', trigger: 'blur' },
    {min:3,max:10,message:"3-12个字符",trigger:"blur"}
  ],
  email: [
    { required: true, message: '请输入邮箱，这是账号的唯一凭证', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: ['blur', 'change'] },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '密码长度必须在6到12位之间', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: (rule-1, value, callback) => {
      if (value !== registerForm.value.password) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    }, trigger: 'blur' },
  ],
};

const loginFormRef = ref(null);
const registerFormRef = ref(null);

const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('登录成功');
    } else {
      ElMessage.error('表单验证失败');
    }
  });
};

const handleRegister = () => {
  registerDialogVisible.value = true;
};

const handleRegisterSubmit = () => {
  registerFormRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('注册成功');
      registerDialogVisible.value = false;
    } else {
      ElMessage.error('表单验证失败');
    }
  });
};
</script>

<style scoped>
.login-container {
  width: 300px;
  margin: 50px auto;
  padding: 0px;

}
.tip{
margin: 10px 0;
cursor: pointer;
}
.tip:hover{
  color: #6edbf7;
  font-style: italic;
}
</style>