<template>
  <div class="main">
    <el-container class="el-container">
      <el-header class="header">
        <headbar index="3"/>
      </el-header>
      <el-main class="main">
        <Introduce />
        <div class="btn-box">
          <Login size="large" />
          <el-button>浏览</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Introduce from "@/components/introduce.vue";
import Login from "@/components/login.vue";
import headbar from "@/components/headbar.vue";
</script>

<style scoped>
.btn-box {
  display: flex; /* 使用 flex 布局 */
  justify-content: center; /* 水平居中对齐 */
  align-items: center;
  gap: 30px; /* 按钮之间的间距 */
}
.el-button {
  height: 60px;
}
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
.main {
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
