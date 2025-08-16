<template>
  <div class="code-section">
    <div class="code-header">
      <el-select
        v-model="selectedLanguage"
        placeholder="选择编程语言"
        @change="handleLanguageChange"
      >
        <el-option
          v-for="lang in languages"
          :key="lang.value"
          :label="lang.label"
          :value="lang.value"
        />
      </el-select>
      <el-button type="primary" @click="handleSubmit" :loading="submitting">
        提交代码
      </el-button>
    </div>

    <div class="editor-container" ref="editorContainer"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { EditorState, StateEffect } from "@codemirror/state";
import type { Extension } from "@codemirror/state";
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLineGutter,
  highlightSpecialChars,
} from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { materialDark } from "cm6-theme-material-dark";
import {
  autocompletion,
  completionKeymap,
  closeBrackets,
  closeBracketsKeymap,
  CompletionContext,
} from "@codemirror/autocomplete";
import {
  indentUnit,
  syntaxHighlighting,
  defaultHighlightStyle,
  bracketMatching,
  foldGutter,
  foldKeymap,
  indentOnInput,
  type LanguageSupport,
} from "@codemirror/language";
import { lintKeymap } from "@codemirror/lint";
import { searchKeymap } from "@codemirror/search";
import { history, historyKeymap } from "@codemirror/commands";

interface Language {
  label: string;
  value: "javascript" | "python" | "cpp";
}

const props = defineProps<{
  initialCode?: string;
}>();

const emit = defineEmits<{
  (e: "submit", code: string, language: string): void;
  (e: "code-change", code: string): void;
}>();

// 编程语言选项
const languages: Language[] = [
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "C++", value: "cpp" },
  { label: "Java", value: "java" },
];

// 当前选中的语言
const selectedLanguage = ref<Language["value"]>("javascript");

// 编辑器相关
const editorContainer = ref<HTMLElement | null>(null);
const editorView = ref<EditorView | null>(null);
const submitting = ref(false);

// 默认代码模板
const codeTemplates: Record<Language["value"], string> = {
  javascript: `function solution(input) {
  // 在这里写下你的代码
  return
}`,
  python: `def solution(input):
    # 在这里写下你的代码
    return`,
  cpp: `#include <iostream>
using namespace std;

int solution(int input) {
    // 在这里写下你的代码
    return 0;
}`,
};

// 字体大小控制
const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 24;
const DEFAULT_FONT_SIZE = 14;
const fontSize = ref(DEFAULT_FONT_SIZE);

// 创建字体大小主题扩展
const getFontSizeTheme = (size: number) =>
  EditorView.theme({
    "&": {
      fontSize: `${size}px`,
    },
  });

// 字体缩放处理函数
const handleWheel = (event: WheelEvent) => {
  if ((event.ctrlKey || event.metaKey) && editorView.value) {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -1 : 1;
    const newSize = Math.min(
      MAX_FONT_SIZE,
      Math.max(MIN_FONT_SIZE, fontSize.value + delta)
    );

    if (newSize !== fontSize.value) {
      fontSize.value = newSize;
      const fontSizeTheme = EditorView.theme({
        ".cm-content": {
          fontSize: `${newSize}px`,
        },
      });
      editorView.value.dispatch({
        effects: StateEffect.reconfigure.of(fontSizeTheme),
      });
    }
  }
};

// 基础扩展配置
const baseExtensions: Extension[] = [
  lineNumbers(),
  highlightActiveLineGutter(),
  highlightSpecialChars(),
  history(),
  foldGutter({
    openText: "▾",
    closedText: "▸",
  }),
  materialDark,
  EditorView.theme({
    "&": {
      backgroundColor: "#282c34 !important",
      height: "100%",
    },
    ".cm-content": {
      color: "#abb2bf !important",
      caretColor: "#528bff",
    },
    ".cm-gutters": {
      backgroundColor: "#21252b !important",
      color: "#495162",
      border: "none",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "#2c313c !important",
    },
    ".cm-activeLine": {
      backgroundColor: "#2c313c !important",
    },
    ".cm-selectionMatch": {
      backgroundColor: "#3E4451",
    },
    ".cm-cursor": {
      borderLeftColor: "#528bff",
    },
    ".cm-line": {
      padding: "0 4px",
    },
    "&.cm-focused .cm-cursor": {
      borderLeftColor: "#528bff",
    },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
      {
        backgroundColor: "#3E4451",
      },
    ".cm-keyword": { color: "#c678dd" },
    ".cm-operator": { color: "#56b6c2" },
    ".cm-variable-2": { color: "#e06c75" },
    ".cm-variable": { color: "#d19a66" },
    ".cm-property": { color: "#61afef" },
    ".cm-comment": { color: "#5c6370", fontStyle: "italic" },
    ".cm-string": { color: "#98c379" },
    ".cm-number": { color: "#d19a66" },
    ".cm-atom": { color: "#d19a66" },
    ".cm-def": { color: "#61afef" },
    ".cm-punctuation": { color: "#abb2bf" },
    ".cm-meta": { color: "#abb2bf" },
    ".cm-builtin": { color: "#e5c07b" },
    ".cm-tag": { color: "#e06c75" },
    ".cm-attribute": { color: "#d19a66" },
    ".cm-bracket": { color: "#abb2bf" },
  }),
  indentOnInput(),
  bracketMatching(),
  closeBrackets(),
  autocompletion({
    activateOnTyping: true,
    maxRenderedOptions: 100,
    defaultKeymap: true,
    icons: true,
  }),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  indentUnit.of("    "),
  EditorState.tabSize.of(4),
  EditorView.lineWrapping,
  getFontSizeTheme(fontSize.value),
  keymap.of([
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...closeBracketsKeymap,
    ...lintKeymap,
    indentWithTab,
  ]),
  EditorView.updateListener.of((update) => {
    if (update.docChanged) {
      emit("code-change", update.state.doc.toString());
    }
  }),
];

// 获取当前语言的扩展
const getLanguageExtension = (lang: Language["value"]): Extension => {
  const langSupport = (() => {
    switch (lang) {
      case "javascript":
        return javascript();
      case "python":
        return python();
      case "cpp":
        return cpp();
      default:
        return javascript();
    }
  })();

  return [
    langSupport,
    autocompletion({
      override: [
        langSupport.language.data.of({
          autocomplete: async (context: CompletionContext) => {
            const word = context.matchBefore(/\w*/);
            if (!word) return null;

            // 这里可以添加自定义的补全项
            const customCompletions =
              {
                javascript: [
                  "console.log",
                  "function",
                  "return",
                  "const",
                  "let",
                  "var",
                  "if",
                  "else",
                  "for",
                  "while",
                  "do",
                  "switch",
                  "case",
                  "try",
                  "catch",
                  "finally",
                  "throw",
                  "class",
                  "extends",
                  "new",
                  "this",
                  "super",
                  "import",
                  "export",
                  "default",
                  "null",
                  "undefined",
                  "true",
                  "false",
                ],
                python: [
                  "def",
                  "class",
                  "if",
                  "else",
                  "elif",
                  "for",
                  "while",
                  "try",
                  "except",
                  "finally",
                  "with",
                  "as",
                  "import",
                  "from",
                  "return",
                  "yield",
                  "break",
                  "continue",
                  "pass",
                  "raise",
                  "True",
                  "False",
                  "None",
                  "and",
                  "or",
                  "not",
                  "is",
                  "in",
                  "lambda",
                  "nonlocal",
                  "global",
                ],
                cpp: [
                  "include",
                  "using",
                  "namespace",
                  "std",
                  "cout",
                  "cin",
                  "endl",
                  "return",
                  "if",
                  "else",
                  "for",
                  "while",
                  "do",
                  "switch",
                  "case",
                  "break",
                  "continue",
                  "class",
                  "struct",
                  "public",
                  "private",
                  "protected",
                  "virtual",
                  "override",
                  "template",
                  "typename",
                  "const",
                  "static",
                  "void",
                  "int",
                  "float",
                  "double",
                  "char",
                  "bool",
                  "string",
                  "vector",
                  "map",
                  "set",
                  "auto",
                  "nullptr",
                  "true",
                  "false",
                ],
              }[lang] || [];

            return {
              from: word.from,
              options: customCompletions
                .filter((opt) =>
                  opt.toLowerCase().startsWith(word.text.toLowerCase())
                )
                .map((opt) => ({ label: opt, type: "keyword" })),
            };
          },
        }),
      ],
    }),
  ];
};

// 创建编辑器
const createEditor = (container: HTMLElement, initialCode: string) => {
  const state = EditorState.create({
    doc: initialCode,
    extensions: [
      ...baseExtensions,
      getLanguageExtension(selectedLanguage.value),
    ],
  });

  const view = new EditorView({
    state,
    parent: container,
  });

  // 添加滚轮事件监听
  container.addEventListener("wheel", handleWheel, { passive: false });

  return view;
};

// 处理语言切换
const handleLanguageChange = (lang: Language["value"]) => {
  if (!editorView.value) return;
  selectedLanguage.value = lang;

  const extensions = [
    ...baseExtensions,
    materialDark,
    syntaxHighlighting(defaultHighlightStyle),
    (() => {
      switch (lang) {
        case "javascript":
          return javascript();
        case "python":
          return python();
        case "cpp":
          return cpp();
        default:
          return javascript();
      }
    })(),
  ];

  const newState = EditorState.create({
    doc: codeTemplates[lang],
    extensions,
  });

  editorView.value.setState(newState);
  emit("code-change", codeTemplates[lang]);
};

// 提交代码
const handleSubmit = async () => {
  if (!editorView.value) return;

  submitting.value = true;
  try {
    emit(
      "submit",
      editorView.value.state.doc.toString(),
      selectedLanguage.value
    );
  } finally {
    submitting.value = false;
  }
};

// 组件挂载时创建编辑器
onMounted(() => {
  if (editorContainer.value) {
    const initialCode =
      props.initialCode || codeTemplates[selectedLanguage.value];
    editorView.value = createEditor(editorContainer.value, initialCode);
  }
});

// 组件卸载时清理
onBeforeUnmount(() => {
  if (editorContainer.value) {
    editorContainer.value.removeEventListener("wheel", handleWheel);
  }
  editorView.value?.destroy();
});

// 监听 initialCode 变化
watch(
  () => props.initialCode,
  (newCode) => {
    if (newCode && editorView.value) {
      const transaction = editorView.value.state.update({
        changes: {
          from: 0,
          to: editorView.value.state.doc.length,
          insert: newCode,
        },
      });
      editorView.value.dispatch(transaction);
    }
  }
);
</script>

<style scoped>
.code-section {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
  background: #282c34;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.code-header {
  padding: 12px 20px;
  border-bottom: 1px solid #3e4451;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #21252b;
}

.editor-container {
  flex: 1;
  overflow: hidden;
}

:deep(.el-select) {
  width: 120px;
}

:deep(.el-select .el-input__wrapper) {
  background-color: #2c313a;
  box-shadow: none;
  border: 1px solid #3e4451;
}

:deep(.el-select .el-input__inner) {
  color: #abb2bf;
}

:deep(.el-button) {
  background-color: #2c313a;
  border-color: #3e4451;
  color: #abb2bf;
}

:deep(.el-button:hover) {
  background-color: #353b45;
  border-color: #528bff;
  color: #ffffff;
}

:deep(.el-button.is-loading) {
  background-color: #353b45;
  border-color: #3e4451;
  color: #abb2bf;
}

/* CodeMirror 6 样式覆盖 */
:deep(.cm-editor) {
  height: 100%;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  font-size: 14px;
}

:deep(.cm-scroller) {
  height: 100% !important;
  overflow-y: auto;
}

:deep(.cm-gutters) {
  background-color: #21252b !important;
  border-right: 1px solid #3e4451 !important;
}

:deep(.cm-activeLineGutter) {
  background-color: #2c313a !important;
}

:deep(.cm-activeLine) {
  background-color: #2c313a !important;
}

:deep(.cm-selectionMatch) {
  background-color: rgba(82, 139, 255, 0.3) !important;
}

:deep(.cm-matchingBracket) {
  background-color: rgba(82, 139, 255, 0.3) !important;
  border: 1px solid #528bff !important;
}

:deep(.cm-content) {
  color: #abb2bf !important;
}

:deep(.cm-line) {
  padding: 0 4px;
}

:deep(.cm-cursor) {
  border-left: 2px solid #528bff !important;
}

:deep(.cm-tooltip) {
  background-color: #2c313a !important;
  border: 1px solid #3e4451 !important;
  color: #abb2bf !important;
}

:deep(.cm-tooltip.cm-tooltip-autocomplete > ul > li[aria-selected]) {
  background-color: #353b45 !important;
}
</style>
