import router from '@/router/index.js';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true
})

let dlpPolicyListApi = async () => {
  try {
    const response = await api.get('/api/v1/dlp/policy/list');
    if(response.data.success == false) {
      router.push('/login');
      return;
    }
    if(response.status == '200') {
      // console.log(response.data);
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
};

let dlpPolicyMakeApi = async (data) => {
  try {
    const response = await api.post('/api/v1/dlp/policy/make', data);
    if(response.data.success == false) {
      router.push('/login');
      return;
    }
    if(response.status == '200') {
      console.log(response.data);
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
};

let dlpPolicyDeleteApi = async (data) => {
  try {
    const response = await api.post('/api/v1/vt/policy/delete', data);
    if(response.data.success == false) {
      router.push('/login');
      return;
    }
    if(response.status == '200') {
      console.log(response.data);
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
};

export { dlpPolicyListApi, dlpPolicyMakeApi, dlpPolicyDeleteApi };