import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

let getFileStatisticsApi = async (saas, data) => {
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

let getFileSizeApi = async (saas, data) => {
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

let getFileRecentApi = async (saas, data) => {
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

export { getFileStatisticsApi, getFileSizeApi, getFileRecentApi };