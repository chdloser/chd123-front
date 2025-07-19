declare module 'codemirror-editor-vue3' {
  import { DefineComponent } from 'vue'
  export const Codemirror: DefineComponent<{
    modelValue?: string
    options?: any
    height?: number | string
    border?: boolean
    extensions?: any[]
    onChange?: (value: string, changeObj?: any) => void
    onReady?: (editor: any) => void
  }>
}

declare module '@codemirror/lang-javascript' {
  export function javascript(): any
}

declare module '@codemirror/lang-python' {
  export function python(): any
}

declare module '@codemirror/lang-cpp' {
  export function cpp(): any
}

declare module '@codemirror/theme-one-dark' {
  export const oneDark: any
} 