<template>
  <div class="test-cases">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="测试用例" name="testCases">
        <div class="test-case-list">
          <div v-for="(testCase, index) in testCases" :key="index" class="test-case-item">
            <div class="test-case-header">
              <span>测试用例 {{ index + 1 }}</span>
              <el-tag :type="testCase.passed ? 'success' : 'danger'" size="small">
                {{ testCase.passed ? '通过' : '失败' }}
              </el-tag>
            </div>
            <div class="test-case-content">
              <div>输入：{{ testCase.input }}</div>
              <div>期望输出：{{ testCase.expectedOutput }}</div>
              <div>实际输出：{{ testCase.actualOutput }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="提交记录" name="submissions">
        <el-table :data="submissions" style="width: 100%">
          <el-table-column prop="time" label="提交时间" width="180" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="row.passed ? 'success' : 'danger'">
                {{ row.passed ? '通过' : '失败' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="language" label="语言" width="100" />
          <el-table-column prop="runtime" label="运行时间" width="100" />
          <el-table-column prop="memory" label="内存消耗" width="100" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface TestCase {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
}

interface Submission {
  time: string;
  status: string;
  passed: boolean;
  language: string;
  runtime: string;
  memory: string;
}

const props = defineProps<{
  testCases: TestCase[];
  submissions: Submission[];
}>();

const activeTab = ref('testCases');
</script>

<style scoped>
.test-cases {
  height: 300px;
  overflow-y: auto;
  padding: 20px;
}

.test-case-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.test-case-item {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 4px;
}

.test-case-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.test-case-content {
  padding-left: 12px;
  color: #606266;
}
</style> 