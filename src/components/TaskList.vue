<script setup lang="ts">
import Task from './TaskItem.vue';
import { ref } from 'vue';
export interface TaskType {
    id: number
    name: string
    completed: boolean
    focusCount: number
    focusLimit: number
}
const props = defineProps<{
    tasks: TaskType[],
    selectedTask: number
}>()
const tasks = ref(props.tasks)
function updateTask(id: number, completed: boolean) {
    const task = tasks.value.find(task => task.id === id)
    if (task) {
        task.completed = completed
    }
}
defineEmits<{
    (e: "task-selected", id: number): void
}>()
</script>
<template>
    <Task v-for="task in tasks" :selected="task.id === props.selectedTask" :key="task.id" :task="task"
        @task-complete="updateTask" @task-selected="(id) => $emit('task-selected', id)" />
</template>


<style scoped></style>