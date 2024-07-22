import axios from 'axios';

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

export { getWebhookApi };