<template>
  <div class="game-container">
    <!-- 题目工具栏 -->
    <gamebar 
      :problem-id="currentProblemId"
      @change-problem="handleProblemChange"
    />
    
    <el-container class="main-content">
      <el-aside width="400px">
        <!-- 题目描述 -->
        <gamedescribe 
          :problem="currentProblem"
          @example-click="handleExampleClick"
        />
      </el-aside>
      
      <el-main>
        <!-- 代码编辑器 -->
        <Editor
          ref="editorRef"
          :initial-code="currentProblem?.template || ''"
          @code-change="handleCodeChange"
          @submit="handleSubmit"
        />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import gamebar from '@/components/gamebar.vue';
import gamedescribe from '@/components/gamedescribe.vue';
import Editor from '@/components/Editor.vue';

interface Problem {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  template: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
}

const currentProblemId = ref<number>(1);
const currentProblem = ref<Problem | null>(null);
const editorRef = ref();

// 处理题目切换
const handleProblemChange = (problemId: number) => {
  currentProblemId.value = problemId;
  // TODO: 从API获取题目详情
  loadProblemDetails(problemId);
};

// 加载题目详情
const loadProblemDetails = async (problemId: number) => {
  try {
    // TODO: 调用API获取题目详情
    // const response = await api.getProblemDetails(problemId);
    // currentProblem.value = response.data;
  } catch (error) {
    console.error('Failed to load problem details:', error);
  }
};

// 处理示例点击
const handleExampleClick = (example: any) => {
  // TODO: 实现测试用例运行逻辑
};

// 处理代码变更
const handleCodeChange = (code: string) => {
  // TODO: 保存代码到本地存储或其他操作
};

// 处理代码提交
const handleSubmit = async (code: string, language: string) => {
  try {
    // TODO: 实现代码提交逻辑
    // const response = await api.submitCode({
    //   problemId: currentProblemId.value,
    //   code,
    //   language
    // });
  } catch (error) {
    console.error('Failed to submit code:', error);
  }
};

onMounted(() => {
  // 加载初始题目
  loadProblemDetails(currentProblemId.value);
});
</script>

<style scoped>
.game-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  overflow: hidden;
}

.el-aside {
  border-right: 1px solid #dcdfe6;
  background: white;
  overflow-y: auto;
}

.el-main {
  padding: 0;
  background: #f5f7fa;
}
</style>