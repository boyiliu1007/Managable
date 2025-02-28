<template>
  <div :class="`rounded-full flex flex-row gap-1.5 items-center py-0.5 px-2 h-fit ${getBgColor(status)}`">
    <div :class="`rounded-full size-1 ${getDotColor(status)}`"></div>
    <span class="text-gray-600 text-xs">{{ status ?? "Unknown" }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  status: {
    type: String,
    required: true,
  },
});

function getBgColor(status) {
  switch (status) {
    case "To Do":
      return "bg-red-100";
    case "In Progress":
      return "bg-orange-100";
    case "Done":
      return "bg-green-100";
    default:
      return "bg-gray-100";
  }
}

function getDotColor(status) {
  switch (status) {
    case "To Do":
      return "bg-red-400";
    case "In Progress":
      return "bg-orange-400";
    case "Done":
      return "bg-green-400";
    default:
      return "bg-gray-400";
  }
}

</script>
