<template>
  <div class="main-box">
    <RouterLink to="/home" index="3" class="nav-link"> to home</RouterLink>
    <Gamebar class="game-bar"></Gamebar>
    <el-container class="content-container">
      <el-container>
        <el-aside width="200px">
          <Gamedescribe></Gamedescribe>
        </el-aside>
        <el-main>
          <Editor></Editor>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Editor from "@/components/Editor.vue";
import Gamebar from "@/components/gamebar.vue";
import Gamedescribe from "@/components/gamedescribe.vue";
</script>

<style scoped>
.main-box {
  display: flex;
  flex-direction: column;
  height: 80vh; /* 整个视口的高度 */
}

.nav-link, .game-bar {
  height: 50px; /* 固定高度 */
  width: 100%; /* 宽度填充整个屏幕 */
}

.content-container {
  flex: 1; /* 高度填充剩余屏幕 */
  margin-top: 20px;
  display: flex;
  flex-direction: column; /* 确保子元素垂直排列 */
}

.el-aside {
  flex-shrink: 0; /* 防止侧边栏在屏幕缩小时缩小 */
}

.el-main {
  flex: 1; /* 主内容区域填充剩余空间 */
}
</style>