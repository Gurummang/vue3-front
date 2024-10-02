import router from '@/router/index.js'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true
})

let mainTotalApi = async () => {
  try {
    const response = await api.get('/api/v1/main/total');
    if(response.data.status == 'error') {
      router.push('/');
      return;
    }
    if(response.status == '200') {
      return response.data;
    }
  } catch (err) {
    throw err;  
  }
}

let mainStatisticsApi = async () => {
  try {
    const response = await api.get('/api/v1/main/statistics');
    if(response.data.status == 'error') {
      router.push('/');
      return;
    }
    if(response.status == '200') {
      return response.data;
    }
  } catch (err) {
    throw err;  
  }
}

let mainDlpApi = async () => {
  try {
    const response = await api.get('/api/v1/main/dlp');
    if(response.data.status == 'error') {
      router.push('/');
      return;
    }
    if(response.status == '200') {
      return response.data;
    }
  } catch (err) {
    throw err;  
  }
}

export { mainTotalApi, mainStatisticsApi, mainDlpApi };