<template>
   <div class="main-box">
    <el-header class="top-bar">
      <button @click="handleClick('home')">首页</button>
      <button @click="handleClick('profile')">个人资料</button>
      <button @click="handleClick('settings')">设置</button>
      <button @click="handleClick('help')">帮助</button>
      <button @click="handleClick('logout')">登出</button>
    </el-header>
  </div>
</template>
<script lang="ts" setup>
function handleClick(x:string)
{
console.log(x)
}
</script>

<style scoped>

.top-bar {
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  gap:10px
}

.top-bar button {
  margin-right: 10px;
  border:color(srgb red green blue);
  border-radius: 10px;
  color: rgb(0, 0, 0);
  cursor: pointer;
  padding: 10px;
  margin: 10px;
}

.top-bar button:hover {
  background-color: #a0e2e1;
}
</style>