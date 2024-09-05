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
      console.log(response.data);
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
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
      console.log(response.data);
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
};

let topSensitiveUserApi = async () => {
  try {
    // const response = await api.get('/api/v1/files/history/statistics', );
    // if(response.data.status == 'error') {
    //   router.push('/login');
    //   return;
    // }
    // if(response.status == '200') {
    //   console.log(response.data);
    //   return response.data;
    // }
    const response = {
      "status": "success",
      "topSensitive": [
        {
          "user": '유저 1',
          "sensitive": 20
        },
        {
          "user": '유저 2',
          "sensitive": 18
        },
        {
          "user": '유저 3',
          "sensitive": 15
        },
        {
          "user": '유저 4',
          "sensitive": 12
        },
        {
          "user": '유저 5',
          "sensitive": 8
        },
      ]
    };
    return response;
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
};

let topMalwareUserApi = async () => {
  try {
    // const response = await api.get('/api/v1/files/history/statistics', );
    // if(response.data.status == 'error') {
    //   router.push('/login');
    //   return;
    // }
    // if(response.status == '200') {
    //   console.log(response.data);
    //   return response.data;
    // }
    const response = {
      "status": "success",
      "topMalware": [
        {
          "user": '유저 1',
          "malware": 20
        },
        {
          "user": '유저 2',
          "malware": 18
        },
        {
          "user": '유저 3',
          "malware": 15
        },
        {
          "user": '유저 4',
          "malware": 12
        },
        {
          "user": '유저 5',
          "malware": 8
        },
      ]
    };
    return response;
  } catch (err) {
    console.error('Error:', err);
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
      console.log(response.data);
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
};

export { userStatisticsApi, userChartInfoApi, userDetailsApi };