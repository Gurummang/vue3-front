import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

let gasbLoginApi = async (data) => {
  try {
    const response = await axios.post('/api/v1/auth/login', data);
    if(response.status == '200') {
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
};

let gasbSignupApi = async (data) => {
  try {
    const response = await axios.post('/api/v1/auth/register', data);
    if(response.status == '200') {
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
}

export { gasbLoginApi, gasbSignupApi };