<template>
  <div
    class="bg-white py-3 px-4 rounded-lg shadow-md border cursor-pointer hover:shadow-lg transition"
    @click="$emit('open-modal', task)"
  >
    <TaskContent :task="task" />
  </div>
</template>

<script setup>
import TaskContent from "./TaskContent.vue";

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
