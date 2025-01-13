<template>
  <div class="main-box">
    <el-container>
      <el-header>
        <headbar index="3"/>
      </el-header>
      <el-main>
        <Introduce />
        <div class="btn-box">
          <Login />
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
.el-header{
  padding: 0;
}
.el-button {
  height: 60px;
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
.main-box {
  display: flex; /* 使用 flex 布局 */
  flex-direction: column; /* 子元素垂直排列 */
  margin: 0;
  flex: 1; /* 让 main 撑满剩余空间 */
  margin: 0;
  padding: 0;
}
</style>
