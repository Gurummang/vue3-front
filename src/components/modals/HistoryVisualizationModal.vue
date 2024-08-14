<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="w-[90%] h-[90%] bg-white rounded-lg mt-10">
      <div class="flex justify-between p-3">
        <div class="flex items-center">
          <v-icon :size=20 class="text-orange-400 mr-2">mdi-alert-circle-outline</v-icon>
          <p class=" items-center text-xs italic">파일 히스토리에 대한 시각화가 정확하지 않을 수 있습니다.</p>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-black">
          <v-icon>mdi-close</v-icon>
        </button>
      </div>
      <VueFlow v-model="elements" :fit-view-on-init="true" :default-zoom="0.7" :node-types="nodeTypes" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { VueFlow, useVueFlow, getBezierPath } from '@vue-flow/core'
import { Position } from '@vue-flow/core'
import { defineComponent, h } from 'vue'

import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import CustomNode from './nodes/CustomNode.vue'

// 커스텀 Slack 노드 컴포넌트
const CustomSlackNode = defineComponent({
  props: ['data'],
  setup(props) {
    return () => h(
      'div',
      { 
        style: {
          padding: '20px',
          border: '2px solid #4A154B',
          borderRadius: '10px',
          backgroundColor: 'rgba(74, 21, 75, 0.1)',
          fontSize: '20px',
          width: 300 * 5 + 'px',
          height: '300px',
          display: 'flex',
        }
      },
      [
        h('div', { style: { fontWeight: 'bold' } }, props.data.label)
      ]
    )
  }
})

const nodeTypes = {
  customSlack: CustomSlackNode,
  custom: CustomNode,
}

// 샘플 데이터
// const data = {
//     "status": "success",
//     "data": {
//         "slack": [
//             {
//                 "eventId": 1,
//                 "saas": "slack",
//                 "eventType": "file_uploaded",
//                 "fileName": "requirements.txt",
//                 "hash256": "886b15487fa6ae32484b1bb291abb6ac8ad78d5c09ad686651676215719f598b",
//                 "saasFileId": "F078MV1L5HS",
//                 "eventTs": "2024-06-18T05:51:37",
//                 "email": "hsp003636@gmail.com",
//                 "uploadChannel": null
//             },
//             {
//                 "eventId": 4,
//                 "saas": "slack",
//                 "eventType": "file_edited",
//                 "fileName": "Injector.pdf",
//                 "hash256": "26a4ed4d2dd44f70bd41650874c4388bf5444290a3b9c094a9ae652bfbb6fbbc",
//                 "saasFileId": "F078KQN3X26",
//                 "eventTs": "2024-06-18T07:13:08",
//                 "email": "hsp003636@gmail.com",
//                 "uploadChannel": null
//             },
//             {
//                 "eventId": 7,
//                 "saas": "slack",
//                 "eventType": "file_deleted",
//                 "fileName": "123123123123123123fsdfgdsfg.png",
//                 "hash256": "139e1cfe2293dc36ecf6d49bfea7b5f046aa073edd40485a892140973e5ffc91",
//                 "saasFileId": "F07EMFUPV5Z",
//                 "eventTs": "2024-07-30T05:23:37",
//                 "email": "hsp003636@gmail.com",
//                 "uploadChannel": "SAMSUNG/slack/psh_slacktest/소셜/hsp003636"
//             },
//             {
//                 "eventId": 10,
//                 "saas": "slack",
//                 "eventType": "file_uploaded",
//                 "fileName": "다운로드.png",
//                 "hash256": "dd3453005c8846cc80540c609690266e42b9076a6bde174b6614b69a5776250a",
//                 "saasFileId": "F07FBFRET2L",
//                 "eventTs": "2024-07-30T09:29:26",
//                 "email": "hsp003636@gmail.com",
//                 "uploadChannel": "SAMSUNG/slack/psh_slacktest/소셜/hsp003636"
//             }
//         ],
//         "googleDrive": [
//           {
//                 "eventId": 11,
//                 "saas": "googleDrive",
//                 "eventType": "uploaded",
//                 "fileName": "requirements.txt",
//                 "hash256": "886b15487fa6ae32484b1bb291abb6ac8ad78d5c09ad686651676215719f598b",
//                 "saasFileId": "F078MV1L5HS",
//                 "eventTs": "2024-06-18T05:51:37",
//                 "email": "hsp003636@gmail.com",
//                 "uploadChannel": null
//             },
//             {
//                 "eventId": 14,
//                 "saas": "googleDrive",
//                 "eventType": "uploaded",
//                 "fileName": "Injector.pdf",
//                 "hash256": "26a4ed4d2dd44f70bd41650874c4388bf5444290a3b9c094a9ae652bfbb6fbbc",
//                 "saasFileId": "F078KQN3X26",
//                 "eventTs": "2024-06-18T07:13:08",
//                 "email": "hsp003636@gmail.com",
//                 "uploadChannel": null
//             },
//             {
//                 "eventId": 17,
//                 "saas": "googleDrive",
//                 "eventType": "uploaded",
//                 "fileName": "123123123123123123fsdfgdsfg.png",
//                 "hash256": "139e1cfe2293dc36ecf6d49bfea7b5f046aa073edd40485a892140973e5ffc91",
//                 "saasFileId": "F07EMFUPV5Z",
//                 "eventTs": "2024-07-30T05:23:37",
//                 "email": "hsp003636@gmail.com",
//                 "uploadChannel": "SAMSUNG/slack/psh_slacktest/소셜/hsp003636"
//             },
//             {
//                 "eventId": 18,
//                 "saas": "googleDrive",
//                 "eventType": "uploaded",
//                 "fileName": "다운로드.png",
//                 "hash256": "dd3453005c8846cc80540c609690266e42b9076a6bde174b6614b69a5776250a",
//                 "saasFileId": "F07FBFRET2L",
//                 "eventTs": "2024-07-30T09:29:26",
//                 "email": "hsp003636@gmail.com",
//                 "uploadChannel": "SAMSUNG/slack/psh_slacktest/소셜/hsp003636"
//             }
//         ]
//     }
// }
const data = {
    "status": "success",
    "data": {
        "slack": [
            {
                "eventId": 16,
                "saas": "slack",
                "eventType": "file_uploaded",
                "fileName": "하이루.txt",
                "hash256": "dced11053f08e466f31f78b6121ef5962d40bddaaddb0c565b3a996962e89e05",
                "saasFileId": "F09FIKDJFGSA",
                "eventTs": "2024-08-05T19:39:52",
                "email": "goei4559@gmail.com",
                "uploadChannel": "SAMSUNG/slack/psh_slacktest/개발/여신호_9698",
                "similarity": 1.0
            },
            {
                "eventId": 17,
                "saas": "slack",
                "eventType": "file_changed",
                "fileName": "하이루.txt",
                "hash256": "dced11053f08e466f31f78b6121ef5962d40bddaaddbkdjfehiud",
                "saasFileId": "F09FIKDJFGSA",
                "eventTs": "2024-08-05T19:40:52",
                "email": "goei4559@gmail.com",
                "uploadChannel": "SAMSUNG/slack/psh_slacktest/개발/여신호_9698",
                "similarity": 1.0
            },
            {
                "eventId": 18,
                "saas": "slack",
                "eventType": "file_deleted",
                "fileName": "하이루.txt",
                "hash256": null,
                "saasFileId": "F09FIKDJFGSA",
                "eventTs": "2024-08-06T19:40:52",
                "email": "goei4559@gmail.com",
                "uploadChannel": "SAMSUNG/slack/psh_slacktest/개발/여신호_9698",
                "similarity": 1.0
            },
            {
                "eventId": 19,
                "saas": "slack",
                "eventType": "file_uploaded",
                "fileName": "호잇.txt",
                "hash256": "dced11053f08e466f31f78b6121ef596dkjfhskjdmclld09280398433",
                "saasFileId": "F19FIKDQJWK",
                "eventTs": "2024-08-06T19:40:53",
                "email": "goei4559@gmail.com",
                "uploadChannel": "SAMSUNG/slack/psh_slacktest/개발/여신호_9698",
                "similarity": 0.4
            },
            {
                "eventId": 3,
                "saas": "slack",
                "eventType": "file_uploaded",
                "fileName": "cve-2018-0798.pdf",
                "hash256": "e92a29ec079eebecc18e38f43b18f32266140ad4669dd30c813b13ab97fc25de",
                "saasFileId": "F078MT457SQ",
                "eventTs": "2024-06-18T14:30:38",
                "email": "hsp003636@gmail.com",
                "uploadChannel": null,
                "similarity": 0.16
            },
            {
                "eventId": 20,
                "saas": "slack",
                "eventType": "file_uploaded",
                "fileName": "호잇.txt",
                "hash256": "dced11053f08e466f31f78b6121ef596dkjfhskjdmclld09280398433",
                "saasFileId": "F19FIKSKDLFJ",
                "eventTs": "2024-08-07T19:40:53",
                "email": "goei4559@gmail.com",
                "uploadChannel": "SAMSUNG/slack/psh_slacktest/개발/여신호_9698",
                "similarity": 0.4
            },
            {
                "eventId": 6,
                "saas": "slack",
                "eventType": "file_uploaded",
                "fileName": "하이루.txt",
                "hash256": "dced11053f08e466f31f78b6121ef5962d40bddaaddb0c565b3a996962e89e05",
                "saasFileId": "F07EFCHQUUT",
                "eventTs": "2024-07-29T15:33:41",
                "email": "goei4559@gmail.com",
                "uploadChannel": "SAMSUNG/slack/psh_slacktest/개발/여신호_9698",
                "similarity": 1.0
            },
            {
                "eventId": 9,
                "saas": "slack",
                "eventType": "file_uploaded",
                "fileName": "XENICS STORMX VM3.lnk",
                "hash256": "d941f42479d7247091583248e14534b8657caed6d7760ad4aa78f45d23550d51",
                "saasFileId": "F07FBFMM3S4",
                "eventTs": "2024-07-30T18:28:53",
                "email": "hsp003636@gmail.com",
                "uploadChannel": "SAMSUNG/slack/psh_slacktest/소셜/hsp003636",
                "similarity": 0.16
            },
            {
                "eventId": 12,
                "saas": "slack",
                "eventType": "file_changed",
                "fileName": "하이루.txt",
                "hash256": "dced11053f08e466f31f78b6121ef596dkjfhskjdmclld09280398433",
                "saasFileId": "F07EFCHQUUT",
                "eventTs": "2024-08-03T16:36:52",
                "email": "goei4559@gmail.com",
                "uploadChannel": "SAMSUNG/slack/psh_slacktest/개발/여신호_9698",
                "similarity": 1.0
            },
            {
                "eventId": 13,
                "saas": "slack",
                "eventType": "file_deleted",
                "fileName": "하이루.txt",
                "hash256": null,
                "saasFileId": "F07EFCHQUUT",
                "eventTs": "2024-08-04T16:36:52",
                "email": "goei4559@gmail.com",
                "uploadChannel": "SAMSUNG/slack/psh_slacktest/개발/여신호_9698",
                "similarity": 1.0
            },
            {
                "eventId": 14,
                "saas": "slack",
                "eventType": "file_uploaded",
                "fileName": "호잇.txt",
                "hash256": "dced11053f08e466f31f78b6121ef596dkjfhskjdmclld09280398433",
                "saasFileId": "F08FIEKDLSSN",
                "eventTs": "2024-08-04T18:39:52",
                "email": "goei4559@gmail.com",
                "uploadChannel": "SAMSUNG/slack/psh_slacktest/개발/여신호_9698",
                "similarity": 0.4
            },
            {
                "eventId": 15,
                "saas": "slack",
                "eventType": "file_deleted",
                "fileName": "호잇.txt",
                "hash256": null,
                "saasFileId": "F08FIEKDLSSN",
                "eventTs": "2024-08-04T19:39:52",
                "email": "goei4559@gmail.com",
                "uploadChannel": "SAMSUNG/slack/psh_slacktest/개발/여신호_9698",
                "similarity": 0.4
            }
        ],
        "googleDrive": [],
        "edges": [
            {
                "source": 6,
                "target": 12,
                "label": "File_SaaS_Match"
            },
            {
                "source": 17,
                "target": 18,
                "label": "File_SaaS_Match"
            },
            {
                "source": 14,
                "target": 15,
                "label": "File_SaaS_Match"
            },
            {
                "source": 6,
                "target": 16,
                "label": "File_Hash_Match"
            },
            {
                "source": 16,
                "target": 17,
                "label": "File_SaaS_Match"
            },
            {
                "source": 12,
                "target": 14,
                "label": "File_Hash_Match"
            },
            {
                "source": 12,
                "target": 13,
                "label": "File_SaaS_Match"
            },
            {
                "source": 14,
                "target": 19,
                "label": "File_Hash_Match"
            },
            {
                "source": 19,
                "target": 20,
                "label": "File_Hash_Match"
            }
        ]
    }
}

const elements = computed(() => {
  const slackData = data.data.slack.sort((a, b) => new Date(a.eventTs) - new Date(b.eventTs));
  const googleDriveData = data.data.googleDrive.sort((a, b) => new Date(a.eventTs) - new Date(b.eventTs));

  // 부모 노드 추가
  const nodes = [
    // {
    //   id: 'slack',
    //   type: 'customSlack',
    //   data: { label: 'Slack' },
    //   position: { x: 0, y: 0 },
    // },
    // {
    //   id: 'googleDrive',
    //   type: 'customSlack',
    //   data: { label: 'GoogleDrive' },
    //   position: { x: 0, y: 400 },
    // }
  ]
  const edges = []

  slackData.forEach((item, index) => {
    const nodeId = `${item.eventId}`
    console.log(nodeId);

    let yPosition;
    switch(item.eventType.toLowerCase()) {
      case 'file_uploaded':
        yPosition = Math.floor((Math.random() * (50 - (-50))) + (-50));
        break;
      case 'file_changed':
        yPosition = -300;
        break;
      case 'file_deleted':
        yPosition = 300;
        break;
      default:
        yPosition = 0; // 기본값
    }

    nodes.push({
      id: nodeId,
      type: 'custom',
      data: { 
        eventType: item.eventType,
        saas: item.saas,
        fileName: item.fileName,
        email: item.email,
        eventTs: item.eventTs,
        uploadChannel: item.uploadChannel,
        similarity : item.similarity
      },
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
      position: { x: 50 + index * 400, y: yPosition },
      // parentNode: item.saas,
      // extent: 'parent',
    })
    

    // if (index > 0) {
    //   const prevNodeId = `file-${slackData[index - 1].eventId}`
    //   edges.push({
    //     id: `e-${prevNodeId}-${nodeId}`,
    //     source: prevNodeId,
    //     target: nodeId,
    //     markerEnd: {
    //       type: index % 2 == 0 ? 'arrowclosed' : 'arrow', // arrow, arrowclosed
    //       width: 30,
    //       height: 30,
    //       color: '#000',
    //     },
    //     label: 'Test',
    //     animated: index % 2 == 0 ? false : true,
    //     style: { stroke: '#4A154B',
    //             textColor: '#FFF',
    //     }
    //   })
    // }
  })


  googleDriveData.forEach((item, index) => {
    const nodeId = `file-${item.eventId}`
    nodes.push({
      id: nodeId,
      data: { 
        label: `활동 종류 : ${item.eventType}<br>\
                파일명 : ${item.fileName}<br>\
                사용자 : ${item.email}<br>\
                히스토리 시각 : ${new Date(item.eventTs).toLocaleString()}`,
        events: `${item.eventTs}`,
        selected: true,
      },
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
      position: { x: 50 + index * 350, y: 150 },
      parentNode: item.saas,
      extent: 'parent',
      style: {
        padding: '10px',
        // border: '2px solid ' + (item.eventId % 2 === 0 ? 'rgba(0, 255, 75, 0.2)' : 'rgba(255, 0, 75, 0.2)'),
        borderRadius: '5px',
        backgroundColor: 'white',
        fontSize: '12px',
        lineHeight: 1.5,
        width: '300px',
        textAlign: 'left'
      }
    })
    
    if (index > 0) {
      const prevNodeId = `file-${googleDriveData[index - 1].eventId}`
      edges.push({
        id: `e-${prevNodeId}-${nodeId}`,
        source: prevNodeId,
        target: nodeId,
        animated: true,
        style: { stroke: '#4A154B',
                textColor: '#000',
        }
      })
    }
  })


// Edges 생성
  data.data.edges.forEach((item) => {
    const edgeId = `e-${item.source}-${item.target}`;
    edges.push({
      id: edgeId,
      source: `${item.source}`,  // 문자열로 변환
      target: `${item.target}`,  // 문자열로 변환
      label: item.label == 'File_SaaS_Match' ? '같은 파일': '내용 동일',
      animated: item.label == 'File_SaaS_Match' ? true : false,
      style: { 
        stroke: item.label == 'File_SaaS_Match' ? '#000' : '#A7A7A7',
        // fill: '#ddd',

      },
      labelStyle: { fill: '#000', fontWeight: 700 },
      markerStart: {
        type: item.label == 'File_SaaS_Match' ? '' : 'arrowclosed',
        width: 20,
        height: 20,
        color: '#A7A7A7',
      },
      markerEnd: {
        type: 'arrowclosed',
        width: 20,
        height: 20,
        color: item.label == 'File_SaaS_Match' ? '#000' : '#A7A7A7',
      },
    });
  });

  console.log(nodes);
  console.log(edges);

  return [...nodes, ...edges]
})

const { fitView } = useVueFlow()

onMounted(() => {
  setTimeout(() => {
    fitView()
  }, 0)
})

</script>

<style>

</style>