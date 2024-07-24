import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const getWebhookApi = async (saasId) => {
  try {
    const response = await axios.get('/api/v1/org-saas/'+saasId+'/mkUrl');
    if(response.status == '200') {
      // console.log(await response.data.webhookUrl);
      return response.data.webhookUrl;
    }
  } catch (err) {
    console.error('Error:', err);
    throw err;  // 에러를 다시 throw하여 호출자가 처리할 수 있게 합니다.
  }
};

// {    // register
//     "orgId": 1,     // samsung
//     "saasId": 1,    // slack
//     "alias": "secrityScore null init test",
//     "adminEmail": "emailemail",
//     "apiToken": "hihi. It's init test",
//     "webhookUrl": "https://gurm.com/Slack-67b65f6d-d0c6-4925-92df-bd3d3324141f"

const connectSaasApi = async (info) => {
  try {
    const response = await axios.post('/api/v1/org-saas/register', info);
    if(response.status == '200') {
      console.log('registerSaasApi : ' + response);
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    throw err;  // 에러를 다시 throw하여 호출자가 처리할 수 있게 합니다.
  }
}

   // modify
  //     "configId": 4,
  //     "alias": "클라이언트 마음대로"
  //     "adminEmail": "바꾸고싶은대로",
  //     "apiToken": "틀리면 error 201",
  //     "webhookUrl": "https://gurm.com/Slack-67b65f6d-d0c6-4925-92df-bd3d3324141f"
  // }
  // {    // delete
  //     "configId": int
  // }

export { getWebhookApi, connectSaasApi };