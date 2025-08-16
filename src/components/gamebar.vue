<template>
  <div class="gamebar">
    <!-- Logo -->
    <div class="left-section">
      <router-link to="/" class="logo">
    <img style="width: 60px" src="@/assets/logo.svg" alt="logo" />
      </router-link>
      
      <!-- 题目列表按钮 -->
      <el-button
        class="problem-list-btn"
        @click="showProblemList = true"
        :icon="List"
        text
      >
        题目列表
      </el-button>

      <!-- 导航按钮 -->
      <el-button-group class="nav-buttons">
        <el-button
          :icon="ArrowLeft"
          @click="handlePrevProblem"
          :disabled="!canGoPrev"
          text
        />
        <el-button
          :icon="ArrowRight"
          @click="handleNextProblem"
          :disabled="!canGoNext"
          text
        />
      </el-button-group>
    </div>

    <!-- 中间部分 -->
    <div class="middle-section">
      <el-button type="primary" @click="$emit('submit')" :loading="submitting">
        提交
      </el-button>
    </div>

    <!-- 右侧用户信息 -->
    <div class="right-section">
      <el-dropdown trigger="click">
        <el-avatar :size="40" :src="userAvatar" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleProfile">个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleSettings">设置</el-dropdown-item>
            <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <!-- 题目列表抽屉 -->
  <el-drawer
    v-model="showProblemList"
    title="题目列表"
    direction="ltr"
    size="300px"
  >
    <ProblemList @select="handleProblemSelect" />
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowLeft, ArrowRight, List } from '@element-plus/icons-vue';
import ProblemList from './ProblemList.vue';

const props = defineProps<{
  currentProblemId: number;
  totalProblems: number;
  submitting?: boolean;
}>();

const emit = defineEmits<{
  (e: 'change-problem', id: number): void;
  (e: 'submit'): void;
}>();

const router = useRouter();
const showProblemList = ref(false);

// 导航状态
const canGoPrev = computed(() => props.currentProblemId > 1);
const canGoNext = computed(() => props.currentProblemId < props.totalProblems);

// 用户头像（这里使用默认头像，实际应该从用户状态获取）
const userAvatar = ref('/default-avatar.png');

// 处理题目导航
const handlePrevProblem = () => {
  if (canGoPrev.value) {
    emit('change-problem', props.currentProblemId - 1);
  }
};

const handleNextProblem = () => {
  if (canGoNext.value) {
    emit('change-problem', props.currentProblemId + 1);
  }
};

const handleProblemSelect = (problemId: number) => {
  showProblemList.value = false;
  emit('change-problem', problemId);
};

// 用户相关操作
const handleProfile = () => {
  router.push('/profile');
};

const handleSettings = () => {
  router.push('/settings');
};

const handleLogout = async () => {
  // TODO: 实现登出逻辑
  router.push('/login');
};
</script>

<style scoped>
.gamebar {
  height: 60px;
  padding: 0 20px;
  background: white;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.problem-list-btn {
  font-size: 14px;
}

.nav-buttons {
  margin-left: 8px;
}

.middle-section {
  flex: 1;
  display: flex;
  justify-content: center;
}

.right-section {
  display: flex;
  align-items: center;
}

/* 头像悬停效果 */
.el-avatar {
  cursor: pointer;
  transition: transform 0.2s;
}

.el-avatar:hover {
  transform: scale(1.05);
}

/* 按钮样式优化 */
.el-button {
  padding: 8px 16px;
}

.el-button--text {
  padding: 8px;
}

.el-button-group .el-button {
  padding: 8px 12px;
}
</style>