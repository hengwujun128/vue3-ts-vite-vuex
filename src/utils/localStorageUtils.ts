import { ItemData } from '@/types/ItemData'

function saveTodo(todos: ItemData) {
  localStorage.setItem("todos_key", JSON.stringify(todos));
}

function readTodo(): ItemData[] {
  // console.log(JSON.parse(localStorage.getItem("todos_key") || "[]"))
  return JSON.parse(localStorage.getItem("todos_key") || "[]");
}

export { saveTodo, readTodo };