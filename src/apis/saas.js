import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

let getFileStatistics = async (saas, data) => {
  try {
    const response = await axios.post('/api/v1/board/' + saas +'/files/count', data);
    // console.log(response.data);
    if(response.status == '200') {
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
};

let connectSaasApi = async (data) => {
  try {
    const response = await axios.post('/api/v1/org-saas/register', data);
    if(response.status == '200') {
      console.log('connectSaasApi : ' + response);
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    throw err;  // 에러를 다시 throw하여 호출자가 처리할 수 있게 합니다.
  }
}

export { getFileStatistics };