<template>
    <div 
      class="bg-white p-4 rounded-lg shadow-md border cursor-pointer hover:shadow-lg transition"
      @click="$emit('open-modal', task)">
      <h3 class="text-lg font-semibold">{{ task.name }}</h3>
      <p class="text-gray-600 text-sm">Due: {{ task.dueDate }}</p>
      <p class="text-gray-500 text-sm">Assigned to: {{ task.username }}</p>
    </div>
  </template>
  
  <script setup>
  defineProps({
    task: {
      type: Object,
      required: true
    }
  });
  defineEmits(['open-modal']);
  </script>
  