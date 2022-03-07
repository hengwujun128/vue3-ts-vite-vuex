<template>
  <div class="todoList">
    <Header :addPlan="addPlan"></Header>
    <List :todo-list="todoList"></List>
    <Footer :todoList="todoList" :isCompletedAll="isCompletedAll" :clearCompleted="clearCompleted
    "></Footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, watch,provide } from 'vue'
import {ItemData} from '@/types/ItemData'

import Header from './Header.vue';
import List from './List.vue';
import Footer from './Footer.vue'

import { saveTodo, readTodo } from "@/utils/localStorageUtils";

export default defineComponent({
  name: 'TodoList',
  components: {
    Header,
    List,
    Footer
  },
  setup () {
      // const todosList: ItemData[] = [
    //   { id: 1, title: "张三", isCompleted: false },
    //   { id: 2, title: "李四", isCompleted: false },
    //   { id: 3, title: "瑞斯", isCompleted: false }
    // ];
    // 这里是一个用state={todosList: Array<ItemData>/ItemData[]} 解构,后面具体内容按照解构的类型

    const state = reactive<{todoList: Array<ItemData>}>({
      todoList: []
      // todoList: [
      //   { id: 1, title: "张三", isCompleted: false },
      //   { id: 2, title: "李四", isCompleted: false },
      //   { id: 3, title: "瑞斯", isCompleted: false }
      // ]
    })
    // onMounted hook, 获取本地数据
    onMounted(()=>{
      state.todoList = readTodo()
    })

    const addPlan = (todo:ItemData) => {
      state.todoList.unshift(todo)
    }
    const delPlan = (id: number) => {
      state.todoList.splice(id, 1)
    }
    const updateState = (todo: ItemData, val: boolean) => {
      todo.isCompleted = val
    }

    const isCompletedAll = (val: boolean) =>{
      state.todoList.forEach(item=>item.isCompleted=val)
    }
    const clearCompleted = ()=>{
      state.todoList = state.todoList.filter(item=> !item.isCompleted)
    }


    provide('delPlan', delPlan)
    provide('updateState', updateState)

    // 注意： 我想监听一个数组
    watch(()=>state.todoList, saveTodo, {deep: true})

    return {
      // 将state中的所有属性转换为ref对象 ，用的时候直接使用属性名称即可
      ...toRefs(state),
      addPlan: addPlan,
      clearCompleted,
      isCompletedAll
    }
  }
})
</script>

<style scoped>
.todoList {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 50%;
}
</style>