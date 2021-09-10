<template>
  <div class='main-container'>
    <div class='left'>
      <Form></Form>
    </div>
    <div class='right'>
      <Echarts title='121212'/>
    </div>
  </div>
</template>
<script setup lang="ts">
// import Echarts from '../components/Echarts.vue'
import Echarts from '@/components/Echarts.vue'

import Form from '../components/JsonForm/index.vue'
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
