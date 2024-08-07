<template>
  <form @submit.prevent="handleSubmit">
    <h2>구름망 CASB</h2>
    <p>Please log in to continue</p>
    <div>
      <label for="email">Email Address</label>
      <input id="email" v-model="email" type="email" required placeholder="Placeholder" />
    </div>
    <div>
      <label for="password">Password</label>
      <input id="password" v-model="password" type="password" required placeholder="Placeholder" />
      <p>It must be a combination of minimum 8 letters, numbers, and symbols.</p>
    </div>
    <div>
      <input id="remember" v-model="rememberMe" type="checkbox" />
      <label for="remember">Remember me</label>
    </div>
    <button type="submit">Log In</button>
    <p>
      <a href="#" @click.prevent="forgotPassword">Forgot Password?</a>
    </p>
    <p>
      No account yet? <router-link to="/signup">Sign Up</router-link>
    </p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../utils/auth'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const router = useRouter()
const { login } = useAuth()

const handleSubmit = async () => {
  try {
    await login(email.value, password.value)
    router.push('/')
  } catch (error) {
    console.error('Login failed:', error)
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