<template>
  <div class="todoItem">
    <input type="checkbox" class="checkbox" v-model="isCompleted" />
    <span class="title"> {{ todoItem.title }}</span>
    <button class="delButton" @click="del(index)">删除</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref,computed, inject } from 'vue'
import {ItemData} from '@/types/ItemData'

export default defineComponent({
  name: 'TodoItem',
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
  setup (props) {
    // use inject to get parent method
    const delTodo: Function | undefined = inject('delPlan')
    // custom method
    const del  = (index: Number) => {
      if (window.confirm('确认删除吗?')) {
        if (typeof delTodo === 'function') {
          delTodo(index)
        }
      }
    }
    // use inject to get parent method
    const updateState: Function | undefined = inject('updateState')
    // computed props: computed 属性也可以实现双向数据绑定
    const isCompleted = computed({
      get() {
        return props.todoItem.isCompleted
      },
      set(v) {
        if (typeof updateState === 'function') {
          updateState(props.todoItem,v)
        }
      }
    })
    return {
      del,
      isCompleted
    }
  }
})
</script>

<style scoped>
.todoItem {
  display: flex;
  margin: 3px 0;
  border-bottom: 1px solid #ccc;
  align-items: center;
}
.checkbox {
  width: 13px;
  margin-right: 10px
}
.title {
  flex: 1
}
.delButton {
  width: 45px;
}
</style>