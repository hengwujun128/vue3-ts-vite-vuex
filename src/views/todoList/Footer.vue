<template>
  <div class="footer">
    <input v-model="isCheckedAll" class="checkbox" type="checkbox" />
    <span class="count">已完成 {{ count }} / 全部 {{ todoList.length }}</span>
    <button class="delButton" @click="clearCompleted">清除已完成任务</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import {ItemData} from '@/types/ItemData'

export default defineComponent({
    name: "Footer",
    props: {
      todoList: {
        // type: Array as ()=>ItemData[],
        type: Array,
        required: true
      },
      isCompletedAll: {
        type: Function,
        required: true
      },
      clearCompleted: {
        type: Function,
        required: true
      }
    },
    setup(props) {
      // reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
      const count = computed(() => {
        return props.todoList.reduce((pre: number, todo: ItemData) => pre + (todo.isCompleted ? 1 : 0), 0);
      });
      // 是否全选操作
      const isCheckedAll = computed({
        get: () => {
          // console.log(count)
          return count.value > 0 && count.value === props.todoList.length;
        },
        set: val => {
          props.isCompletedAll(val);
        }
      });

      return {
        count,
        isCheckedAll
      };
    }
  }
);
</script>

<style scoped>
.footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #cccccc;
}

  .checkbox {
    margin-right: 10px;
  }

  .count {
    flex: 1;
  }
</style>