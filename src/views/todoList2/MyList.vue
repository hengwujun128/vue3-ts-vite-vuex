
<script lang="ts">

import { defineComponent, h } from 'vue'
import {ItemData} from '@/types/ItemData'

import MyItem from './MyItem.vue';

export default defineComponent({
  name: 'List',
  // components :{
  //   MyItem
  // },
  props: {
    todoList: {
      // 为什么要用as？ 约束类型，使用as强转类型
      type: Array as () => ItemData[],
      // type: Array,
      required: true
    }
  },
  setup ({todoList},{slots}) {
    

    return ()=>{
      const itemComp =  todoList.map((item, index)=>{
        return h(MyItem, {
          key: item,
          props: {
            todoItem: item,
            index: index
          }
        },)
      })
      return h('div',{}, [slots.title?.(), ...itemComp])
    }
  }
})
</script>

<style scoped>

</style>