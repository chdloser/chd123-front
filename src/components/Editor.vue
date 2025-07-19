<template>
  <div ref="editorRef" class="editor-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { EditorView } from "@codemirror/view";
import {basicSetup} from "@codemirror/basic-setup"

import { javascript } from "@codemirror/lang-javascript";
import { EditorState } from "@codemirror/state";
const editorRef = ref(null);
let editorView = null;
const initEditor = () => {
  if(typeof editorView.value != "undefined"){
    editorView.value.destroy();
  }
  const jsonString = `{
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
    "vue-global-api"
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    endOfLine: "auto",
    "prettier/prettier": ["error", { "endOfLine": "auto" }]
  },
}`
  const startState = EditorState.create({
    doc:jsonString,
    extensions:[basicSetup,javascript(),josn()],
  });
  if(editorRef.value){
    editorView.value = new EditorView({
      state:startState,
      parent:editorRef.value,
    });
  }
}


onMounted(() => {
  initEditor();
});

// onUnmounted(() => {
//   if (editorView) {
//     editorView.destroy();
//   }
// });
</script>

<style scoped>
.editor-container {
  height: 400px;
  width: 100%;
}
</style>