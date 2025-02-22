<!-- src/pages/Home.vue -->
<template>
    <div>
      <nav class="bg-gray-800 text-white flex justify-between items-center shadow-lg px-[2%] py-[1%] h-[10vh] mb-[2vh]">
        <div class="text-xl font-bold">
          Managable
        </div>

        <button @click="logout" class="bg-red-500 hover:bg-red-600 rounded-md px-[1%] py-[0.5%]">
          Logout
        </button>
      </nav>

      <div class="h-[88vh] w-full px-[3%]">
        <div class="flex flex-col">
          <button @click="newTask" class="bg-red-500 hover:bg-red-600 rounded-md px-[1%] py-[0.5%] m-[1%] w-[7%] min-w-5 text-white">
            New Task
          </button>

          <div class="flex flex-row justify-between p-4">
            <div 
              v-for="(cards, status) in tasks" 
              :key="status" 
              class="h-auto w-[30%] bg-gray-200 flex flex-col rounded-lg shadow-md p-4">
              
              <h2 class="text-lg font-bold mb-2">{{ status }}</h2>

              <div v-for="(card, index) in cards" :key="index" class="bg-white p-3 rounded-md shadow mb-2">
                {{ card }}
              </div>
            </div>
          </div>
        </div>
      </div>
      

    </div>
  </template>
  
  <script setup>
    const tasks = {
      "In Progress": ["Task 1", "Task 2", "Task 3"],
      "To Do": ["Task A", "Task B"],
      "Done": ["Completed Task 1", "Completed Task 2", "Completed Task 3", "Completed Task 4"]
    };
  </script>
  
  <style scoped>

  </style>