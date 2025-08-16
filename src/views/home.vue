<template>
  <el-affix :offset="0">
    <Headbar index="2" />
  </el-affix>
  <div class="main-box">
    <el-container class="container">
      <el-main class="main">
        <h2>推荐题目</h2>
        <div class="recommend-cards">
          <el-card
            v-for="problem in recommendProblems"
            :key="problem.id"
            class="problem-card"
          >
            <template #header>
              <div class="card-header">
                <span>{{ problem.title }}</span>
                <el-tag
                  :type="getDifficultyType(problem.difficulty)"
                  size="small"
                >
                  {{ getDifficultyLabel(problem.difficulty) }}
                </el-tag>
              </div>
            </template>
            <div class="card-content">
              <p class="description">{{ problem.description }}</p>
              <div class="card-footer">
                <el-tag size="small">{{ problem.category }}</el-tag>
                <el-button
                  type="primary"
                  size="small"
                  @click="goToProblem(problem.id)"
                >
                  开始做题
                </el-button>
              </div>
            </div>
          </el-card>
        </div>

        <div class="problem-section">
          <h2>最新题目</h2>
          <el-table :data="latestProblems" style="width: 100%">
            <el-table-column prop="id" label="编号" width="80" />
            <el-table-column prop="title" label="标题">
              <template #default="{ row }">
                <router-link :to="'/problem/' + row.id" class="problem-link">
                  {{ row.title }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="category" label="分类" width="120" />
            <el-table-column prop="difficulty" label="难度" width="100">
              <template #default="{ row }">
                <el-tag :type="getDifficultyType(row.difficulty)" size="small">
                  {{ getDifficultyLabel(row.difficulty) }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>

      <el-aside class="aside">
        <h2>热门题目</h2>
        <el-card
          v-for="problem in hotProblems"
          :key="problem.id"
          class="hot-problem-card"
        >
          <div class="hot-problem-title">
            <router-link :to="'/problem/' + problem.id">{{
              problem.title
            }}</router-link>
          </div>
          <div class="hot-problem-info">
            <el-tag :type="getDifficultyType(problem.difficulty)" size="small">
              {{ getDifficultyLabel(problem.difficulty) }}
            </el-tag>
            <span class="submission-count"
              >提交次数：{{ problem.submissionCount }}</span
            >
          </div>
        </el-card>
      </el-aside>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Headbar from "@/components/headbar.vue";
import { getProblems } from "@/api";

const router = useRouter();
const recommendProblems = ref([]);
const latestProblems = ref([]);
const hotProblems = ref([]);

// 获取推荐题目
const fetchRecommendProblems = async () => {
  try {
    const response = await getProblems({ recommend: true, limit: 3 });
    recommendProblems.value = response.data;
  } catch (error) {
    console.error("获取推荐题目失败", error);
  }
};

// 获取最新题目
const fetchLatestProblems = async () => {
  try {
    const response = await getProblems({ sort: "newest", limit: 5 });
    latestProblems.value = response.data;
  } catch (error) {
    console.error("获取最新题目失败", error);
  }
};

// 获取热门题目
const fetchHotProblems = async () => {
  try {
    const response = await getProblems({ sort: "hot", limit: 5 });
    hotProblems.value = response.data;
  } catch (error) {
    console.error("获取热门题目失败", error);
  }
};

// 难度标签样式
const getDifficultyType = (difficulty: string) => {
  const types: Record<string, string> = {
    easy: "success",
    medium: "warning",
    hard: "danger",
  };
  return types[difficulty] || "info";
};

// 难度标签文本
const getDifficultyLabel = (difficulty: string) => {
  const labels: Record<string, string> = {
    easy: "简单",
    medium: "中等",
    hard: "困难",
  };
  return labels[difficulty] || difficulty;
};

// 跳转到题目详情
const goToProblem = (id: string) => {
  router.push(`/problem/${id}`);
};

onMounted(() => {
  fetchRecommendProblems();
  fetchLatestProblems();
  fetchHotProblems();
});
</script>

<style scoped>
.main-box {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 60px);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  gap: 20px;
}

.main {
  background: transparent;
  padding: 0;
}

.aside {
  width: 300px !important;
  margin-left: 20px;
}

h2 {
  margin-bottom: 20px;
  color: #303133;
}

.recommend-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.problem-card {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-content {
  display: flex;
  flex-direction: column;
  height: 150px;
}

.description {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  color: #606266;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.problem-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.problem-link {
  color: #409eff;
  text-decoration: none;
}

.problem-link:hover {
  color: #66b1ff;
  text-decoration: underline;
}

.hot-problem-card {
  margin-bottom: 10px;
}

.hot-problem-title {
  margin-bottom: 8px;
}

.hot-problem-title a {
  color: #303133;
  text-decoration: none;
}

.hot-problem-title a:hover {
  color: #409eff;
}

.hot-problem-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.submission-count {
  font-size: 12px;
  color: #909399;
}
</style>
