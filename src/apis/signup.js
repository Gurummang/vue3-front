import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

let gasbLoginApi = async (data) => {
  try {
    const response = await axios.post('/api/v1/auth/login', data, { withCredentials: true });
    if (response.status === 200 && response.data.status === 'success') {
      return response.data;
    }
    return false;
  } catch (err) {
    return false;
  }
}

let gasbJwtValidApi = async () => {
  try {
    const response = await axios.get('/api/v1/org-saas/list', { withCredentials: true });
    if(response.status == '200') {
      return true
    }
    return false
  } catch (err) {
    throw err;  
  }
}

let gasbSignupApi = async (data) => {
  try {
    const response = await axios.post('/api/v1/auth/register', data);
    if (response.status === 200) {
      return response.data;
    } else {
      alert('회원가입에 실패했습니다.');
      return false;
    }
  } catch (err) {
    return false;
  }
}

let gasbLogoutApi = async () => {
  try {
    const response = await axios.get('/api/v1/auth/logout', { withCredentials: true });
    if (response.status === 200) {
      return true;
    } else {
      alert('로그아웃에 실패했습니다.');
      return false;
    }
  } catch (err) {
    return false;
  }
}

export { gasbLoginApi, gasbJwtValidApi, gasbSignupApi, gasbLogoutApi };