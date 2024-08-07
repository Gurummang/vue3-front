<template>
  <form @submit.prevent="handleSubmit">
    <h2>회원가입</h2>
    <div>
      <label for="lastName">성</label>
      <input id="lastName" v-model="lastName" type="text" required placeholder="Placeholder" />
    </div>
    <div>
      <label for="firstName">이름</label>
      <input id="firstName" v-model="firstName" type="text" required placeholder="Placeholder" />
    </div>
    <div>
      <label for="email">이메일 ID</label>
      <input id="email" v-model="email" type="email" required placeholder="Placeholder" />
    </div>
    <div>
      <label for="password">비밀번호</label>
      <input id="password" v-model="password" type="password" required placeholder="Placeholder" />
    </div>
    <div>
      <input id="terms" v-model="agreeTerms" type="checkbox" required />
      <label for="terms">Vestibulum faucibus odio vitae arcu auctor lectus.</label>
    </div>
    <button type="submit">Button Text</button>
    <p>
      Already have an account? <router-link to="/login">Log in</router-link>
    </p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../utils/auth'

const lastName = ref('')
const firstName = ref('')
const email = ref('')
const password = ref('')
const agreeTerms = ref(false)
const router = useRouter()
const { register } = useAuth()

const handleSubmit = async () => {
  if (!agreeTerms.value) {
    alert('Please agree to the terms and conditions')
    return
  }
  try {
    await register(lastName.value, firstName.value, email.value, password.value)
    router.push('/login')
  } catch (error) {
    console.error('Registration failed:', error)
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>