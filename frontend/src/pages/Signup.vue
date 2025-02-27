<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">📝 Signup</h2>

      <form @submit.prevent="register" class="space-y-4">
        <div>
          <label class="block text-gray-700 font-medium">Account</label>
          <input 
            v-model="username"
            type="text" 
            class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium">Password</label>
          <input 
            v-model="password"
            type="password" 
            class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium">comfirm password</label>
          <input 
            v-model="confirmPassword"
            type="password" 
            class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <p v-if="errorMsg" class="text-red-500 text-sm text-center">{{ errorMsg }}</p>
        <p v-if="successMsg" class="text-green-500 text-sm text-center">{{ successMsg }}</p>

        <button 
          type="submit"
          class="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          Signup
        </button>
      </form>

      <p class="text-center text-gray-600 mt-4">
        Already signup？ <router-link to="/login" class="text-blue-500 hover:underline">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMsg = ref('')
const successMsg = ref('')

const register = async () => {
  errorMsg.value = ''
  successMsg.value = ''

  if (!username.value || !password.value || !confirmPassword.value) {
    errorMsg.value = 'you need to fill out all the blank！'
    // Clear the input fields
    username.value = ''
    password.value = ''
    confirmPassword.value = ''
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'not the same password！'
    // Clear the input fields
    password.value = ''
    confirmPassword.value = ''
    return
  }

  // 模擬 API 延遲 1.5 秒
  setTimeout(() => {
    if (username.value === 'test') {
      errorMsg.value = 'This account has already been used！'
    } else {
      successMsg.value = 'Success! Please login'
      // Clear the input fields
      username.value = ''
      password.value = ''
      confirmPassword.value = ''
      setTimeout(() => router.push('/login'), 1500) // 1.5 秒後跳轉到登入頁
    }
  }, 1500)
}
</script>