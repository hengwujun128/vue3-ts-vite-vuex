
<script lang="ts">
import { h,defineComponent } from 'vue'

import {ItemData} from '@/types/ItemData'

export default defineComponent({
  name: 'MyItem',
  props: {
    todoItem: {
      // 约束类型，使用as强转类型
      type: Object as ()=> ItemData,
      required: true,
    },
    index: {
      type: Number
    }
  },
  setup(props, {slots, attrs,emit, expose}) {
    // const itemValue:ItemData = {
    //   id: 0,
    //   title: '',
    //   isCompleted: false,
    // }
    const rootTag = 'div'
    return ()=>{
      return h(rootTag,{
        class: 'todoItem',
        ref: 'myItem',
        on :{

        }
      },[
        slots.before ? slots.before(props.todoItem):null,
        slots.default?.(props.todoItem),
        slots.after ? slots.after(props.todoItem):null
      ])
    }
  }
})
</script>

<style scoped>

</style>