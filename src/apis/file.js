import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

let totalFileInfoApi = async (data) => {
  try {
    const response = await axios.post('/api/v1/files/board', data);
    if(response.status == '200') {
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
};

export { totalFileInfoApi };