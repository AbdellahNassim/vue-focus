<script setup lang="ts">
import FocusCounter from '@/components/FocusCounter.vue';
import TaskList from '@/components/TaskList.vue';
import type { TaskType } from '@/components/TaskList.vue';
import { ref, reactive, watch } from 'vue';
import { useLocalStorage } from '@vueuse/core'
const tasks = ref<TaskType[]>([])
const selectedTask = ref(tasks.value[0]?.id ?? null)
const newTask = ref('')
const newTaskFocusCount = ref(4)
useLocalStorage('tasks', tasks)
function addTask() {
    tasks.value.push({
        id: tasks.value.length + 1,
        name: newTask.value,
        completed: false,
        focusCount: 0,
        focusLimit: newTaskFocusCount.value
    })
    newTask.value = ''
}
watch([tasks], () => {
    console.log(tasks.value)
}, { deep: true })

function setSelectedTask(id: number) {
    selectedTask.value = id
}
function updateFocusCount() {
    const task = tasks.value.find(task => task.id === selectedTask.value)
    if (task) {
        task.focusCount++
    }
}
function clearFinished() {
    console.log('clearing finished')
    tasks.value = tasks.value.filter(task => !task.completed)
}
function updateTask(id: number, completed: boolean) {
    const task = tasks.value.find(task => task.id === id)
    if (task) {
        task.completed = completed
    }
}
</script>
<template>
    <div>
        <FocusCounter @focus-completed="updateFocusCount" />
    </div>
    <div class="w-full max-w-[786px]">
        <TaskList :selected-task="selectedTask" :tasks="tasks" @task-selected="setSelectedTask"
            @clear-finished="clearFinished" @task-complete="updateTask" />
    </div>
    <form @submit.prevent="addTask" class="w-full max-w-[786px] flex items-start mt-6">
        <input placeholder="Task description"
            class="w-full border-2 border-brandGreen p-2 rounded-md mx-2 text-brandGreen outline-none" type="text"
            v-model="newTask">
        <input placeholder="4" default="4"
            class="w-24 border-2 border-brandGreen p-2 rounded-md mx-2 text-brandGreen outline-none" type="number"
            v-model="newTaskFocusCount">
        <button class="btn btn-primary w-56" type="submit">Add task</button>
    </form>
</template>


<style scoped></style>