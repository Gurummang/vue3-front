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

let fileScanApi = async (data) => {
  try {
    const response = await axios.post('/api/v1/files/scan', data);
    if(response.status == '200') {
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
};

let fileVtUploadApi = async (data) => {
  try {
    const response = await axios.post('/api/v1/vt/upload', data);
    if(response.status == '200') {
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
};

// let historyStatisticsApi = async (data) => {
//   try {
//     // const response = await axios.post('/api/v1/files/board', data);
//     // if(response.status == '200') {
//     //   return response.data;
//     // }
//     const response = [20, 5, 10];
//     return response;
//   } catch (err) {
//     console.error('Error:', err);
//     throw err;  
//   }
// };

let historyStatisticsApi = async (data) => {
  try {
    const response = await axios.post('/api/v1/files/history/statistics', data);
    if(response.status == '200') {
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
};

let historyDetailsApi = async (data) => {
  try {
    // const response = await axios.post('/api/v1/files/board', data);
    // if(response.status == '200') {
    //   return response.data;
    // }
    const response = [
      {
        "id": 1,
        "saas": "google drive",
        "activityType": "upload",
        "fileName": "aaabbcccc.pdf",
        "lastActionTime": "2024.00.00 / 00:00:00",
        "historyTime": "2024.00.00 / 00:00:00",
        "account": "gurummang@gurummang.com"
      },
      {
        "id": 2,
        "saas": "slack",
        "activityType": "edit",
        "fileName": "aaabbcccc.pdf",
        "lastActionTime": "2024.00.00 / 00:00:00",
        "historyTime": "2024.00.00 / 00:00:00",
        "account": "gurummang@gurummang.com"
      },
      {
        "id": 3,
        "saas": "slack",
        "activityType": "upload",
        "fileName": "aaabbcccc.pdf",
        "lastActionTime": "2024.00.00 / 00:00:00",
        "historyTime": "2024.00.00 / 00:00:00",
        "account": "gurummang@gurummang.com"
      },
      {
        "id": 4,
        "saas": "google drive",
        "activityType": "upload",
        "fileName": "aaabbcccc.pdf",
        "lastActionTime": "2024.00.00 / 00:00:00",
        "historyTime": "2024.00.00 / 00:00:00",
        "account": "gurummang@gurummang.com"
      },
      {
        "id": 5,
        "saas": "slack",
        "activityType": "delete",
        "fileName": "aaabbcccc.pdf",
        "lastActionTime": "2024.00.00 / 00:00:00",
        "historyTime": "2024.00.00 / 00:00:00",
        "account": "gurummang@gurummang.com"
      },
      {
        "id": 6,
        "saas": "slack",
        "activityType": "edit",
        "fileName": "aaabbcccc.pdf",
        "lastActionTime": "2024.00.00 / 00:00:00",
        "historyTime": "2024.00.00 / 00:00:00",
        "account": "gurummang@gurummang.com"
      },
      {
        "id": 7,
        "saas": "slack",
        "activityType": "upload",
        "fileName": "aaabbcccc.pdf",
        "lastActionTime": "2024.00.00 / 00:00:00",
        "historyTime": "2024.00.00 / 00:00:00",
        "account": "gurummang@gurummang.com"
      },
      {
        "id": 8,
        "saas": "google drive",
        "activityType": "upload",
        "fileName": "aaabbcccc.pdf",
        "lastActionTime": "2024.00.00 / 00:00:00",
        "historyTime": "2024.00.00 / 00:00:00",
        "account": "gurummang@gurummang.com"
      },
      {
        "id": 9,
        "saas": "google drive",
        "activityType": "delete",
        "fileName": "aaabbcccc.pdf",
        "lastActionTime": "2024.00.00 / 00:00:00",
        "historyTime": "2024.00.00 / 00:00:00",
        "account": "gurummang@gurummang.com"
      },
      {
        "id": 10,
        "saas": "google drive",
        "activityType": "upload",
        "fileName": "aaabbcccc.pdf",
        "lastActionTime": "2024.00.00 / 00:00:00",
        "historyTime": "2024.00.00 / 00:00:00",
        "account": "gurummang@gurummang.com"
      }
    ];
    return response;
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
};

export { totalFileInfoApi, fileScanApi, fileVtUploadApi, historyStatisticsApi, historyDetailsApi };