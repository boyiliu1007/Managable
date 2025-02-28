<template>
  <label for="name" class="text-gray-600 text-sm">Name</label>
  <input
    v-model="task.name"
    type="text"
    id="name"
    name="name"
    class="border rounded-md p-1.5 w-full"
  />
  <label for="status" class="text-gray-600 text-sm">Status</label>
  <select
    v-model="task.status"
    id="status"
    name="status"
    class="border rounded-md p-1.5 w-full"
  >
    <option value="To Do">To Do</option>
    <option value="In Progress">In Progress</option>
    <option value="Done">Done</option>
  </select>
  <label for="due" class="text-gray-600 text-sm">Due</label>
  <input
    v-model="task.dueDate"
    type="date"
    id="due"
    name="due"
    class="border rounded-md p-1.5 w-full"
  />
  <label for="username" class="text-gray-600 text-sm">Assigned to</label>
  <input
    v-model="task.username"
    type="text"
    id="username"
    name="username"
    class="border rounded-md p-1.5 w-full text-gray-500 border-gray-400"
    disabled
  />
  <div class="flex flex-row items-center gap-x-2.5 mt-4 text-white">
    <button
      @click="onCancel"
      class="bg-gray-500 px-4 py-2 rounded-md cursor-pointer"
    >
      Cancel
    </button>
    <button
      @click="onSave(task)"
      class="bg-green-500 px-4 py-2 rounded-md cursor-pointer"
    >
      Save
    </button>
  </div>
</template>

<script setup>

defineProps({
  task: {
    type: Object,
    required: true,
  },
  onCancel: {
    type: Function,
    required: true,
  },
  onSave: {
    type: Function,
    required: true,
  },
});
</script>
