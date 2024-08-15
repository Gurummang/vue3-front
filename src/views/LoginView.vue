<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">

    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h2 class="my-6 text-center text-3xl font-extrabold text-gray-900">구름망 CASB</h2>
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">관리자 이메일</label>
            <div class="mt-1">
              <input id="email" name="email" type="email" autocomplete="email" required
                    v-model="email"
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="관리자 이메일">
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">비밀번호</label>
            <div class="mt-1">
              <input id="password" name="password" type="password" required
                    v-model="password"
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="비밀번호">
            </div>
            <!-- <p class="mt-2 text-xs text-gray-500">최소 8글자 이상</p> -->
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox"
                    v-model="rememberMe"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">로그인 유지</label>
            </div>

            <!-- <div class="text-sm">
              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500" @click.prevent="forgotPassword">
                Forgot Password?
              </a>
            </div> -->
          </div>

          <div>
            <button type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
              로그인
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">
                아직 회원가입을 하지 않았나요? <router-link to="/signup" class="font-medium text-indigo-600 hover:text-indigo-500">회원가입</router-link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { gasbLoginApi } from '@/apis/signup.js'
import { useAuth } from '../utils/auth'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const router = useRouter()
const { login } = useAuth()

const handleSubmit = async () => {
  try {
    let data = {
      "email": email.value,
      "password": password.value
    }
    const response = await gasbLoginApi(data);
    let setCookie = '';
    setCookie += 'jwt=' + response.jwt;
    // document.cookie = setCookie;
    
    // 쿠키가 정상적으로 설정되었는지 확인 (서버 응답에 따라)
    if (response.status === 'success') {
      router.push('/');
    } else {
      console.error('Cookie was not set properly');
      alert('로그인 처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  } catch (error) {
    console.error('Login failed:', error);
    // 서버에서 보낸 에러 메시지가 있다면 그것을 사용하고, 없다면 기본 메시지 사용
    const errorMessage = error.response?.data?.message || '아이디 또는 비밀번호가 올바르지 않습니다.';
    alert(errorMessage);
  }
}

const forgotPassword = () => {
  // Implement forgot password functionality
  console.log('Forgot password')
}
</script>

<style scoped>
/* Add your styles here */
</style>