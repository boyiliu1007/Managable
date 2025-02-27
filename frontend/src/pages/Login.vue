<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const errorMsg = ref('')

const login = () => {
  // 模擬登入驗證（這裡可以改成呼叫後端 API）
  if (username.value === 'admin' && password.value === '1234') {
    localStorage.setItem('token', 'fake_token_123') // 存入假 Token
    router.push('/home') // 跳轉到 Home 頁面
  } else {
    errorMsg.value = 'Wrong account or password！'
  }
}

</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">🔐 Login</h2>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="block text-gray-700 font-medium">Account</label>
          <input 
            v-model="username"
            type="text" 
            class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="type here"
            required
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium">Password</label>
          <input 
            v-model="password"
            type="password" 
            class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="type here"
            required
          />
        </div>

        <p v-if="errorMsg" class="text-red-500 text-sm text-center">{{ errorMsg }}</p>

        <button 
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>

      <p class="text-center text-gray-600 mt-4">
        還沒有帳號？ <a href="#" class="text-blue-500 hover:underline">註冊</a>
      </p>
    </div>
  </div>
</template>