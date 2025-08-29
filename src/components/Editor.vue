<template>
  <div ref="editorRef" class="cm-container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { EditorState, Compartment } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { basicSetup } from 'codemirror'
import { autocompletion, snippetCompletion, completeFromList } from '@codemirror/autocomplete'

/* --- 语言包 --- */
import { javascript, javascriptLanguage } from '@codemirror/lang-javascript'
import { python, pythonLanguage } from '@codemirror/lang-python'
import { cpp, cppLanguage } from '@codemirror/lang-cpp'
import { java, javaLanguage } from '@codemirror/lang-java'

const keywords = {
  java: ['abstract', 'assert', 'break', 'case', 'catch', 'class', 'const', 'continue', 'default', 'do', 'else', 'enum', 'extends', 'final', 'finally', 'for', 'if', 'implements', 'import', 'instanceof', 'interface', 'native', 'new', 'package', 'private', 'protected', 'public', 'return', 'static', 'strictfp', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient', 'try', 'void', 'volatile', 'while', 'int', 'long', 'float', 'double', 'char', 'boolean', 'byte', 'short'],
  c: ['auto', 'break', 'case', 'char', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum', 'extern', 'float', 'for', 'goto', 'if', 'int', 'long', 'register', 'return', 'short', 'signed', 'sizeof', 'static', 'struct', 'switch', 'typedef', 'union', 'unsigned', 'void', 'volatile', 'while']
}

/* props & emit ,对外暴露 代码内容和语言类型*/
const props = defineProps({
  code: { type: String, default: '' },
  language: { type: String, default: 'javascript' }
})
const emit = defineEmits(['update:code', 'update:language'])

/* 语言映射 */
const langMap = {
  javascript,
  python,
  java,
  go: () => cpp(),          // 无官方 Go 包，用 C++ 近似
  rust: () => cpp(),
  c: () => cpp(),
  'c++': () => cpp(),
  csharp: () => cpp(),
}

/* 代码片段 */
const commonSnippets = [
  snippetCompletion('console.log(${})', { label: 'log', detail: 'console.log()' }),
  snippetCompletion('if (${}) {\n\t\n}', { label: 'if', detail: 'if block' }),
  snippetCompletion('for (const ${key} of ${iter}) {\n\t\n}', { label: 'forof', detail: 'for…of' }),
  snippetCompletion('function ${name}(${params}) {\n\t\n}', { label: 'func', detail: 'function' })
]

/* 语言->补全源映射 */
const completionMap = {
  javascript: () => javascriptLanguage.data.of({ autocomplete: commonSnippets }),
  python: () => pythonLanguage.data.of({ autocomplete: commonSnippets }),
  java: () => [javaLanguage.data.of({ autocomplete: commonSnippets }), completeFromList(keywords.java)],
  c: () => [cppLanguage.data.of({ autocomplete: commonSnippets }), completeFromList(keywords.c)],
  'c++': () => [cppLanguage.data.of({ autocomplete: commonSnippets }), completeFromList(keywords.c)],
  csharp: () => cppLanguage.data.of({ autocomplete: commonSnippets }),
  go: () => cppLanguage.data.of({ autocomplete: commonSnippets }),
  rust: () => cppLanguage.data.of({ autocomplete: commonSnippets })
}

/* 创建编辑器 */
const editorRef = ref(null)
let view = null
const langCompartment = new Compartment()

const getLangExtension = lang => langMap[lang]?.() || javascript()

const customTheme = EditorView.theme({
  '&': {
    backgroundColor: '#fafafa',
    fontSize: '14px'
  },
  '.cm-scroller': {
    overflow: 'auto',
    height: 'calc(30 * 1.5em)'   /* 30 行 */
  },
  '.cm-gutters': {
    backgroundColor: '#f2f2f2',
    borderRight: '1px solid #ddd',
    minWidth: '50px'
  }
})

function initEditor() {
  const state = EditorState.create({
    doc: props.code,
    extensions: [
      basicSetup,
      langCompartment.of(getLangExtension(props.language)),
      customTheme,
      autocompletion(),
      EditorView.updateListener.of(v => {
        if (v.docChanged) emit('update:code', v.state.doc.toString())
      })
    ]
  })
  view = new EditorView({ state, parent: editorRef.value })
}

onMounted(initEditor)
onUnmounted(() => view?.destroy())

/* 监听外部更新 */
watch(() => props.code, val => {
  if (!view || val === view.state.doc.toString()) return
  view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: val } })
})

watch(() => props.language, lang => {
  if (!view) return
  view.dispatch({ effects: langCompartment.reconfigure(getLangExtension(lang)) })
})
</script>

<style scoped>
.cm-container {
  width: 100%;
  border: 1px solid #ddd;
  height: 450px;
  /* 30 * 1.5em ≈ 450 */
}
</style>