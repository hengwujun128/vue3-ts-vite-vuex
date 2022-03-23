<template>
  <div>

  </div>
</template>

<script lang="ts">
import {defineComponent, h, ref,reactive } from 'vue'
import {ItemData} from '@/types/ItemData'



export default defineComponent({
  name: 'List',
  props:{
    todoList: {
      type: Array as ()=> ItemData[],
      required: true
    }
  },
  setup(props, {slots, attrs,emit,expose}) {
    return ()=>{
      return h('div',)
    }
  },
})

</script>

<style scoped>

</style>