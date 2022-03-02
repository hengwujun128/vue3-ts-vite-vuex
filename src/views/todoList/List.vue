<template>
  <div class="list">
    <!-- this component can use render function -->
    <Item v-for="(item,index) in todoList" :key="item.id" :index="index" :todo-item="item"></Item>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import {ItemData} from '@/types/ItemData'
import ListItem from './Item.vue';
export default defineComponent({
  name: 'List',
  props: {
    todoList: {
      // 为什么要用as？ 约束类型，使用as强转类型
      type: Array as () => ItemData[],
      // type: Array,
      required: true
    }
  },
  components: {
    Item: ListItem
  },
  setup () {
    
    onMounted(()=>{})
    return {}
  }
})
</script>

<style scoped>

</style>