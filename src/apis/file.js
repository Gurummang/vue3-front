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
          "date": "2024-07-16",
          "uploadCount": 0,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-07-17",
          "uploadCount": 0,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-07-18",
          "uploadCount": 0,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-07-19",
          "uploadCount": 0,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-07-20",
          "uploadCount": 0,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-07-21",
          "uploadCount": 0,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-07-22",
          "uploadCount": 0,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-07-23",
          "uploadCount": 0,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-07-24",
          "uploadCount": 0,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-07-25",
          "uploadCount": 0,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-07-26",
          "uploadCount": 0,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-07-27",
          "uploadCount": 0,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-07-28",
          "uploadCount": 0,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-07-29",
          "uploadCount": 2,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-07-30",
          "uploadCount": 3,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-07-31",
          "uploadCount": 0,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-08-01",
          "uploadCount": 0,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-08-02",
          "uploadCount": 1,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-08-03",
          "uploadCount": 0,
          "deletedCount": 0,
          "modifyCount": 1,
          "movedCount": 0
      },
      {
          "date": "2024-08-04",
          "uploadCount": 1,
          "deletedCount": 2,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-08-05",
          "uploadCount": 1,
          "deletedCount": 0,
          "modifyCount": 1,
          "movedCount": 0
      },
      {
          "date": "2024-08-06",
          "uploadCount": 1,
          "deletedCount": 1,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-08-07",
          "uploadCount": 1,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-08-08",
          "uploadCount": 0,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-08-09",
          "uploadCount": 0,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-08-10",
          "uploadCount": 0,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-08-11",
          "uploadCount": 0,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-08-12",
          "uploadCount": 0,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-08-13",
          "uploadCount": 0,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
      },
      {
          "date": "2024-08-14",
          "uploadCount": 0,
          "deletedCount": 0,
          "modifyCount": 0,
          "movedCount": 0
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

export { totalFileInfoApi, fileScanApi, fileVtUploadApi, historyStatisticsApi, historyTrendsApi, historyDetailsApi };