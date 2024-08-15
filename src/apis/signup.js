import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

let gasbLoginApi = async (data) => {
  try {
    const response = await axios.post('/api/v1/auth/login', data, { withCredentials: true });
    console.log('첫 로그인 :', response);
    console.log(document.cookie);
    if (response.status === 200 && response.data.status === 'success') {
      console.log('정상 로그인 :', response.data);
      return response.data;
    }
    return false;
  } catch (err) {
    console.error('Error:', err);
    if (err.response) {
      // 서버가 응답을 반환한 경우 (예: 400, 401 등의 상태 코드)
      alert(err.response.data.message || '로그인에 실패했습니다.');
    } else if (err.request) {
      // 요청은 보냈지만 응답을 받지 못한 경우
      alert('서버와의 통신에 실패했습니다. 네트워크 연결을 확인해주세요.');
    } else {
      // 요청 설정 중에 문제가 발생한 경우
      alert('로그인 요청 중 오류가 발생했습니다.');
    }
    return false;
  }
};

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
    // console.error('Error:', err);
    if (err.response) {
      // 서버가 응답을 반환한 경우 (예: 400, 401 등의 상태 코드)
      alert(err.response.data.message || '회원가입에 실패했습니다.');
    } else if (err.request) {
      // 요청은 보냈지만 응답을 받지 못한 경우
      alert('서버와의 통신에 실패했습니다. 네트워크 연결을 확인해주세요.');
    } else {
      // 요청 설정 중에 문제가 발생한 경우
      alert('회원가입 요청 중 오류가 발생했습니다.');
    }
    return false;
  }
}

export { gasbLoginApi, gasbSignupApi };