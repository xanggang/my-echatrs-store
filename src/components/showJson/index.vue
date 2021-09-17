<template>
  <div class='show-json-container'>
    <div class="editor-item">
      <textarea name="" id="JSON-EDITOR" style="width: 100%;height: 100%;" cols="200" rows="500"></textarea>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, watch } from 'vue'
import UseJsonEditor from './useShowJsonCode'

export default defineComponent({
  name: 'Home',
  props: {
    jsonData: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const {
      jsonEditor,
      setJson,
    } = UseJsonEditor('JSON-EDITOR')

    watch(() => props.jsonData,
      () => {
        setJson(props.jsonData)
      })
  }
})
</script>
