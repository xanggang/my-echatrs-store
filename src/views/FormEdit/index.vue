<template>
  <div class="container">
    <div class="left">
      <div class="card"
           v-for="(item, index) in modelList"
           :key="index"
           @click="handleSelect(item)"
      >{{item.title}} </div>
    </div>
    <Form :config="config"></Form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import formatModelData, { IModel } from '../../util/formatModelData'
import { getGlobal, getModelData } from '../../../data/originData'
import Form from '@/components/JsonForm/index.vue'
export default defineComponent({
  name: 'EditEcharts',
  components: { Form },
  setup() {
    const modelList = ref<IModel[]>([])
    const config = ref<any>({})

    onMounted(async() => {
      const res = await getGlobal()
      console.log(res)
      modelList.value = formatModelData(res)
    })

    const handleSelect = async ({ title }) => {
      const res = await getModelData(title)
      config.value = res
    }

    return {
      config,
      modelList,
      handleSelect
    }
  }
})
</script>

<style lang='less' scoped>

.container {
  display: flex;

  .left {
    width: 400px;
    height: 100vh;

    .card {
      padding: 10px;
      cursor: pointer;
    }
  }
}
</style>
