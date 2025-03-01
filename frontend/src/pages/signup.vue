

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">📝 註冊</h2>

      <form @submit.prevent="register" class="space-y-4">
        <div>
          <label class="block text-gray-700 font-medium">帳號</label>
          <input 
            v-model="username"
            type="text" 
            class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium">密碼</label>
          <input 
            v-model="password"
            type="password" 
            class="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium">確認密碼</label>
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
          註冊
        </button>
      </form>

      <p class="text-center text-gray-600 mt-4">
        已經有帳號？ <router-link to="/login" class="text-blue-500 hover:underline">登入</router-link>
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
    errorMsg.value = '所有欄位都必須填寫！'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMsg.value = '兩次輸入的密碼不一致！'
    return
  }

  // 模擬 API 延遲 1.5 秒
  setTimeout(() => {
    if (username.value === 'test') {
      errorMsg.value = '此帳號已被註冊！'
    } else {
      successMsg.value = '註冊成功！請登入'
      setTimeout(() => router.push('/login'), 1500) // 1.5 秒後跳轉到登入頁
    }
  }, 1500)
}


return router
return username 
return password 
return confirmPassword 
return errorMsg
return successMsg
return register
</script>