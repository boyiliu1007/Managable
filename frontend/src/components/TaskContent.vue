<template>
  <div class="flex flex-row items-center gap-3 mb-2">
    <h3 class="text-lg font-semibold">{{ task.title }}</h3>
    <TaskStatus :status="task.status" />
  </div>
  <p class="text-gray-600 text-sm">Due: {{ formatDate(task.due) }}</p>
  <p class="text-gray-500 text-sm">Assigned to: {{ task.username }}</p>
</template>

<script setup>
import TaskStatus from "./TaskStatus.vue";

defineProps({
  task: {
    type: Object,
    required: true,
  },
});

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
</script>
