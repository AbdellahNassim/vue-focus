<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue"
type Tab = "focus" | "short-break" | "long-break"
const selectedTab = ref<Tab>("focus")
const counter = ref(25 * 60)
const status = ref("stopped")
function setSelectedTab(tab: Tab) {
    selectedTab.value = tab
    switch (tab) {
        case "focus":
            counter.value = 25 * 60
            break;
        case "short-break":
            counter.value = 5 * 60
            break;
        case "long-break":
            counter.value = 15 * 60
            break;
        default:
            break;
    }
}
let interval: any;
function toggleCounter() {
    status.value = status.value === "stopped" ? "started" : "stopped"
    if (status.value === "stopped") {
        clearInterval(interval)
    } else {
        interval = setInterval(() => {
            counter.value--
        }, 1000)
    }
}
onUnmounted(() => {
    clearInterval(interval)
})
const minutes = computed(() => Math.floor(counter.value / 60))
const seconds = computed(() => counter.value % 60)
</script>
<template>
    <div class="bg-brandGreen bg-opacity-75 p-6 rounded-md">
        <div class="flex gap-4">
            <button @click="setSelectedTab('focus')"
                :class="[{ 'bg-gray-400': selectedTab === 'focus' }, 'bg-opacity-50 p-2 rounded']">Focus</button>
            <button @click="setSelectedTab('short-break')"
                :class="[{ 'bg-gray-400': selectedTab === 'short-break' }, 'bg-opacity-50 p-2 rounded']">Short
                Break</button>
            <button @click="setSelectedTab('long-break')"
                :class="[{ 'bg-gray-400': selectedTab === 'long-break' }, 'bg-opacity-50 p-2 rounded']">Long
                Break</button>
        </div>
        <div class="w-full grid place-items-center text-7xl text-white mt-6">
            {{ minutes.toFixed(0).padStart(2, "0") }}:{{ seconds.toFixed(0).padStart(2, "0") }}
        </div>
        <div class="w-full">
            <button @click="toggleCounter" class="bg-white text-brandGreen w-full h-24 text-6xl rounded shadow-xl mt-6">{{
                status === "stopped" ? 'Start' : 'Stop' }}</button>
        </div>
    </div>
</template>


<style scoped></style>