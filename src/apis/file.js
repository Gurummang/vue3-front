import router from '@/router/index.js';
import axios from 'axios';

// axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true
})

let totalFileInfoApi = async () => {
  try {
    const response = await api.get('/api/v1/files/board');
    if(response.status == '200') {
      console.log(response.data);
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    if(err.response.status == '401') {
      router.push('/login');
      // console.log('누구냐!')
    }
    throw err;  
  }
};

let fileScanApi = async () => {
  try {
    const response = await api.get('/api/v1/files/scan');
    if(response.status == '200') {
      console.log(response.data);
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    if(err.response.status == '401') {
      router.push('/login');
      // console.log('누구냐!')
    }
    throw err;  
  }
};

let fileVtUploadApi = async (data) => {
  try {
    const response = await api.post('/api/v1/vt/upload', data);
    if(response.status == '200') {
      console.log(response.data);
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    if(err.response.status == '401') {
      router.push('/login');
      // console.log('누구냐!')
    }
    throw err;  
  }
};

let historyStatisticsApi = async () => {
  try {
    const response = await api.get('/api/v1/files/history/statistics');
    if(response.status == '200') {
      console.log(response.data);
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    if(err.response.status == '401') {
      router.push('/login');
      // console.log('누구냐!')
    }
    throw err;  
  }
};

let historyDetailsApi = async () => {
  try {
    const response = await api.get('/api/v1/files/history');
    if(response.status == '200') {
      console.log(response.data);
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    if(err.response.status == '401') {
      router.push('/login');
      // console.log('누구냐!')
    }
    throw err;  
  }
};

let historyVisualizatuonApi = async (data) => {
  try {
    const response = await api.post('/api/v1/files/history/visualize', data);
    if(response.status == '200') {
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    if(err.response.status == '401') {
      router.push('/login');
      // console.log('누구냐!')
    }
    throw err;  
  }
};

export { totalFileInfoApi, fileScanApi, fileVtUploadApi, historyStatisticsApi, historyDetailsApi, historyVisualizatuonApi };