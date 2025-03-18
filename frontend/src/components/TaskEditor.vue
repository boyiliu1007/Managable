<template>
  <label for="name" class="text-gray-600 text-sm">Title</label>
  <input
    v-model="localtask.title"
    type="text"
    id="title"
    name="title"
    class="border rounded-md p-1.5 w-full"
  />
  <label for="description" class="text-gray-600 text-sm">Description</label>
  <input
    v-model="localtask.description"
    type="text"
    id="description"
    name="description"
    class="border rounded-md p-1.5 w-full"
  />
  <label for="status" class="text-gray-600 text-sm">Status</label>
  <select
    v-model="localtask.status"
    id="status"
    name="status"
    class="border rounded-md p-1.5 w-full"
  >
    <option value="todo">To Do</option>
    <option value="in progress">In Progress</option>
    <option value="done">Done</option>
  </select>
  <label for="due" class="text-gray-600 text-sm">Due</label>
  <input
    v-model="localtask.due"
    type="date"
    id="due"
    name="due"
    class="border rounded-md p-1.5 w-full"
  />
  <label for="username" class="text-gray-600 text-sm">Assigned to</label>
  <input
    v-model="localtask.username"
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
      @click="save"
      class="bg-green-500 px-4 py-2 rounded-md cursor-pointer"
    >
      Save
    </button>
  </div>
</template>

<script setup>
import { ref} from 'vue';

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  onCancel: {
    type: Function,
    required: true,
  },
  token: {
    type: String,
    required: true
  },
  baseUrl: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  }
});

const isEditting = ref(true);
const localtask = ref({ ...props.task });
const emit = defineEmits(['close']); // Define an event

async function save() {
  isEditting.value = false;

  try {
    console.log(localtask.value);
    const response = await fetch(`${props.baseUrl}/api/task/${props.id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${props.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: localtask.value.title,
        description: localtask.value.description,
        due: localtask.value.due,
        status: localtask.value.status
      })
    });

    const data = await response.json();
    console.log(response);

    if (response.ok) {
      emit('close'); 
    } else {
      alert(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error("Error updating task:", error);
    alert("Failed to update task.");
  }
}
</script>