<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <img style="width: 100px" src="@/assets/logo.svg" alt="logo" />
    <el-menu-item index="1">
      <el-button>欢迎</el-button>
    </el-menu-item>
    <el-menu-item index="2">
      <el-button>主页</el-button>
    </el-menu-item>
    <el-menu-item index="3">
      <el-button>判题</el-button>
    </el-menu-item>
    <el-menu index="4" class="user-menu">
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
    </el-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { UserFilled } from "@element-plus/icons-vue";
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

const props = defineProps({
  index: String
});
const activeIndex = ref(props.index);
const router = useRouter();

// 监听 props.index 的变化
watch(
  () => props.index,
  (newIndex) => {
    activeIndex.value = newIndex;
  }
);

const handleSelect = (key: string, keyPath: string[]) => {
  console.log("Selected key:", key);
  console.log("Key path:", keyPath);
  // 根据 key 值进行路由跳转
  switch (key) {
    case "1":
      router.push("/");
      break;
    case "2":
      router.push("/home");
      break;
    case "3":
      router.push("/game");
      break;
    // 可以根据需要添加更多 case
    default:
      // 默认行为
      break;
  }
};
</script>

<style scoped>
.user-menu {
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
}
</style>
