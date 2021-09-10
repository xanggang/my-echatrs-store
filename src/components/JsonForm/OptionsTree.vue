<template>
  <div class='js-options-tree'>
    <a-tree
      v-model:selectedKeys='selectedKeys'
      :tree-data="treeData"
    >
    </a-tree>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, inject } from 'vue'

export default defineComponent({
  name: 'Home',
  props: {
    // treeData: {
    //   type: Array,
    //   default: () => []
    // }
  },
  setup() {
    const jsonFormDataModel = inject('jsonFormDataModel')

    return {
      treeData: jsonFormDataModel.formData,
      selectedKeys: jsonFormDataModel.selectedKeys
    }
  }
})
</script>
