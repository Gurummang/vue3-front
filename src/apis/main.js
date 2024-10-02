import router from '@/router/index.js'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true
})

let mainTotalApi = async () => {
  try {
  //   const response = {
  //     "status": "success",
  //     "data": {
  //         "saas": [
  //             {
  //                 "saas": "slack",
  //                 "alias": "fffffff",
  //                 "email": "sasd@123123.vv"
  //             },
  //             {
  //                 "saas": "o365",
  //                 "alias": "M365_Test",
  //                 "email": "lis@groommang.onmicrosoft.com"
  //             }
  //         ],
  //         "totalSaaS": 2,
  //         "totalAlert": 0,
  //         "totalDlp": 4,
  //         "totalUser": 11,
  //         "totalFile": 53,
  //         "dailyFileCountDifference": 1,
  //         "totalFileSize": 99110772,
  //         "dailyFileSizeDifference": 11910,
  //         "fileSizeBySaaS": [
  //             {
  //                 "saas": "slack",
  //                 "size": 98913133,
  //                 "dailyDifference": 0
  //             },
  //             {
  //                 "saas": "o365",
  //                 "size": 197639,
  //                 "dailyDifference": 11910
  //             }
  //         ],
  //         "fileUploadBySaaS": [
  //             {
  //                 "saas": "slack",
  //                 "upload": 47,
  //                 "dailyDifference": 0
  //             },
  //             {
  //                 "saas": "o365",
  //                 "upload": 6,
  //                 "dailyDifference": 1
  //             }
  //         ]
  //     }
  // }
  // return response
    const response = await api.get('/api/v1/main/total');
    if(response.data.status == 'error' && response.data.message.includes("Invalid JWT")) {
        router.push('/');
        return;
    }
    if(response.status == '200') {
      return response.data;
    }
  } catch (err) {
    throw err;  
  }
}

let mainStatisticsApi = async () => {
  try {
  //   const response = {
  //     "status": "success",
  //     "data": {
  //         "fileScanInToday": [
  //             {
  //                 "saas": "o365",
  //                 "fileName": "image (2).png",
  //                 "suspicious": 1,
  //                 "dlp": 1,
  //                 "vt": -1,
  //                 "creator": "이 인석",
  //                 "eventTs": "2024-10-02T08:13:46"
  //             }
  //         ],
  //         "fileAnalysis": {
  //             "totalCount": 53,
  //             "suspiciousAnalysis": 43,
  //             "dlpAnalysis": 34,
  //             "vtAnalysis": 24
  //         },
  //         "fileHistoryInfo": [
  //             {
  //                 "saas": "slack",
  //                 "upload": 73,
  //                 "change": 9,
  //                 "delete": 25,
  //                 "lastActivity": "2024-10-02"
  //             },
  //             {
  //                 "saas": "o365",
  //                 "upload": 6,
  //                 "change": 0,
  //                 "delete": 0,
  //                 "lastActivity": "2024-10-02"
  //             }
  //         ],
  //         "fileHistoryStatistics": [
  //             {
  //                 "month": "2024-10",
  //                 "total": 5
  //             },
  //             {
  //                 "month": "2024-09",
  //                 "total": 54
  //             },
  //             {
  //                 "month": "2024-08",
  //                 "total": 47
  //             },
  //             {
  //                 "month": "2024-07",
  //                 "total": 3
  //             },
  //             {
  //                 "month": "2024-06",
  //                 "total": 4
  //             },
  //             {
  //                 "month": "2024-05",
  //                 "total": 0
  //             },
  //             {
  //                 "month": "2024-04",
  //                 "total": 0
  //             },
  //             {
  //                 "month": "2024-03",
  //                 "total": 0
  //             },
  //             {
  //                 "month": "2024-02",
  //                 "total": 0
  //             },
  //             {
  //                 "month": "2024-01",
  //                 "total": 0
  //             },
  //             {
  //                 "month": "2023-12",
  //                 "total": 0
  //             },
  //             {
  //                 "month": "2023-11",
  //                 "total": 0
  //             }
  //         ]
  //     }
  // }
  //   return response
    const response = await api.get('/api/v1/main/statistics');
    if(response.data.status == 'error' && response.data.message.includes("Invalid JWT")) {
      router.push('/');
      return;
    }
    if(response.status == '200') {
      return response.data;
    }
  } catch (err) {
    throw err;  
  }
}

let mainDlpApi = async () => {
  try {
    const response = await api.get('/api/v1/main/dlp');
    if(response.data.status == 'error' && response.data.message.includes("Invalid JWT")) {
      router.push('/');
      return;
    }
    if(response.status == '200') {
      return response.data;
    }
  } catch (err) {
    throw err;  
  }
}

export { mainTotalApi, mainStatisticsApi, mainDlpApi };