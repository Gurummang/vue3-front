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
    const response = await axios.get('/api/v1/files/scan', data);
    if(response.status == '200') {
      return response.data;
    }
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
};

let historyStatisticsApi = async (data) => {
  try {
    // const response = await axios.post('/api/v1/files/board', data);
    // if(response.status == '200') {
    //   return response.data;
    // }
    const response = [20, 5, 10];
    return response;
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
};

let historyTrendsApi = async (data) => {
  try {
    // const response = await axios.post('/api/v1/files/board', data);
    // if(response.status == '200') {
    //   return response.data;
    // }
    const response = [
      {
        "date": "2024-08-01",
        "upload": 7,
        "delete": 2,
        "edit": 9
      },
      {
        "date": "2024-08-02",
        "upload": 5,
        "delete": 1,
        "edit": 8
      },
      {
        "date": "2024-08-03",
        "upload": 9,
        "delete": 3,
        "edit": 6
      },
      {
        "date": "2024-08-04",
        "upload": 2,
        "delete": 4,
        "edit": 9
      },
      {
        "date": "2024-08-05",
        "upload": 6,
        "delete": 0,
        "edit": 1
      },
      {
        "date": "2024-08-06",
        "upload": 3,
        "delete": 2,
        "edit": 2
      },
      {
        "date": "2024-08-07",
        "upload": 8,
        "delete": 4,
        "edit": 5
      },
      {
        "date": "2024-08-08",
        "upload": 1,
        "delete": 1,
        "edit": 7
      },
      {
        "date": "2024-08-09",
        "upload": 9,
        "delete": 2,
        "edit": 3
      },
      {
        "date": "2024-08-10",
        "upload": 5,
        "delete": 4,
        "edit": 8
      },
      {
        "date": "2024-08-11",
        "upload": 7,
        "delete": 1,
        "edit": 9
      },
      {
        "date": "2024-08-12",
        "upload": 2,
        "delete": 3,
        "edit": 6
      },
      {
        "date": "2024-08-13",
        "upload": 19,
        "delete": 0,
        "edit": 2
      },
      {
        "date": "2024-08-14",
        "upload": 11,
        "delete": 2,
        "edit": 5
      },
      {
        "date": "2024-08-15",
        "upload": 18,
        "delete": 3,
        "edit": 9
      },
      {
        "date": "2024-08-16",
        "upload": 6,
        "delete": 4,
        "edit": 1
      },
      {
        "date": "2024-08-17",
        "upload": 13,
        "delete": 2,
        "edit": 7
      },
      {
        "date": "2024-08-18",
        "upload": 9,
        "delete": 1,
        "edit": 3
      },
      {
        "date": "2024-08-19",
        "upload": 15,
        "delete": 3,
        "edit": 9
      },
      {
        "date": "2024-08-20",
        "upload": 7,
        "delete": 1,
        "edit": 6
      },
      {
        "date": "2024-08-21",
        "upload": 12,
        "delete": 4,
        "edit": 2
      },
      {
        "date": "2024-08-22",
        "upload": 8,
        "delete": 0,
        "edit": 8
      },
      {
        "date": "2024-08-23",
        "upload": 1,
        "delete": 2,
        "edit": 5
      },
      {
        "date": "2024-08-24",
        "upload": 20,
        "delete": 3,
        "edit": 1
      },
      {
        "date": "2024-08-25",
        "upload": 16,
        "delete": 4,
        "edit": 9
      },
      {
        "date": "2024-08-26",
        "upload": 3,
        "delete": 2,
        "edit": 7
      },
      {
        "date": "2024-08-27",
        "upload": 19,
        "delete": 1,
        "edit": 3
      },
      {
        "date": "2024-08-28",
        "upload": 5,
        "delete": 3,
        "edit": 9
      },
      {
        "date": "2024-08-29",
        "upload": 17,
        "delete": 1,
        "edit": 6
      },
      {
        "date": "2024-08-30",
        "upload": 2,
        "delete": 4,
        "edit": 2
      },
      {
        "date": "2024-08-31",
        "upload": 18,
        "delete": 0,
        "edit": 8
      }
    ];
    return response;
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

export { totalFileInfoApi, historyStatisticsApi, historyTrendsApi, historyDetailsApi };