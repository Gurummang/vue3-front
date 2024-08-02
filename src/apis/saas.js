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
    // const response = await axios.post('/api/v1/board/' + saas +'/files/count', data);
    // if(response.status == '200') {
    //   return response.data;
    // }
    const response = [
      { name: 'aaaaa.txt', sensitive: 5, malware: 7, lastDate: '2024-00-00 00:00:00' },
      { name: '통신이 되는지 함수 불러오는지 확인.txt', sensitive: 4, malware: 2, lastDate: '2024-00-00 00:00:00' },
      { name: '2024-07 일부러 글자를 길게 합니다.txt', sensitive: 3, malware: 5, lastDate: '2024-00-00 00:00:00' },
      { name: 'aaaaa.txt', sensitive: 2, malware: 2, lastDate: '2024-00-00 00:00:00' },
      { name: 'aaaaa.txt', sensitive: 1, malware: 2, lastDate: '2024-00-00 00:00:00' }
    ];
    return response;
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
};

export { saasScoreApi, fileStatisticsApi, fileSizeApi, fileRecentApi, usersTop5Api };