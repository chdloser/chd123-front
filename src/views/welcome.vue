<template>
  <div class="div-main">
    <el-container>
      <el-header>
        <headbar index="1" />
      </el-header>
      <el-main>
        <Introduce />
        <div class="btn-box">
          <el-button id="log-btn" @click="goto('/login')">
            登录/注册
          </el-button>
          <el-button id="try-btn" @click="goto('/home')"> 游客访问 </el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Introduce from "@/components/introduce.vue";
import headbar from "@/components/headbar.vue";
import router from "@/router";
function goto(s: string) {
  router.push(s);
}
</script>

<style scoped>
.btn-box {
  display: flex; /* 使用 flex 布局 */
  justify-content: space-around; /* 水平居中对齐 */
  align-items: center;
  gap: 30px; /* 按钮之间的间距 */
  margin: auto;
  margin-top: 50px;
  padding: 20px 40px;
  height: 60px;
  width: 400px;
  background-color: #ffffff;
  border-radius: 20px;
}
.el-header {
  padding: 0;
}
.el-button {
  height: 70px;
}

.el-aside {
  text-align: center;
}

.el-main {
  text-align: center;
}
.div-main {
  position: relative;
  display: flex; /* 使用 flex 布局 */
  flex-direction: column; /* 子元素垂直排列 */
  flex: 1; /* 让 main 撑满剩余空间 */
}
.div-main::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgb(255, 255, 255, 1), rgba(223, 223, 243, 1));
  z-index: -1; /* 保证伪元素在子元素下方 */
}
#log-btn {
  color: #000;
  background-color: #2a82e4;
  font: 32px bold;
  transition: border-color 0.3s, background-color 0.3s;
}
#log-btn:hover {
  border-color: #83bfff;
  background-color: #90c4ff;
}
</style>
