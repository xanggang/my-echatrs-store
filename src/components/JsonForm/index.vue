<template>
  <div class='jf-container'>
    <OptionsTree />
    <FormContent :data="JSON" v-model='form'></FormContent>
  </div>
</template>

<script lang='ts'>
import { defineComponent, provide } from 'vue'
import JSON from '../../../data/dist/formMock.json'
import FormContent from './Form.tsx'
import OptionsTree from './OptionsTree.vue'

import JsonFormDataModel from './data'

export default defineComponent({
  name: 'JsonForm',
  components: { FormContent, OptionsTree },
  setup() {
    const jsonFormDataModel = new JsonFormDataModel({
      formData: JSON
    })
    provide('jsonFormDataModel', jsonFormDataModel)

    return {
      JSON: jsonFormDataModel.formData,
      form: jsonFormDataModel.form
    }
  }
})
</script>

<style lang='less'>
@import "./style";
</style>
