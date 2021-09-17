<template>
  <OptionsTree />
</template>

<script lang='ts'>
import { defineComponent, provide, watch, isRef, computed } from 'vue'
import OptionsTree from './components/OptionsTree.vue'

import JsonFormDataModel from './utils/data'

export default defineComponent({
  name: 'JsonForm',
  components: { OptionsTree },
  setup(props, { emit }) {
    const jsonFormDataModel = new JsonFormDataModel()
    provide('jsonFormDataModel', jsonFormDataModel)

    watch(jsonFormDataModel.form, () => {
      emit('changeData', jsonFormDataModel.form.value)
    }, {
      deep: true
    })

    const showJson = computed(() => {
      return JSON.stringify(jsonFormDataModel.form.value, null, 4)
    })

    return {
      JSONData: jsonFormDataModel.formData || [],
      form: showJson
    }
  }
})
</script>

<style lang='less'>

</style>
