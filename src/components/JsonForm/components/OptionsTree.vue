<template>
  <div class='js-options-tree'>
    <a-tree
      v-model:selectedKeys='selectedKeys'
      :tree-data="treeData"
    >
      <template #title="data">
        <div>
<!--          <RenderFormItem :data='data.dataRef'/>-->
          <a-popover :title="data.title" trigger="hover">
            <template #content>
              <p>{{ data.title }}</p>
              <p v-html='data.desc'></p>
            </template>
            <RenderFormItem :data='data.dataRef'/>
          </a-popover>
        </div>
      </template>
    </a-tree>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, inject } from 'vue'
import JsonFormDataModel from '../utils/data'
import RenderFormItem from './RenderFormItem'

export default defineComponent({
  name: 'Home',
  components: { RenderFormItem },
  setup() {
    const jsonFormDataModel = inject('jsonFormDataModel') as JsonFormDataModel

    return {
      treeData: jsonFormDataModel.formData,
      selectedKeys: jsonFormDataModel.selectedKeys
    }
  }
})
</script>
