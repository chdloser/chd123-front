<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0">
      <img style="width: 100px" src="@/assets/logo.svg" alt="Element logo" />
    </el-menu-item>
    <el-menu-item index="1">Processing Center</el-menu-item>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="3">
      <router-link to="/">welcome</router-link>
    </el-menu-item>
    <el-menu-item index="4">
      <router-link to="/home">home</router-link>
    </el-menu-item>
    <el-menu-item index="5">
      <router-link to="/game">game</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  index: String
});
const activeIndex = ref(props.index);
const router = useRouter();

// 监听 props.index 的变化
watch(() => props.index, (newIndex) => {
  activeIndex.value = newIndex;
});

const handleSelect = (key: string, keyPath: string[]) => {
  console.log('Selected key:', key);
  console.log('Key path:', keyPath);
  // 根据 key 值进行路由跳转
  switch(key) {
    case '0':
      // 例如，这里不进行路由跳转，因为是 logo
      break;
    case '1':
      break;
    case '2':
      // 对于子菜单，可能不需要在这里处理跳转
      break;
    case '3':
      router.push('/');
      break;
    case '4':
      router.push('/home');
      break;
    case '5':
      router.push('/game');
      break;
    // 可以根据需要添加更多 case
    default:
      // 默认行为
      break;
  }
};
</script>