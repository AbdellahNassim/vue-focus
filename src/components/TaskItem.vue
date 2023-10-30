<script setup lang="ts">
import type { TaskType } from "./TaskList.vue"
import { ref } from "vue"
const props = defineProps<{ task: TaskType, selected: boolean }>()
const emit = defineEmits<{
    (e: "task-complete", id: number, completed: boolean): void
    (e: "task-selected", id: number): void
}>()

</script>
<template>
    <div :class="[{ 'line-through': task.completed, 'border-l-4 border-l-black': selected }, 'p-4 shadow-lg cursor-pointer rounded-md border-2 border-brandGreen m-2 w-full']"
        @click="$emit('task-selected', task.id)">
        <div class="flex items-center">
            <v-icon class="hover:bg-slate-400 rounded-full hover:bg-opacity-20 cursor-pointer"
                @click="$emit('task-complete', task.id, !task.completed)"
                :class="[{ 'text-brandGreen': task.completed, 'text-gray-400': !task.completed }, 'w-10 h-10']"
                name="md-done-sharp"></v-icon>
            <p class="text-lg font-bold">{{ task.name }}</p>
            <div class="ml-auto font-bold text-brandGreen">
                {{ task.focusCount }} / {{ task.focusLimit }}
            </div>
        </div>

    </div>
</template>


<style scoped></style>