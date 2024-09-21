import router from '@/router/index.js';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true
})

let totalFileInfoApi = async () => {
  try {
    const response = await api.get('/api/v1/files/board');
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

let fileScanApi = async () => {
  try {
    const response = await api.get('/api/v1/files/scan');
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

let fileVtUploadApi = async (data) => {
  try {
    const response = await api.post('/api/v1/vt/upload', data);
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

let historyStatisticsApi = async () => {
  try {
    const response = await api.get('/api/v1/files/history/statistics', );
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

let historyDetailsApi = async () => {
  try {
    const response = await api.get('/api/v1/files/history');
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

let historyVisualizatuonApi = async (data) => {
  try {
    const response = await api.post('/api/v1/files/history/visualize', data);
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

export { totalFileInfoApi, fileScanApi, fileVtUploadApi, historyStatisticsApi, historyDetailsApi, historyVisualizatuonApi };