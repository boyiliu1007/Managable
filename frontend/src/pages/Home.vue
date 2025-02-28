<template>
  <div>
    <!-- this is nav bar -->
    <nav
      class="bg-gray-800 text-white flex justify-between items-center shadow-lg px-[2%] py-[1%] h-[10vh] mb-[2vh]"
    >
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

        <div
          class="flex flex-row justify-between min-h-screen p-4 items-start gap-4"
        >
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
        <TaskEditor
          v-if="isEditting"
          :task="selectedTask"
          v-on:cancel="cancelEdit"
          v-on:save="saveTask"
        />

        <div
          v-if="!isEditting"
          class="flex flex-row items-center gap-x-2.5 mt-4 text-white"
        >
          <button
            @click="deleteTask"
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import TaskCard from "@/components/TaskCard.vue";
import TaskContent from "@/components/TaskContent.vue";
import TaskEditor from "@/components/TaskEditor.vue";

const tasks = ref([
  {
    name: "Task A",
    dueDate: "2024-03-01",
    username: "Charlie",
    status: "To Do",
  },
  {
    name: "Task 1",
    dueDate: "2024-02-25",
    username: "Alice",
    status: "In Progress",
  },
  {
    name: "Task 2",
    dueDate: "2024-02-28",
    username: "Bob",
    status: "In Progress",
  },
  {
    name: "Completed Task 1",
    dueDate: "2024-02-18",
    username: "Dave",
    status: "Done",
  },
  {
    name: "Completed Task 2",
    dueDate: "2024-02-20",
    username: "Eve",
    status: "Done",
  },
]);

function mappedTasks() {
  const mapped = {
    "To Do": [],
    "In Progress": [],
    Done: [],
  };

  tasks.value.forEach((task) => {
    mapped[task.status].push(task);
  });

  return mapped;
}

const showModal = ref(false);
const selectedTask = ref(null);
const modalLeft = ref("50%"); // default center
const isCenter = ref(false); // to handle translate
const isEditting = ref(false);

const openModal = (task, status) => {
  selectedTask.value = task;
  showModal.value = true;

  // adjust modal position based on status
  if (status === "To Do") {
    modalLeft.value = "5%"; // left
    isCenter.value = false;
  } else if (status === "In Progress") {
    modalLeft.value = "50%"; // center
    isCenter.value = true;
  } else {
    modalLeft.value = "55%"; // right
    isCenter.value = false;
  }
};

const closeModal = () => {
  showModal.value = false;
  selectedTask.value = null;
};

function editTask() {
  isEditting.value = true;
}

function deleteTask() {
  if(confirm("Are you sure you want to delete this task?")) {
    closeModal();
  } 
}

function cancelEdit() {
  isEditting.value = false;
}

function saveTask(task) {
  isEditting.value = false;
  console.log("Task saved!", task);
  closeModal();
}
</script>
