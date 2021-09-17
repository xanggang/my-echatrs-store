import CodeMirror from './import'
import { Editor as CodeEditorType } from 'codemirror'
import { onMounted, ref, Ref } from 'vue'

interface IUseJsonEditorType {
  jsonEditor: CodeEditorType | null;
  foldJson(): void;
  setJson(value: string): void;
}

export default function(id: string): IUseJsonEditorType {
  let jsonEditor!: CodeEditorType

  onMounted(() => {
    const dom = document.getElementById(id) as HTMLTextAreaElement
    jsonEditor = CodeMirror.fromTextArea(dom, {
      value: '',
      mode: 'application/json',
      theme: 'eclipse',
      tabSize: 2,
      smartIndent: true, // 是否智能缩进
      // keyMap: 'vim',
      lineWrapping: true,
      foldGutter: true,
      lineNumbers: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
      matchBrackets: true
    })
  })

  const getValue = () => {
    return jsonEditor.getValue()
  }

  const foldJson = () => {
    const valueString = getValue()
    const dataString = JSON.stringify(valueString, null, 2)
    jsonEditor.setValue(dataString)
  }

  const setJson = (value: string) => {
    jsonEditor.setValue(value)
  }

  return {
    jsonEditor,
    foldJson,
    setJson
  }
}
