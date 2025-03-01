


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
  errorMsg.value = '';
  successMsg.value = '';

  if (!username.value || !password.value || !confirmPassword.value) {
    errorMsg.value = 'You need to fill out all the blanks！';
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Not the same password！';
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/user/register', {  // 確保符合後端 API 路徑
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    });

    const data = await response.json();

    if (response.ok) {
      successMsg.value = 'Success! Please login';
      username.value = '';
      password.value = '';
      confirmPassword.value = '';

      // 1.5 秒後跳轉到登入頁
      setTimeout(() => router.push('/login'), 1500);
    } else {
      errorMsg.value = data.error; // 顯示後端回傳的錯誤訊息
    }
  } catch (error) {
    errorMsg.value = 'Registration failed, please try again later.';
    console.error('Error:', error);
  }
}
</script>