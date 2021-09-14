<template>
  <div class='jf-container'>
    <OptionsTree />
    <div class='jf-form-wrap'>
      {{  form }}
    </div>

  </div>
</template>

<script lang='ts'>
import { defineComponent, provide, watch, isRef } from 'vue'
import OptionsTree from './components/OptionsTree.vue'

import JsonFormDataModel from './utils/data'

export default defineComponent({
  name: 'JsonForm',
  components: { OptionsTree },
  setup(props, { emit }) {
    const jsonFormDataModel = new JsonFormDataModel()
    provide('jsonFormDataModel', jsonFormDataModel)

    watch(jsonFormDataModel.form, () => {
      emit('changeData', jsonFormDataModel.form)
    }, {
      deep: true
    })
    return {
      JSONData: jsonFormDataModel.formData || [],
      form: jsonFormDataModel.form
    }
  }
})
</script>

<style lang='less'>
@import "./style";
</style>
