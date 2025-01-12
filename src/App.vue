<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="app-container">
    <RouterView />
  </div>
</template>
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.app-container {
  margin: 0;
  height: 100vh; /* 设置 app-container 高度为视口高度 */
  display: flex; /* 使用 flex 布局 */
  flex-direction: column; /* 子元素垂直排列 */
  margin: 0;
}
.el-container {
  flex: 1; /* 让 el-container 撑满 app-container */
  display: flex; /* 使用 flex 布局 */
  flex-direction: column; /* 子元素垂直排列 */
  margin: 0;
  padding: 0;
}
.header {
  height: 60px; /* 设置 header 固定高度 */
}
.main {
  flex: 1; /* 让 main 撑满剩余空间 */
  margin: 0;
  padding: 0;
}
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
