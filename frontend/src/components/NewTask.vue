<template>
    <div class="p-6 bg-white rounded-lg shadow-lg w-[40%]">
      <h2 class="text-lg font-bold mb-4">Create New Task</h2>
  
      <div class="mb-2">
        <label class="block text-sm font-medium">Title</label>
        <input v-model="task.title" type="text" class="w-full border p-2 rounded" />
      </div>
  
      <div class="mb-2">
        <label class="block text-sm font-medium">Description</label>
        <textarea v-model="task.description" class="w-full border p-2 rounded"></textarea>
      </div>
      <div class="mb-2">
        <label class="block text-sm font-medium">Due Date</label>
        <input v-model="task.due" type="date" class="w-full border p-2 rounded" />
      </div>
      <div class="mb-2">
        <label class="block text-sm font-medium">Status</label>
        <select v-model="task.status" class="w-full border p-2 rounded">
          <option value="todo">To Do</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
  
      <div class="flex justify-end gap-2 mt-4">
        <button @click="closeModal" class="bg-gray-500 px-4 py-2 text-white rounded-md">Cancel</button>
        <button @click="saveTask" class="bg-green-500 px-4 py-2 text-white rounded-md">Save</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import axios from "axios";
  
  const emit = defineEmits(["close", "taskAdded"]);
  const baseUrl = "http://localhost:3000";
  
  const task = ref({
    title: "",
    description: "",
    status: "todo",
    due: ""
  });
  
  const saveTask = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${baseUrl}/api/task/add`, task.value, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      emit("taskAdded", response.data);
      closeModal();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };
  
  const closeModal = () => {
    emit("close");
  };
  </script>
  