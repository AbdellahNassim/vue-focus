<script setup lang="ts">
import FocusCounter from '@/components/FocusCounter.vue';
import TaskList from '@/components/TaskList.vue';
import type { TaskType } from '@/components/TaskList.vue';
import { ref, reactive, watch } from 'vue';
const tasks = ref<TaskType[]>([{
    id: 1,
    name: 'Task 1',
    completed: false,
    focusCount: 0,
    focusLimit: 3
}])
const selectedTask = ref(tasks.value[0].id)
const newTask = ref('')
function addTask() {
    tasks.value.push({
        id: tasks.value.length + 1,
        name: newTask.value,
        completed: false,
        focusCount: 0,
        focusLimit: 3
    })
    newTask.value = ''
}
watch([tasks], () => {
    console.log(tasks.value)
}, { deep: true })

function setSelectedTask(id: number) {
    selectedTask.value = id
}
</script>
<template>
    <div>
        <FocusCounter />
    </div>
    <div class="w-full max-w-[786px]">
        <TaskList :selected-task="selectedTask" :tasks="tasks" @task-selected="setSelectedTask" />
    </div>
    <form @submit.prevent="addTask" class="w-full max-w-[786px] flex items-start">
        <input class="w-full border-2 border-brandGreen p-2 rounded-md mx-2 text-brandGreen outline-none" type="text"
            v-model="newTask">
        <button class="btn btn-primary w-56" type="submit">Add task</button>
    </form>
</template>


<style scoped></style>