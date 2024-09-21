import router from '@/router/index.js';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true
})

let dlpPolicyListApi = async () => {
  try {
    const response = await api.get('/api/v1/dlp/policy/list');
    if(response.data[0].success == false) {
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

let dlpPolicyMakeApi = async (data) => {
  try {
    const response = await api.post('/api/v1/dlp/policy/make', data);
    if(response.data[0].success == false) {
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

let dlpPolicyDeleteApi = async (data) => {
  try {
    const response = await api.post('/api/v1/dlp/policy/delete', data);
    if(response.data[0].success == false) {
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

export { dlpPolicyListApi, dlpPolicyMakeApi, dlpPolicyDeleteApi };