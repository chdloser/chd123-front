<template>
    <div class="main">
      <Introduce />
      <div class="btn-box">
        <Login size="large" />
        <el-button>浏览</el-button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import Introduce from "@/components/introduce.vue";
  import Login from "@/components/login.vue";
  </script>
  
  <style scoped>
  .btn-box {
    display: flex; /* 使用 flex 布局 */
    justify-content: center; /* 水平居中对齐 */
    align-items: center;
    gap: 30px; /* 按钮之间的间距 */
  }
  .el-button
  {
    height: 60px;
  }
  </style>