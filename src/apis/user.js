import router from '@/router/index.js';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true
})

let userStatisticsApi = async () => {
  try {
    // const response = await api.get('/api/v1/files/history/statistics', );
    // if(response.data.status == 'error') {
    //   router.push('/login');
    //   return;
    // }
    // if(response.status == '200') {
    //   console.log(response.data);
    //   return response.data;
    // }
    const response = [2024, 2, 11, 22];
    return response;
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
};

let dormantRadioApi = async () => {
  try {
    // const response = await api.get('/api/v1/files/history/statistics', );
    // if(response.data.status == 'error') {
    //   router.push('/login');
    //   return;
    // }
    // if(response.status == '200') {
    //   console.log(response.data);
    //   return response.data;
    // }
    const response = {
      undormant: 22,
      dormanting: 122,
      dormant: 11 
    };
    return response;
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
};

let topSensitiveUserApi = async () => {
  try {
    // const response = await api.get('/api/v1/files/history/statistics', );
    // if(response.data.status == 'error') {
    //   router.push('/login');
    //   return;
    // }
    // if(response.status == '200') {
    //   console.log(response.data);
    //   return response.data;
    // }
    const response = {
      "status": "success",
      "topSensitive": [
        {
          "user": '유저 1',
          "sensitive": 20
        },
        {
          "user": '유저 2',
          "sensitive": 18
        },
        {
          "user": '유저 3',
          "sensitive": 15
        },
        {
          "user": '유저 4',
          "sensitive": 12
        },
        {
          "user": '유저 5',
          "sensitive": 8
        },
      ]
    };
    return response;
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
};

let topMalwareUserApi = async () => {
  try {
    // const response = await api.get('/api/v1/files/history/statistics', );
    // if(response.data.status == 'error') {
    //   router.push('/login');
    //   return;
    // }
    // if(response.status == '200') {
    //   console.log(response.data);
    //   return response.data;
    // }
    const response = {
      "status": "success",
      "topMalware": [
        {
          "user": '유저 1',
          "malware": 20
        },
        {
          "user": '유저 2',
          "malware": 18
        },
        {
          "user": '유저 3',
          "malware": 15
        },
        {
          "user": '유저 4',
          "malware": 12
        },
        {
          "user": '유저 5',
          "malware": 8
        },
      ]
    };;
    return response;
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
};

let userDetailsApi = async () => {
  try {
    // const response = await api.get('/api/v1/files/history/statistics', );
    // if(response.data.status == 'error') {
    //   router.push('/login');
    //   return;
    // }
    // if(response.status == '200') {
    //   console.log(response.data);
    //   return response.data;
    // }
    const response = [
      {
        id: 1,
        saas: 'slack',
        user: 'JohnDoe',
        account: 'johndoe@example.com',
        totalUpload: 45,
        sensitive: 3,
        malware: 1,
        lastDate: '2024-08-15T09:23:11'
      },
      {
        id: 2,
        saas: 'o365',
        user: 'JaneSmith',
        account: 'janesmith@company.com',
        totalUpload: 32,
        sensitive: 1,
        malware: 0,
        lastDate: '2024-08-18T14:45:22'
      },
      {
        id: 3,
        saas: 'googledrive',
        user: 'MikeJohnson',
        account: 'mike.johnson@gmail.com',
        totalUpload: 78,
        sensitive: 5,
        malware: 2,
        lastDate: '2024-08-20T11:12:33'
      },
      {
        id: 4,
        saas: 'slack',
        user: 'EmilyBrown',
        account: 'emily.brown@example.com',
        totalUpload: 56,
        sensitive: 2,
        malware: 1,
        lastDate: '2024-08-22T16:30:44'
      },
      {
        id: 5,
        saas: 'o365',
        user: 'DavidLee',
        account: 'david.lee@company.com',
        totalUpload: 41,
        sensitive: 4,
        malware: 0,
        lastDate: '2024-08-25T10:05:55'
      },
      {
        id: 6,
        saas: 'googledrive',
        user: 'SarahWilson',
        account: 'sarah.wilson@gmail.com',
        totalUpload: 63,
        sensitive: 3,
        malware: 1,
        lastDate: '2024-08-27T13:40:06'
      },
      {
        id: 7,
        saas: 'slack',
        user: 'ChrisTaylor',
        account: 'chris.taylor@example.com',
        totalUpload: 29,
        sensitive: 1,
        malware: 0,
        lastDate: '2024-08-29T08:15:17'
      },
      {
        id: 8,
        saas: 'o365',
        user: 'LisaAnderson',
        account: 'lisa.anderson@company.com',
        totalUpload: 52,
        sensitive: 2,
        malware: 1,
        lastDate: '2024-09-01T15:50:28'
      },
      {
        id: 9,
        saas: 'googledrive',
        user: 'KevinMartinez',
        account: 'kevin.martinez@gmail.com',
        totalUpload: 87,
        sensitive: 6,
        malware: 2,
        lastDate: '2024-09-03T12:25:39'
      },
      {
        id: 10,
        saas: 'slack',
        user: 'AmyGarcia',
        account: 'amy.garcia@example.com',
        totalUpload: 38,
        sensitive: 2,
        malware: 0,
        lastDate: '2024-09-05T17:00:50'
      },
      {
        id: 11,
        saas: 'o365',
        user: 'RyanClark',
        account: 'ryan.clark@company.com',
        totalUpload: 71,
        sensitive: 4,
        malware: 1,
        lastDate: '2024-09-07T09:35:01'
      },
      {
        id: 12,
        saas: 'googledrive',
        user: 'OliviaRodriguez',
        account: 'olivia.rodriguez@gmail.com',
        totalUpload: 49,
        sensitive: 3,
        malware: 1,
        lastDate: '2024-09-09T14:10:12'
      },
      {
        id: 13,
        saas: 'slack',
        user: 'DanielLewis',
        account: 'daniel.lewis@example.com',
        totalUpload: 33,
        sensitive: 1,
        malware: 0,
        lastDate: '2024-09-11T11:45:23'
      },
      {
        id: 14,
        saas: 'o365',
        user: 'SophiaLee',
        account: 'sophia.lee@company.com',
        totalUpload: 59,
        sensitive: 3,
        malware: 1,
        lastDate: '2024-09-13T16:20:34'
      },
      {
        id: 15,
        saas: 'googledrive',
        user: 'WilliamWalker',
        account: 'william.walker@gmail.com',
        totalUpload: 82,
        sensitive: 5,
        malware: 2,
        lastDate: '2024-09-15T10:55:45'
      },
      {
        id: 16,
        saas: 'slack',
        user: 'EmmaHall',
        account: 'emma.hall@example.com',
        totalUpload: 43,
        sensitive: 2,
        malware: 0,
        lastDate: '2024-09-17T13:30:56'
      },
      {
        id: 17,
        saas: 'o365',
        user: 'JamesWhite',
        account: 'james.white@company.com',
        totalUpload: 67,
        sensitive: 4,
        malware: 1,
        lastDate: '2024-09-19T08:05:07'
      },
      {
        id: 18,
        saas: 'googledrive',
        user: 'AvaThompson',
        account: 'ava.thompson@gmail.com',
        totalUpload: 55,
        sensitive: 3,
        malware: 1,
        lastDate: '2024-09-21T15:40:18'
      },
      {
        id: 19,
        saas: 'slack',
        user: 'AlexanderScott',
        account: 'alexander.scott@example.com',
        totalUpload: 36,
        sensitive: 2,
        malware: 0,
        lastDate: '2024-09-23T12:15:29'
      },
      {
        id: 20,
        saas: 'o365',
        user: 'MiaNguyen',
        account: 'mia.nguyen@company.com',
        totalUpload: 74,
        sensitive: 5,
        malware: 2,
        lastDate: '2024-09-25T16:50:40'
      },
      {
        id: 21,
        saas: 'googledrive',
        user: 'EthanBrown',
        account: 'ethan.brown@gmail.com',
        totalUpload: 51,
        sensitive: 3,
        malware: 1,
        lastDate: '2024-09-27T09:25:51'
      },
      {
        id: 22,
        saas: 'slack',
        user: 'IsabellaKim',
        account: 'isabella.kim@example.com',
        totalUpload: 39,
        sensitive: 2,
        malware: 0,
        lastDate: '2024-09-29T14:00:02'
      },
      {
        id: 23,
        saas: 'o365',
        user: 'BenjaminChen',
        account: 'benjamin.chen@company.com',
        totalUpload: 68,
        sensitive: 4,
        malware: 1,
        lastDate: '2024-10-01T11:35:13'
      },
      {
        id: 24,
        saas: 'googledrive',
        user: 'CharlotteDavis',
        account: 'charlotte.davis@gmail.com',
        totalUpload: 85,
        sensitive: 6,
        malware: 2,
        lastDate: '2024-10-03T16:10:24'
      },
      {
        id: 25,
        saas: 'slack',
        user: 'LucasMoore',
        account: 'lucas.moore@example.com',
        totalUpload: 42,
        sensitive: 2,
        malware: 1,
        lastDate: '2024-10-05T10:45:35'
      },
      {
        id: 26,
        saas: 'o365',
        user: 'HarperWilson',
        account: 'harper.wilson@company.com',
        totalUpload: 57,
        sensitive: 3,
        malware: 0,
        lastDate: '2024-10-07T13:20:46'
      },
      {
        id: 27,
        saas: 'googledrive',
        user: 'JacksonLee',
        account: 'jackson.lee@gmail.com',
        totalUpload: 79,
        sensitive: 5,
        malware: 2,
        lastDate: '2024-10-09T08:55:57'
      },
      {
        id: 28,
        saas: 'slack',
        user: 'ScarlettTaylor',
        account: 'scarlett.taylor@example.com',
        totalUpload: 34,
        sensitive: 1,
        malware: 0,
        lastDate: '2024-10-11T15:30:08'
      },
      {
        id: 29,
        saas: 'o365',
        user: 'LoganGarcia',
        account: 'logan.garcia@company.com',
        totalUpload: 61,
        sensitive: 4,
        malware: 1,
        lastDate: '2024-10-13T12:05:19'
      },
      {
        id: 30,
        saas: 'googledrive',
        user: 'GraceMartin',
        account: 'grace.martin@gmail.com',
        totalUpload: 76,
        sensitive: 5,
        malware: 2,
        lastDate: '2024-10-15T16:40:30'
      }
    ];
    return response;
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
};

export { userStatisticsApi, dormantRadioApi, topSensitiveUserApi, topMalwareUserApi, userDetailsApi };