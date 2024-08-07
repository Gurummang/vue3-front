<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <!-- Logo placeholder -->
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">회원가입</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="company" class="block text-sm font-medium text-gray-700">회사명</label>
              <input type="text" id="company" name="company" v-model="company" required
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Placeholder">
            </div>
            <div>
              <label for="adminName" class="block text-sm font-medium text-gray-700">관리자명</label>
              <input type="text" id="adminName" name="adminName" v-model="adminName" required
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Placeholder">
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">이메일 ID</label>
            <input type="email" id="email" name="email" v-model="email" required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Placeholder">
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">비밀번호</label>
            <input type="password" id="password" name="password" v-model="password" required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Placeholder">
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">비밀번호 확인</label>
            <input type="password" id="confirmPassword" name="confirmPassword" v-model="confirmPassword" required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Placeholder">
          </div>

          <div class="flex items-center">
            <input id="terms" name="terms" type="checkbox" v-model="agreeTerms" required
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
            <label for="terms" class="ml-2 block text-sm text-gray-900">
              회원가입에 동의하겠습니다.
            </label>
          </div>

          <div>
            <button type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
              회원가입
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
                이미 계정을 가지고 계신가요? <router-link to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">로그인</router-link>
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
import { useAuth } from '../utils/auth'

const company = ref('')
const adminName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(false)
const router = useRouter()
const { register } = useAuth()

const handleSubmit = async () => {
  if (!agreeTerms.value) {
    alert('이용약관에 동의해주세요.')
    return
  }
  if (password.value !== confirmPassword.value) {
    alert('비밀번호가 일치하지 않습니다.')
    return
  }
  try {
    await register(company.value, adminName.value, email.value, password.value)
    router.push('/login')
  } catch (error) {
    console.error('Registration failed:', error)
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>