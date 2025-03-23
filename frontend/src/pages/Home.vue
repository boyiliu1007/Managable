<template>
  <div>
    <!-- this is nav bar -->
    <nav class="bg-gray-800 text-white flex justify-between items-center shadow-lg px-[2%] py-[1%] h-[10vh] mb-[2vh]">
      <div class="text-xl font-bold">Managable</div>
      <button
        @click="logout"
        class="bg-red-500 hover:bg-red-600 rounded-md px-[1%] py-[0.5%]"
      >
        Logout
      </button>
    </nav>

    <!-- this is main content area -->
    <div class="h-[88vh] w-full px-[3%]">
      <div class="flex flex-col">
        <button
          @click="newTask"
          class="bg-red-500 hover:bg-red-600 rounded-md py-[0.5%] m-[1%] w-[10%] min-w-5 text-white text-lg"
        >
          New Task
        </button>

        <div class="flex flex-row justify-between min-h-screen p-4 items-start gap-4">
          <div
            v-for="(cards, status) in mappedTasks()"
            :key="status"
            class="w-[30%] bg-gray-200 flex flex-col rounded-lg shadow-md p-4"
          >
            <h2 class="text-lg font-bold mb-2">{{ status }}</h2>

            <TaskCard
              v-for="(card, index) in cards"
              :key="index"
              :task="card"
              :status="status"
              class="mb-2"
              @open-modal="openModal($event, status)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- this is a dark overlay, shown if the card is clicked -->
    <div
      v-if="showModal"
      class="fixed inset-0 flex items-center justify-center"
      :style="{ background: 'rgba(0, 0, 0, 0.3)' }"
    >
      <div
        class="bg-white p-6 rounded-lg shadow-lg w-[40%] absolute transition-transform"
        :style="{ left: modalLeft }"
        :class="{ 'translate-x-[-50%]': isCenter }"
      >
        <TaskContent v-if="!isEditting" :task="selectedTask" />
        <hr v-if="!isEditting" class="border-t-1 border-gray-300 my-[1%]"/>
        <p v-if="!isEditting" class="text-gray-600 text-sm">Description: {{ selectedTask.description }}</p>
        <TaskEditor
          v-if="isEditting"
          :task="selectedTask"
          :baseUrl="baseUrl"
          :token="token"
          :id="selectedTask._id"
          v-on:cancel="cancelEdit"
          @close="closeModal"
        />

        <div
          v-if="!isEditting"
          class="flex flex-row items-center gap-x-2.5 mt-4 text-white"
        >
          <button
            @click="deleteTask(selectedTask)"
            class="bg-red-500 px-4 py-2 rounded-md cursor-pointer"
          >
            Delete
          </button>
          <button
            @click="editTask"
            class="bg-gray-500 px-4 py-2 rounded-md cursor-pointer"
          >
            Edit
          </button>
          <button
            @click="closeModal"
            class="bg-gray-500 px-4 py-2 rounded-md cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>

    <!-- this is a dark overlay, shown if the newTask button is clicked -->
    <div
      v-if="showNewTaskModal"
      class="fixed inset-0 flex items-center justify-center"
      :style="{ background: 'rgba(0, 0, 0, 0.3)' }"
    >
        <NewTask @close="closeModal" @taskAdded="taskAdded" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import TaskCard from "@/components/TaskCard.vue";
import TaskContent from "@/components/TaskContent.vue";
import TaskEditor from "@/components/TaskEditor.vue";
import NewTask from "@/components/NewTask.vue";

const tasks = ref([]);  
const baseUrl = "http://localhost:3000"
const token = localStorage.getItem('token');

onMounted(() => {
  if (token) {
    axios
      .get(`${baseUrl}/api/task`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          order: "asc"
        }
      })
      .then((response) => {
        // console.log(response.data);
        tasks.value = response.data;
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  } else {
    console.log("No token found, please log in.");
  }
});

function mappedTasks() {
  const mapped = {
    "todo": [],
    "in progress": [],
    "done": [],
  };

  tasks.value.forEach((task) => {
    mapped[task.status].push(task);
  });

  return mapped;
}

const showModal = ref(false);
const showNewTaskModal = ref(false);
const selectedTask = ref(null);
const modalLeft = ref("50%"); // default center
const isCenter = ref(false); // to handle translate
const isEditting = ref(false);

const newTask = () => {
  showNewTaskModal.value = true;
};

const taskAdded = (newTask) => {
  tasks.value.push(newTask);
  showNewTaskModal.value = false;
};

const openModal = (task, status) => {
  selectedTask.value = task;
  showModal.value = true;

  // adjust modal position based on status
  if (status === "todo") {
    modalLeft.value = "5%"; // left
    isCenter.value = false;
  } else if (status === "in progress") {
    modalLeft.value = "50%"; // center
    isCenter.value = true;
  } else {
    modalLeft.value = "55%"; // right
    isCenter.value = false;
  }
};

const closeModal = () => {
  showModal.value = false;
  showNewTaskModal.value = false;
  selectedTask.value = null;
  isEditting.value = false;
  window.location.reload();
};

function editTask() {
  isEditting.value = true;
}

async function deleteTask(task) {
  if(confirm("Are you sure you want to delete this task?")) {
    
    try {
      const response = await fetch(`${baseUrl}/api/task/${task._id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Task deleted successfully!");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task.");
    }
    closeModal();
  } 
}

function cancelEdit() {
  isEditting.value = false;
}

const logout = () => {
  localStorage.removeItem("token"); 
  window.location.href = "/login";
};
</script>
