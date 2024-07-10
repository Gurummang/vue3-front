import './index.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import SideNav from './components/SideNav.vue'

const app = createApp(App)

app.use(router)

app.component("SideNav", SideNav);

app.mount('#app')
