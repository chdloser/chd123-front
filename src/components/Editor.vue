<template>
  <Codemirror
    v-model:value="code"
    :options="cmOptions"
    border
    ref="cmRef"
    @change="onChange"
    @input="onInput"
    @ready="onReady"
  />
  <button>提交</button>
  <button>运行</button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Codemirror from "codemirror-editor-vue3";
// 引入css文件
import "codemirror/lib/codemirror.css";
// placeholder
import "codemirror/addon/display/placeholder.js";

// 引入语言模式 可以从 codemirror/mode/ 下引入多个
import "codemirror/mode/javascript/javascript.js";
// import "codemirror/mode/go/go.js";
// placeholder
import "codemirror/addon/display/placeholder.js";
// 引入主题 可以从 codemirror/theme/ 下引入多个
import "codemirror/theme/idea.css";


const code = ref(
  `var i = 0;
  for (; i < 9; i++) {
      console.log(i);
      // more statements
  }
  `
);
const cmRef = ref();
const cmOptions = {
  mode: "text/javascript",
  theme: "default", // 可以选择其他主题，如 'dracula'
  lineNumbers: true, // 显示行号
  lineWrapping: true, // 软换行
  tabSize: 4, // tab 宽度
  extraKeys: { "Ctrl-Space": "autocomplete" }, // 启用代码补全
  hintOptions: {
    completeSingle: false, // 当匹配只有一项的时候，是否自动补全
  },
};

const onChange = () => {
  console.log("编辑器内容改变:");
  console.log("编辑器当前值:");
};

const onInput = () => {
  console.log("输入内容:");
};

const onReady = () => {
  console.log("编辑器准备就绪");
  cm.focus(); // 聚焦编辑器
};

onMounted(() => {
  setTimeout(() => {
    cmRef.value?.refresh();
  }, 1000);
  setTimeout(() => {
    cmRef.value?.cminstance.isClean();
  }, 3000);
});

onUnmounted(() => {
  cmRef.value?.destroy();
});
</script>

<style scoped>
/* 可以在这里添加组件的样式 */
.Codemirror {
  border: 1px solid #ccc;
  height: 400px;
  width: 100%;
}
</style>
