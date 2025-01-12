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
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/javascript-hint.js";
import Codemirror from "codemirror-editor-vue3";

export default {
  components: { Codemirror },
  setup() {
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

    const onChange = (val, cm) => {
      console.log("编辑器内容改变:", val);
      console.log("编辑器当前值:", cm.getValue());
    };

    const onInput = (val) => {
      console.log("输入内容:", val);
    };

    const onReady = (cm) => {
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

    return {
      code,
      cmRef,
      cmOptions,
      onChange,
      onInput,
      onReady,
    };
  },
};
</script>

<style>
/* 可以在这里添加组件的样式 */
.Codemirror {
  border: 1px solid #ccc;
  height: 400px;
  width: 100%;
}
</style>
