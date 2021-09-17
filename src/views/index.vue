<template>
  <div class='main-container'>
    <div class='left'>
      <div class='jf-container'>
        <Form @changeData='handleChange'></Form>
        <div class='jf-form-wrap'>
          <ShowJson :jsonData='showJson'/>
        </div>
      </div>

    </div>
    <div class='right'>
      <Echarts :option='titleOption'/>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import Echarts from '@/components/Echarts.vue'
import Form from '../components/JsonForm/index.vue'
import ShowJson from '../components/showJson/index.vue'
import { getGlobal } from '../../data/originData/index'

export default defineComponent({
  name: 'mianIndex',
  components: { Echarts, Form, ShowJson },
  setup() {
    const titleOption = ref<any>({})
    const showJson = ref<any>(null)

    const handleChange = (option: any) => {
      titleOption.value = option
      showJson.value = JSON.stringify(option, null, 2)
    }

    onMounted(async() => {
      const res = await getGlobal()
      console.log(res)

      console.log(res.angleAxis)
    })

    return {
      titleOption,
      showJson,
      handleChange
    }
  }
})

</script>

<style lang='less' scoped>
.main-container {
  width: 100vw;
  height: 100vh;
  background: #ececec;

  display: flex;
  align-items: center;
  justify-content: center;

  .left {
    width: 50%;
    height: calc(100% - 40px);
    background: #fff;
    margin: 20px;
  }

  .right {
    margin: 20px;
    width: 50%;
    height: calc(100% - 40px);
    margin-left: 20px;
    background: #fff;
  }
}
</style>

<style lang='less'>
@import "../components/JsonForm/style";
</style>
