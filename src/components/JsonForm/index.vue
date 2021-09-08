<template>
  <div class='container'>
    <Test></Test>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import JSON from '../../../data/dist/mock.json'
import Test from './ttt.tsx'

export default defineComponent({
  name: 'Home',
  components: { Test },
  data () {
    return {
      JSON,
    }
  },
})
</script>

<style lang='less' scoped>

</style>
