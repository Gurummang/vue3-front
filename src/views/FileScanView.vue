<template>
  <side-nav class="w-1/6 float-left"></side-nav>
  <div class="w-5/6 float-right px-5">
    <header-breadcrumb></header-breadcrumb>
    <cycle-loading
      v-if="loading"></cycle-loading>
    <main 
      class="scroll-h scroll overflow-auto rounded-lg"
      v-else-if="!loading && isApiOk">
      <div>
        <detection-count
          :detectionFileCount="detectionFileCount"></detection-count>
        <file-details
          :fileDetails="fileDetails"></file-details>
        <the-pagination></the-pagination>
      </div>
    </main>
    <content-error
      v-else></content-error>
  </div>
  <!-- <footer>
    <the-footer></the-footer>
  </footer> -->
</template>

<script setup>
import { ref } from 'vue'
import { fileScanApi } from '@/apis/file.js'
import SideNav from '@/components/SideNav.vue'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb.vue'
import TheFooter from '@/components/TheFooter.vue'
import ContentError from '@/components/ContentError.vue'
import CycleLoading from '@/components/CycleLoading.vue'
import DetectionCount from '@/components/file/DetectionCount.vue'
import FileDetails from '@/components/file/FileDetails.vue'
import ThePagination from '@/components/ThePagination.vue'

let loading = ref(true);
let isApiOk = ref(false);

let detectionFileCount = ref(null);
let fileDetails = ref(null);

const data = {
  "orgId": 1
}

Promise.all([
  // fileScanApi(data),
  ]).then((values) => {
    fileDetails.value = {
    "status": "success",
    "data": {
        "total": 10,
        "dlpTotal": 0,
        "malwareTotal": 1,
        "files": [
            {
            "id": 1,
            "name": "requirements.txt",
            "size": 265,
            "type": "cpp",
            "saas": "slack",
            "user": "hsp003636",
            "path": null,
            "name": "2024-06-18T05:51:37",
            "fileStatus": {
              "gscanStatus": -1,
              "dlpStatus": -1,
              "vtStatus": -1
            },
            "vtReport": {
              "type": "txt",
              "sha256": "wertwqeegwrgrre132223123123",
              "threatLabel": "none",
              "reportUrl": "https://www.virustotal.com/gui/file/886b15487fa6ae32484b1bb291abb6ac8ad78d5c09ad686651676215719f598b",
              "detectEngine": 0,
              "completeEngine": 65,
              "score": 0,
              "v3": "undetected",
              "alyac": "undetected",
              "kaspersky": "undetected",
              "falcon": "undetected",
              "avast": "undetected",
              "sentinelOne": "unsupported",
            },     
            "gscan": {
              "step1": {
                "correct": true,
                "mimeType": "text/plain",
                "signature": "unknown",
                "extension": "txt"
              },
              "step2": null
            }
          },

            {
                "id": 2,
                "name": "DLL 다운로드.pdf",
                "saltedHash": "a9d475223d9893fb7cafa400517d0caae7b9f4e46fc4ba2075bc4be870b4b9a6",
                "size": 338027,
                "type": "pdf",
                "saas": "slack",
                "user": "hsp003636",
                "path": null,
                "name": "2024-06-18T05:33:11",
                "vtReport": {
                    "type": "pdf",
                    "v3": "undetected",
                    "alyac": "undetected",
                    "kaspersky": "undetected",
                    "falcon": "undetected",
                    "avast": "undetected",
                    "sentinelone": "undetected",
                    "detectEngine": 0,
                    "completeEngine": 66,
                    "score": 0,
                    "threatLabel": "none",
                    "reportUrl": "https://www.virustotal.com/gui/file/a9d475223d9893fb7cafa400517d0caae7b9f4e46fc4ba2075bc4be870b4b9a6"
                },
                "fileStatus": {
                  "gscanStatus": 0,
                  "dlpStatus": 0,
                  "vtStatus": 0
                },
                "gscan": {
                    "step1": {
                        "correct": true,
                        "mimeType": "application/pdf",
                        "signature": "pdf",
                        "extension": "pdf"
                    },
                    "step2": null
                }
            },
            {
                "id": 3,
                "name": "cve-2018-0798.pdf",
                "saltedHash": "e92a29ec079eebecc18e38f43b18f32266140ad4669dd30c813b13ab97fc25de",
                "size": 352543,
                "type": "pdf",
                "saas": "slack",
                "user": "hsp003636",
                "path": null,
                "name": "2024-06-18T05:30:38",
                "vtReport": null,
                "fileStatus": {
                    "gscanStatus": 1,
                    "dlpStatus": 1,
                    "vtStatus": 1
                },
                "gscan": {
                    "step1": {
                        "correct": true,
                        "mimeType": "application/pdf",
                        "signature": "pdf",
                        "extension": "pdf"
                    },
                    "step2": null
                }
            },
            {
                "id": 4,
                "name": "Injector.pdf",
                "saltedHash": "26a4ed4d2dd44f70bd41650874c4388bf5444290a3b9c094a9ae652bfbb6fbbc",
                "size": 435445,
                "type": "pdf",
                "saas": "slack",
                "user": "hsp003636",
                "path": null,
                "date": "2024-06-18T07:13:08",
                "vtReport": null,
                "fileStatus": {
                    "gscanStatus": 0,
                    "dlpStatus": 0,
                    "vtStatus": 0
                },
                "gscan": {
                    "step1": {
                        "correct": true,
                        "mimeType": "application/pdf",
                        "signature": "pdf",
                        "extension": "pdf"
                    },
                    "step2": null
                }
            },
            {
                "id": 5,
                "name": "sdflasdjfsakdf.txt",
                "saltedHash": "26bedea4b575cd26089f0c8ca31dbb6de300e6a9d8e5e10ff2f3339068ed2b3e",
                "size": 27,
                "type": "text",
                "saas": "slack",
                "user": "hsp003636",
                "path": null,
                "date": "2024-06-18T07:49:18",
                "vtReport": null,
                "fileStatus": {
                    "gscanStatus": 1,
                    "dlpStatus": 0,
                    "vtStatus": 1
                },
                "gscan": {
                    "step1": {
                        "correct": true,
                        "mimeType": "text/plain",
                        "signature": "unknown",
                        "extension": "txt"
                    },
                    "step2": null
                }
            },
            {
                "id": 7,
                "name": "123123123123123123fsdfgdsfg.png",
                "saltedHash": "139e1cfe2293dc36ecf6d49bfea7b5f046aa073edd40485a892140973e5ffc91",
                "size": 72,
                "type": "text",
                "saas": "slack",
                "user": "hsp003636",
                "path": "SAMSUNG/slack/psh_slacktest/소셜/hsp003636",
                "date": "2024-07-30T05:23:37",
                "vtReport": null,
                "fileStatus": {
                    "gscanStatus": -1,
                    "dlpStatus": -1,
                    "vtStatus": -1
                },
                "gscan": {
                    "step1": {
                        "correct": false,
                        "mimeType": "text/plain",
                        "signature": "unknown",
                        "extension": "png"
                    },
                    "step2": null
                }
            },
            {
                "id": 8,
                "name": "test.docx",
                "saltedHash": "e1583e2ebd90387a6631ae07f8a96ede0b0402588f277be0d706a6054b46e4ca",
                "size": 13478,
                "type": "docx",
                "saas": "slack",
                "user": "여신호_9698",
                "path": "SAMSUNG/slack/psh_slacktest/개발/여신호_9698",
                "date": "2024-07-29T07:13:50",
                "vtReport": null,
                "fileStatus": {
                    "gscanStatus": 0,
                    "dlpStatus": -1,
                    "vtStatus": -1
                },
                "gscan": {
                    "step1": {
                        "correct": true,
                        "mimeType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        "signature": "docx",
                        "extension": "docx"
                    },
                    "step2": null
                }
            },
            {
                "id": 9,
                "name": "XENICS STORMX VM3.lnk",
                "saltedHash": "d941f42479d7247091583248e14534b8657caed6d7760ad4aa78f45d23550d51",
                "size": 1910,
                "type": "binary",
                "saas": "slack",
                "user": "hsp003636",
                "path": "SAMSUNG/slack/psh_slacktest/소셜/hsp003636",
                "date": "2024-07-30T09:28:53",
                "vtReport": null,
                "fileStatus": {
                    "gscanStatus": 1,
                    "dlpStatus": -1,
                    "vtStatus": 1
                },
                "gscan": {
                    "step1": null,
                    "step2": null
                }
            },
            {
                "id": 10,
                "name": "다운로드.png",
                "saltedHash": "dd3453005c8846cc80540c609690266e42b9076a6bde174b6614b69a5776250a",
                "size": 2571,
                "type": "png",
                "saas": "slack",
                "user": "hsp003636",
                "path": "SAMSUNG/slack/psh_slacktest/소셜/hsp003636",
                "date": "2024-07-30T09:29:26",
                "vtReport": {
                    "type": "png",
                    "v3": "undetected",
                    "alyac": "undetected",
                    "kaspersky": "undetected",
                    "falcon": "undetected",
                    "avast": "undetected",
                    "sentinelone": "unsupported",
                    "detectEngine": 0,
                    "completeEngine": 64,
                    "score": 0,
                    "threatLabel": "none",
                    "reportUrl": "https://www.virustotal.com/gui/file/dd3453005c8846cc80540c609690266e42b9076a6bde174b6614b69a5776250a"
                },
                "fileStatus": {
                    "gscanStatus": 1,
                    "dlpStatus": 1,
                    "vtStatus": 0
                },
                "gscan": {
                    "step1": {
                        "correct": true,
                        "mimeType": "image/png",
                        "signature": "unknown",
                        "extension": "png"
                    },
                    "step2": null
                }
            },
            {
                "id": 11,
                "name": "1차-ppt.pptx",
                "saltedHash": "55c1d7c5d670e5dac1032fa83ad530d5579d134157077358403d71cab1280723",
                "size": 54688844,
                "type": "binary",
                "saas": "slack",
                "user": "hsp003636",
                "path": null,
                "date": "2024-08-02T07:36:52",
                "vtReport": {
                    "type": "pptx",
                    "v3": "undetected",
                    "alyac": "unsupported",
                    "kaspersky": "undetected",
                    "falcon": "undetected",
                    "avast": "undetected",
                    "sentinelone": "undetected",
                    "detectEngine": 0,
                    "completeEngine": 68,
                    "score": 0,
                    "threatLabel": "none",
                    "reportUrl": "https://www.virustotal.com/gui/file/55c1d7c5d670e5dac1032fa83ad530d5579d134157077358403d71cab1280723"
                },
                "fileStatus": {
                    "gscanStatus": 0,
                    "dlpStatus": 0,
                    "vtStatus": -1
                },
                "gscan": {
                    "step1": {
                        "correct": false,
                        "mimeType": "application/octet-stream",
                        "signature": "pptx",
                        "extension": "pptx"
                    },
                    "step2": null
                }
            }
        ]
    }
};
    detectionFileCount.value = [2222, 13, 21];
  isApiOk.value = true;
}).catch((err) => {
  console.log(err);
}).finally(() => {
  loading.value = false;
});



</script>
