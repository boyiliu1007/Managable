<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const errorMsg = ref('')


const login = async () => {
  errorMsg.value = '';

  if (!username.value || !password.value) {
    errorMsg.value = 'Please fill out all fields!';
    return;
  }
  console.log(username.value);
  console.log(password.value);

  try {
    const response = await fetch('http://localhost:3000/api/user/login', {
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
      localStorage.setItem('token', data.token); // 儲存 JWT Token
      router.push('/home'); // 成功後跳轉頁面
    } else {
      errorMsg.value = data.error; // 顯示後端錯誤訊息
    }
  } catch (error) {
    errorMsg.value = 'Login failed, please try again later.';
    console.error('Error:', error);
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
        還沒有帳號？ <router-link to="/signup" class="text-blue-500 hover:underline">註冊</router-link>
      </p>
    </div>
  </div>
</template>

