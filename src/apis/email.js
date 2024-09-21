import router from '@/router/index.js';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true
})

let alertsListApi = async () => {
  try {
    const response = await api.get('/api/v1/alerts');
    if(response.data.status == 'error') {
      router.push('/login');
      return;
    }
    if(response.status == '200') {
      return response.data;
    }
  } catch (err) {
    throw err;  
  }
};

export { alertsListApi };