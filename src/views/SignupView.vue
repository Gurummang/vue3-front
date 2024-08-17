<template>
  <div class="min-h-screen bg-gray-100 flex justify-center py-4 sm:px-6 lg:px-8">
    <!-- <div class="h-1/2">
      <img src="../../public/meta_logo.png" class="h-1/2 rounded-lg">
    </div> -->
    <div class="flex-col sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h2 class="my-6 text-center text-3xl font-extrabold text-gray-900">회원가입</h2>
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div class="grid grid-cols-2 gap-x-4">
            <div>
              <label for="company" class="block text-sm font-medium text-gray-700">회사명</label>
              <input type="text" id="company" name="company" v-model="company" required
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="회사명">
            </div>
            <div>
              <label for="adminName" class="block text-sm font-medium text-gray-700">관리자명</label>
              <input type="text" id="adminName" name="adminName" v-model="adminName" required
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="관리자명">
            </div>
            <p v-if="companyHasSpecialChar" class="mt-1 col-span-2 text-xs text-red-600">회사명 또는 관리자명에 특수문자를 사용할 수 없습니다.</p>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">관리자 이메일</label>
            <input type="email" id="email" name="email" v-model="email" required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="관리자 이메일">
            <p v-if="adminEmailHasSpecialChar" class="mt-1 text-xs text-red-600">관리자 이메일에 특수문자를 사용할 수 없습니다.</p>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">비밀번호</label>
            <input type="password" id="password" name="password" v-model="password" required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="비밀번호">
            <p v-if="!isPasswordValid && password" class="mt-1 text-xs text-red-600">
              비밀번호는 8~30자의 대문자, 소문자, 숫자, 특수문자(_,@,#,$,!)를 각 1개 이상 포함해야 합니다.
            </p>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">비밀번호 확인</label>
            <input type="password" id="confirmPassword" name="confirmPassword" v-model="confirmPassword" required
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="비밀번호 확인">
            <p v-if="!isPasswordMatch && confirmPassword" class="mt-2 text-sm text-red-600">
              비밀번호가 일치하지 않습니다.
            </p>
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
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { gasbSignupApi } from '@/apis/signup.js'
import { specialChar } from '@/utils/security'
import { FaceSmileIcon } from '@heroicons/vue/24/outline';

const company = ref('');
const adminName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const agreeTerms = ref(false);
const router = useRouter();

const companyHasSpecialChar = ref(false);
const adminEmailHasSpecialChar = ref(false);

const isPasswordValid = ref(true);
const isPasswordMatch = ref(true);

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@#$!])[A-Za-z\d_@#$!]{8,30}$/

watch([company, adminName], (newValue) => {
  companyHasSpecialChar.value = specialChar(newValue);
})
watch(email, (newValue) => {
  adminEmailHasSpecialChar.value = specialChar(newValue);
})
watch(password, (newValue) => {
  isPasswordValid.value = passwordRegex.test(newValue)
})
watch([password, confirmPassword], ([newPassword, newConfirmPassword]) => {
  isPasswordMatch.value = newPassword === newConfirmPassword
})

const handleSubmit = async () => {
  if (!agreeTerms.value) {
    alert('이용약관에 동의해주세요.')
    return
  }
  if (!isPasswordValid.value) {
    alert('비밀번호 형식이 올바르지 않습니다.')
    return
  }
  if (!isPasswordMatch.value) {
    alert('비밀번호가 일치하지 않습니다.')
    return
  }
  try {
    let data = {
      "email" : email.value,
      "password" : password.value,
      "firstName" : company.value,
      "lastName" : adminName.value
    }
    const response = await gasbSignupApi(data);
    if (response.status === 'success') {
      router.push('/login');
    }
  } catch (error) {
    console.error('Registration failed:', error)
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>