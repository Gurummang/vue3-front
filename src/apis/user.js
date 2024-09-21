import router from '@/router/index.js';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true
})

let userStatisticsApi = async () => {
  try {
    const response = await api.get('/api/v1/users/total');
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

let userChartInfoApi = async () => {
  try {
    const response = await api.get('/api/v1/users/statistics');
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

let userDetailsApi = async () => {
  try {
    const response = await api.get('/api/v1/users/info');
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

export { userStatisticsApi, userChartInfoApi, userDetailsApi };