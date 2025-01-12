<template>
  <el-affix :offset="0">
    <Headbar index="4" />
  </el-affix>
  <div class="main-box">
    <el-container class="container">
      <el-main class="main">        建议卡片
        <div class="recommand-cards">
  
          <el-card style="max-width: 480px" />
          <el-card style="max-width: 480px" />
          <el-card style="max-width: 480px" />
        </div>
        <Exercise />
      </el-main>
      <el-aside class="aside"> 热门题目 </el-aside>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Exercise from "@/components/exercise.vue";
import Headbar from "@/components/headbar.vue";
</script>
<style scoped>
.main-box {
  display: flex;
}
.recommand-cards{
    display:flex;
}
.el-card{
    width: 200px;
    height: 200px;
    margin: auto;
    margin-bottom: 35px;
}
</style>
