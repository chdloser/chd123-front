<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="app-container">
    <RouterView />
  </div>
</template>
<style scoped>
.app-container {
  margin: 0;
  height: 100vh; /* 设置 app-container 高度为视口高度 */
  display: flex; /* 使用 flex 布局 */
  flex-direction: column; /* 子元素垂直排列 */
  margin: 0;
}
</style>
