import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

let saasScoreApi = async (saas, data) => {
  try {
    // const response = await axios.post('/api/v1/board/' + saas +'/files/count', data);
    // if(response.status == '200') {
    //   return response.data;
    // }
    const response = 80;
    return response;
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
};

let fileStatisticsApi = async (saas, data) => {
  try {
    const response = await axios.post('/api/v1/board/' + saas +'/files/count', data);
    if(response.status == '200') {
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
};

let fileSizeApi = async (saas, data) => {
  try {
    const response = await axios.post('/api/v1/board/' + saas +'/files/size', data);
    if(response.status == '200') {
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
}

let fileRecentApi = async (saas, data) => {
  try {
    const response = await axios.post('/api/v1/board/' + saas +'/files/recent', data);
    if(response.status == '200') {
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
}

let usersTop5Api = async (saas, data) => {
  try {
    const response = await axios.post('/api/v1/board/' + saas +'/user-ranking', data);
    if(response.status == '200') {
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
};

export { saasScoreApi, fileStatisticsApi, fileSizeApi, fileRecentApi, usersTop5Api };