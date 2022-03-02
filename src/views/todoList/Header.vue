<template>
  <div class="header">
    <input type="text" class="input" v-model="oneThing" @keyup.enter="addThing" placeholder="输入一条代办事项，按enter建添加">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {ItemData} from '@/types/ItemData'

export default defineComponent({
  name: 'Header',
  props:{
    addPlan: {
      type: Function,
      required: true
    }
  },
  setup (props) {
    const oneThing = ref('')
    // add one thing
    const addThing = ()=>{
      const thing: string = oneThing.value
      if (!thing.trim()) {
        return
      }
      const todo:ItemData = {
        id: Date.now(),
        title: thing.trim(),
        isCompleted: false
      }
      // 把数据传递给父组件，这里用的是回调
      props.addPlan(todo)
      oneThing.value = ''
    }
    return {
      oneThing,
      addThing
    }
  }
})
</script>

<style scoped>
  .header {
    margin:20px 0;
    padding-right: 10px;
  }
  .input {
    width: 100%;
    height: 28px;
    line-height: 28px;
    font-size: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding-left: 10px;
  }
</style>