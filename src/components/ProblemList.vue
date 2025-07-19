<template>
  <div class="problem-list">
    <el-input
      v-model="searchQuery"
      placeholder="搜索题目"
      prefix-icon="Search"
      clearable
      @clear="handleSearch"
      @input="handleSearch"
    />
    
    <div class="filters">
      <el-select v-model="difficulty" placeholder="难度" clearable @change="handleSearch">
        <el-option label="简单" value="easy" />
        <el-option label="中等" value="medium" />
        <el-option label="困难" value="hard" />
      </el-select>
      
      <el-select v-model="status" placeholder="状态" clearable @change="handleSearch">
        <el-option label="未完成" value="todo" />
        <el-option label="已解决" value="solved" />
        <el-option label="尝试过" value="attempted" />
      </el-select>
    </div>

    <el-scrollbar height="calc(100vh - 250px)">
      <div class="problems">
        <div
          v-for="problem in filteredProblems"
          :key="problem.id"
          class="problem-item"
          :class="{ active: problem.id === currentProblemId }"
          @click="$emit('select', problem.id)"
        >
          <div class="problem-status" :class="problem.status">
            <el-icon v-if="problem.status === 'solved'"><Check /></el-icon>
            <el-icon v-else-if="problem.status === 'attempted'"><Warning /></el-icon>
          </div>
          
          <div class="problem-info">
            <div class="problem-title">
              <span class="problem-id">#{{ problem.id }}</span>
              {{ problem.title }}
            </div>
            <div class="problem-meta">
              <el-tag :type="getDifficultyType(problem.difficulty)" size="small">
                {{ problem.difficulty }}
              </el-tag>
              <span class="acceptance-rate">通过率: {{ problem.acceptanceRate }}%</span>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { Search, Check, Warning } from '@element-plus/icons-vue';

interface Problem {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'todo' | 'solved' | 'attempted';
  acceptanceRate: number;
}

// 模拟题目数据
const problems = ref<Problem[]>([
  {
    id: 1,
    title: '两数之和',
    difficulty: 'easy',
    status: 'solved',
    acceptanceRate: 48.5
  },
  {
    id: 2,
    title: '两数相加',
    difficulty: 'medium',
    status: 'attempted',
    acceptanceRate: 35.2
  },
  {
    id: 3,
    title: '最长回文子串',
    difficulty: 'hard',
    status: 'todo',
    acceptanceRate: 25.8
  }
]);

const searchQuery = ref('');
const difficulty = ref('');
const status = ref('');
const currentProblemId = ref(1);

// 过滤题目列表
const filteredProblems = computed(() => {
  return problems.value.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      problem.id.toString().includes(searchQuery.value);
    const matchesDifficulty = !difficulty.value || problem.difficulty === difficulty.value;
    const matchesStatus = !status.value || problem.status === status.value;
    
    return matchesSearch && matchesDifficulty && matchesStatus;
  });
});

// 处理搜索
const handleSearch = () => {
  // TODO: 实现搜索逻辑
};

// 获取难度对应的标签类型
const getDifficultyType = (difficulty: string) => {
  const types: Record<string, string> = {
    easy: 'success',
    medium: 'warning',
    hard: 'danger'
  };
  return types[difficulty] || 'info';
};
</script>

<style scoped>
.problem-list {
  padding: 16px;
}

.filters {
  margin: 16px 0;
  display: flex;
  gap: 12px;
}

.problems {
  margin-top: 16px;
}

.problem-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #ebeef5;
  cursor: pointer;
  transition: background-color 0.2s;
}

.problem-item:hover {
  background-color: #f5f7fa;
}

.problem-item.active {
  background-color: #ecf5ff;
}

.problem-status {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.problem-status.solved {
  color: #67c23a;
}

.problem-status.attempted {
  color: #e6a23c;
}

.problem-info {
  flex: 1;
}

.problem-title {
  font-size: 14px;
  margin-bottom: 4px;
}

.problem-id {
  color: #909399;
  margin-right: 8px;
}

.problem-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
}

.acceptance-rate {
  color: #909399;
}

:deep(.el-input__wrapper) {
  border-radius: 4px;
}

:deep(.el-select) {
  width: 120px;
}
</style> 