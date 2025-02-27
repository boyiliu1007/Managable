<template>
  <div
    class="bg-white py-3 px-4 rounded-lg shadow-md border cursor-pointer hover:shadow-lg transition"
    @click="$emit('open-modal', task)"
  >
    <div class="flex flex-row items-center gap-3 mb-2">
      <h3 class="text-lg font-semibold">{{ task.name }}</h3>
      <TaskStatus :status="status" />
    </div>
    <p class="text-gray-600 text-sm">Due: {{ task.dueDate }}</p>
    <p class="text-gray-500 text-sm">Assigned to: {{ task.username }}</p>
  </div>
</template>

<script setup>
import TaskStatus from "./TaskStatus.vue";

defineProps({
  task: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
  },
});
defineEmits(["open-modal"]);
</script>
