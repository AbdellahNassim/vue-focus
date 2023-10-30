<script setup lang="ts">
const TIME_FOCUS = 25 * 60
const TIME_SHORT_BREAK = 5 * 60
const TIME_LONG_BREAK = 15 * 60
import alarm from "@/assets/sound/alarm_sound.wav"
import { ref, computed, onMounted, onUnmounted, watchEffect } from "vue"
type Tab = "focus" | "short-break" | "long-break"
const alarmAudioRef = ref<HTMLAudioElement>()
const selectedTab = ref<Tab>("focus")
const counter = ref(TIME_FOCUS)
const focusCount = ref(1)
const status = ref("stopped")
let interval: any;
function stopCounter() {
    status.value = "stopped"
    alarmAudioRef.value?.play()
    clearInterval(interval)

}

function setSelectedTab(tab: Tab) {
    selectedTab.value = tab
    switch (tab) {
        case "focus":
            counter.value = TIME_FOCUS
            focusCount.value = focusCount.value + 1
            stopCounter()
            break;
        case "short-break":
            counter.value = TIME_SHORT_BREAK
            stopCounter()
            break;
        case "long-break":
            counter.value = TIME_LONG_BREAK
            stopCounter()
            break;
        default:
            break;
    }
}
const emit = defineEmits<{
    (e: "focus-completed"): void
}>()
watchEffect(() => {
    if (counter.value === 0) {
        if (selectedTab.value === "focus" && focusCount.value % 4 === 0) {
            emit("focus-completed")
            setSelectedTab("long-break")
        } else if (selectedTab.value === "focus") {
            emit("focus-completed")
            setSelectedTab("short-break")
        } else {
            setSelectedTab("focus")
        }
    }
})


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
    stopCounter()
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
        <audio ref="alarmAudioRef">
            <source :src="alarm" type="audio/wav" />
        </audio>
    </div>
</template>


<style scoped></style>