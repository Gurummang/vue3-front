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
    // const response = [
    //   {
    //     "id": 1,
    //     "saas": "google drive",
    //     "activityType": "upload",
    //     "fileName": "aaabbcccc.pdf",
    //     "lastActionTime": "2024.00.00 / 00:00:00",
    //     "historyTime": "2024.00.00 / 00:00:00",
    //     "account": "gurummang@gurummang.com"
    //   },
    //   {
    //     "id": 2,
    //     "saas": "slack",
    //     "activityType": "edit",
    //     "fileName": "aaabbcccc.pdf",
    //     "lastActionTime": "2024.00.00 / 00:00:00",
    //     "historyTime": "2024.00.00 / 00:00:00",
    //     "account": "gurummang@gurummang.com"
    //   },
    //   {
    //     "id": 3,
    //     "saas": "slack",
    //     "activityType": "upload",
    //     "fileName": "aaabbcccc.pdf",
    //     "lastActionTime": "2024.00.00 / 00:00:00",
    //     "historyTime": "2024.00.00 / 00:00:00",
    //     "account": "gurummang@gurummang.com"
    //   },
    //   {
    //     "id": 4,
    //     "saas": "google drive",
    //     "activityType": "upload",
    //     "fileName": "aaabbcccc.pdf",
    //     "lastActionTime": "2024.00.00 / 00:00:00",
    //     "historyTime": "2024.00.00 / 00:00:00",
    //     "account": "gurummang@gurummang.com"
    //   },
    //   {
    //     "id": 5,
    //     "saas": "slack",
    //     "activityType": "delete",
    //     "fileName": "aaabbcccc.pdf",
    //     "lastActionTime": "2024.00.00 / 00:00:00",
    //     "historyTime": "2024.00.00 / 00:00:00",
    //     "account": "gurummang@gurummang.com"
    //   },
    //   {
    //     "id": 6,
    //     "saas": "slack",
    //     "activityType": "edit",
    //     "fileName": "aaabbcccc.pdf",
    //     "lastActionTime": "2024.00.00 / 00:00:00",
    //     "historyTime": "2024.00.00 / 00:00:00",
    //     "account": "gurummang@gurummang.com"
    //   },
    //   {
    //     "id": 7,
    //     "saas": "slack",
    //     "activityType": "upload",
    //     "fileName": "aaabbcccc.pdf",
    //     "lastActionTime": "2024.00.00 / 00:00:00",
    //     "historyTime": "2024.00.00 / 00:00:00",
    //     "account": "gurummang@gurummang.com"
    //   },
    //   {
    //     "id": 8,
    //     "saas": "google drive",
    //     "activityType": "upload",
    //     "fileName": "aaabbcccc.pdf",
    //     "lastActionTime": "2024.00.00 / 00:00:00",
    //     "historyTime": "2024.00.00 / 00:00:00",
    //     "account": "gurummang@gurummang.com"
    //   },
    //   {
    //     "id": 9,
    //     "saas": "google drive",
    //     "activityType": "delete",
    //     "fileName": "aaabbcccc.pdf",
    //     "lastActionTime": "2024.00.00 / 00:00:00",
    //     "historyTime": "2024.00.00 / 00:00:00",
    //     "account": "gurummang@gurummang.com"
    //   },
    //   {
    //     "id": 10,
    //     "saas": "google drive",
    //     "activityType": "upload",
    //     "fileName": "aaabbcccc.pdf",
    //     "lastActionTime": "2024.00.00 / 00:00:00",
    //     "historyTime": "2024.00.00 / 00:00:00",
    //     "account": "gurummang@gurummang.com"
    //   }
    // ];
    const response = {
      "status": "success",
      "data": [
          {
              "totalEvent": 20,
              "fileHistoryDto": [
                  {
                      "eventId": 3,
                      "saas": "slack",
                      "eventType": "file_uploaded",
                      "fileName": "cve-2018-0798.pdf",
                      "saasFileId": "F078MT457SQ",
                      "uploadTs": "2024-06-18T05:30:38",
                      "eventTs": "2024-06-18T05:30:38",
                      "email": "hsp003636@gmail.com",
                      "uploadChannel": null
                  },
                  {
                      "eventId": 2,
                      "saas": "slack",
                      "eventType": "file_uploaded",
                      "fileName": "DLL 다운로드.pdf",
                      "saasFileId": "F078GG9D7UM",
                      "uploadTs": "2024-06-18T05:33:11",
                      "eventTs": "2024-06-18T05:33:11",
                      "email": "hsp003636@gmail.com",
                      "uploadChannel": null
                  },
                  {
                      "eventId": 1,
                      "saas": "slack",
                      "eventType": "file_uploaded",
                      "fileName": "requirements.txt",
                      "saasFileId": "F078MV1L5HS",
                      "uploadTs": "2024-06-18T05:51:37",
                      "eventTs": "2024-06-18T05:51:37",
                      "email": "hsp003636@gmail.com",
                      "uploadChannel": null
                  },
                  {
                      "eventId": 4,
                      "saas": "slack",
                      "eventType": "file_uploaded",
                      "fileName": "Injector.pdf",
                      "saasFileId": "F078KQN3X26",
                      "uploadTs": "2024-06-18T07:13:08",
                      "eventTs": "2024-06-18T07:13:08",
                      "email": "hsp003636@gmail.com",
                      "uploadChannel": null
                  },
                  {
                      "eventId": 5,
                      "saas": "slack",
                      "eventType": "file_uploaded",
                      "fileName": "sdflasdjfsakdf.txt",
                      "saasFileId": "F078DB5AUF8",
                      "uploadTs": "2024-06-18T07:49:18",
                      "eventTs": "2024-06-18T07:49:18",
                      "email": "hsp003636@gmail.com",
                      "uploadChannel": null
                  },
                  {
                      "eventId": 6,
                      "saas": "slack",
                      "eventType": "file_uploaded",
                      "fileName": "하이루.txt",
                      "saasFileId": "F07EFCHQUUT",
                      "uploadTs": "2024-07-29T06:33:41",
                      "eventTs": "2024-07-29T06:33:41",
                      "email": "goei4559@gmail.com",
                      "uploadChannel": "SAMSUNG/slack/psh_slacktest/개발/여신호_9698"
                  },
                  {
                      "eventId": 8,
                      "saas": "slack",
                      "eventType": "file_uploaded",
                      "fileName": "test.docx",
                      "saasFileId": "F07E147HUJ3",
                      "uploadTs": "2024-07-29T07:13:50",
                      "eventTs": "2024-07-29T07:13:50",
                      "email": "goei4559@gmail.com",
                      "uploadChannel": "SAMSUNG/slack/psh_slacktest/개발/여신호_9698"
                  },
                  {
                      "eventId": 7,
                      "saas": "slack",
                      "eventType": "file_uploaded",
                      "fileName": "123123123123123123fsdfgdsfg.png",
                      "saasFileId": "F07EMFUPV5Z",
                      "uploadTs": "2024-07-30T05:23:37",
                      "eventTs": "2024-07-30T05:23:37",
                      "email": "hsp003636@gmail.com",
                      "uploadChannel": "SAMSUNG/slack/psh_slacktest/소셜/hsp003636"
                  },
                  {
                      "eventId": 9,
                      "saas": "slack",
                      "eventType": "file_uploaded",
                      "fileName": "XENICS STORMX VM3.lnk",
                      "saasFileId": "F07FBFMM3S4",
                      "uploadTs": "2024-07-30T09:28:53",
                      "eventTs": "2024-07-30T09:28:53",
                      "email": "hsp003636@gmail.com",
                      "uploadChannel": "SAMSUNG/slack/psh_slacktest/소셜/hsp003636"
                  },
                  {
                      "eventId": 10,
                      "saas": "slack",
                      "eventType": "file_uploaded",
                      "fileName": "다운로드.png",
                      "saasFileId": "F07FBFRET2L",
                      "uploadTs": "2024-07-30T09:29:26",
                      "eventTs": "2024-07-30T09:29:26",
                      "email": "hsp003636@gmail.com",
                      "uploadChannel": "SAMSUNG/slack/psh_slacktest/소셜/hsp003636"
                  },
                  {
                      "eventId": 11,
                      "saas": "slack",
                      "eventType": "file_uploaded",
                      "fileName": "1차-ppt.pptx",
                      "saasFileId": "F07FA3KV9JQ",
                      "uploadTs": "2024-08-02T07:36:52",
                      "eventTs": "2024-08-02T07:36:52",
                      "email": "hsp003636@gmail.com",
                      "uploadChannel": null
                  },
                  {
                      "eventId": 12,
                      "saas": "slack",
                      "eventType": "file_changed",
                      "fileName": "하이루.txt",
                      "saasFileId": "F07EFCHQUUT",
                      "uploadTs": "2024-07-29T06:33:41",
                      "eventTs": "2024-08-03T07:36:52",
                      "email": "goei4559@gmail.com",
                      "uploadChannel": "SAMSUNG/slack/psh_slacktest/개발/여신호_9698"
                  },
                  {
                      "eventId": 13,
                      "saas": "slack",
                      "eventType": "file_deleted",
                      "fileName": "하이루.txt",
                      "saasFileId": "F07EFCHQUUT",
                      "uploadTs": "2024-07-29T06:33:41",
                      "eventTs": "2024-08-04T07:36:52",
                      "email": "goei4559@gmail.com",
                      "uploadChannel": "SAMSUNG/slack/psh_slacktest/개발/여신호_9698"
                  },
                  {
                      "eventId": 14,
                      "saas": "slack",
                      "eventType": "file_uploaded",
                      "fileName": "호잇.txt",
                      "saasFileId": "F08FIEKDLSSN",
                      "uploadTs": "2024-08-04T09:39:52",
                      "eventTs": "2024-08-04T09:39:52",
                      "email": "goei4559@gmail.com",
                      "uploadChannel": "SAMSUNG/slack/psh_slacktest/개발/여신호_9698"
                  },
                  {
                      "eventId": 15,
                      "saas": "slack",
                      "eventType": "file_deleted",
                      "fileName": "호잇.txt",
                      "saasFileId": "F08FIEKDLSSN",
                      "uploadTs": "2024-08-04T09:39:52",
                      "eventTs": "2024-08-04T10:39:52",
                      "email": "goei4559@gmail.com",
                      "uploadChannel": "SAMSUNG/slack/psh_slacktest/개발/여신호_9698"
                  },
                  {
                      "eventId": 16,
                      "saas": "slack",
                      "eventType": "file_uploaded",
                      "fileName": "하이루.txt",
                      "saasFileId": "F09FIKDJFGSA",
                      "uploadTs": "2024-08-05T10:39:52",
                      "eventTs": "2024-08-05T10:39:52",
                      "email": "goei4559@gmail.com",
                      "uploadChannel": "SAMSUNG/slack/psh_slacktest/개발/여신호_9698"
                  },
                  {
                      "eventId": 17,
                      "saas": "slack",
                      "eventType": "file_changed",
                      "fileName": "하이루.txt",
                      "saasFileId": "F09FIKDJFGSA",
                      "uploadTs": "2024-08-05T10:39:52",
                      "eventTs": "2024-08-05T10:40:52",
                      "email": "goei4559@gmail.com",
                      "uploadChannel": "SAMSUNG/slack/psh_slacktest/개발/여신호_9698"
                  },
                  {
                      "eventId": 18,
                      "saas": "slack",
                      "eventType": "file_deleted",
                      "fileName": "하이루.txt",
                      "saasFileId": "F09FIKDJFGSA",
                      "uploadTs": "2024-08-05T10:39:52",
                      "eventTs": "2024-08-06T10:40:52",
                      "email": "goei4559@gmail.com",
                      "uploadChannel": "SAMSUNG/slack/psh_slacktest/개발/여신호_9698"
                  },
                  {
                      "eventId": 19,
                      "saas": "slack",
                      "eventType": "file_uploaded",
                      "fileName": "호잇.txt",
                      "saasFileId": "F19FIKDQJWK",
                      "uploadTs": "2024-08-06T10:40:53",
                      "eventTs": "2024-08-06T10:40:53",
                      "email": "goei4559@gmail.com",
                      "uploadChannel": "SAMSUNG/slack/psh_slacktest/개발/여신호_9698"
                  },
                  {
                      "eventId": 20,
                      "saas": "slack",
                      "eventType": "file_uploaded",
                      "fileName": "호잇.txt",
                      "saasFileId": "F19FIKSKDLFJ",
                      "uploadTs": "2024-08-07T10:40:53",
                      "eventTs": "2024-08-07T10:40:53",
                      "email": "goei4559@gmail.com",
                      "uploadChannel": "SAMSUNG/slack/psh_slacktest/개발/여신호_9698"
                  }
              ]
          }
      ]
  };
    return response;
  } catch (err) {
    console.error('Error:', err);
    throw err;  
  }
};

export { totalFileInfoApi, fileScanApi, fileVtUploadApi, historyStatisticsApi, historyDetailsApi };