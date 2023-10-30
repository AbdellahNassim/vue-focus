<script setup lang="ts">
import Task from './TaskItem.vue';
import { ref, watch } from 'vue';
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
//const tasks = ref(props.tasks)

defineEmits<{
    (e: "task-complete", id: number, completed: boolean): void,
    (e: "task-selected", id: number): void,
    (e: "clear-finished"): void
}>()



</script>
<template>
    <div v-if="selectedTask !== null" class="mt-4">
        <h1 class="text-center text-3xl font-bold">{{ tasks.find(task => task.id === selectedTask)?.name }}</h1>

    </div>
    <div class="flex justify-end">
        <button class="btn btn-danger" @click="$emit('clear-finished')">
            <v-icon name='bi-trash'></v-icon>
            Clear
        </button>
    </div>


    <div>
        <div class="flex items-center">
            <p class="text-2xl font-bold">Tasks</p>
            <div class="ml-auto font-bold text-brandGreen">
                {{ tasks.filter(task => task.completed).length }} / {{ tasks.length }}
            </div>
        </div>
    </div>
    <Task v-for="task in tasks" :selected="task.id === props.selectedTask" :key="task.id" :task="task"
        @task-complete="(id, completed) => $emit('task-complete', id, completed)"
        @task-selected="(id) => $emit('task-selected', id)" />
</template>


<style scoped></style>