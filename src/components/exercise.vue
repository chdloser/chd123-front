<template>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="status" label="状态" width="80">
        <template #default="{ row }">
          <el-tag :type="row.status === '完成' ? 'success' : 'info'">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="题目" />
      <el-table-column prop="solutionCount" label="题解" />
      <el-table-column prop="passRate" label="通过率" />
      <el-table-column prop="difficulty" label="难度" />
      <el-table-column prop="frequency" label="出题频率" />
    </el-table>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const tableData = ref([
    { status: '未完成', title: '2275.按位与结果大于零的最长组合', solutionCount: 167, passRate: '70.7%', difficulty: '中等', frequency: '' },
    { status: '完成', title: '1.两数之和', solutionCount: 26388, passRate: '54.5%', difficulty: '简单', frequency: '' },
    { status: '未完成', title: '2.两数相加', solutionCount: 14557, passRate: '44.8%', difficulty: '中等', frequency: '' },
    { status: '未完成', title: '3.无重复字符的最长子串', solutionCount: 17349, passRate: '40.6%', difficulty: '中等', frequency: '' },
    { status: '完成', title: '4.寻找两个正序数组的中位数', solutionCount: 8370, passRate: '42.9%', difficulty: '困难', frequency: '' },
    { status: '未完成', title: '5.最长回文子串', solutionCount: 9322, passRate: '39.0%', difficulty: '中等', frequency: '' },
    { status: '未完成', title: '6.Z字形变换', solutionCount: 5719, passRate: '53.5%', difficulty: '中等', frequency: '' },
    { status: '未完成', title: '7.整数反转', solutionCount: 8003, passRate: '35.6%', difficulty: '中等', frequency: '' },
  ]);
  </script>
  
  <style scoped>
  /* 你可以在这里添加自定义样式 */
  </style>