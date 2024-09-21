<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="w-[90%] h-[90%] bg-white rounded-lg">
      <div class="flex justify-between p-3">
        <div class="flex items-center">
          <v-icon :size=20 class="text-orange-400 mr-2">mdi-alert-circle-outline</v-icon>
          <p class=" items-center text-xs italic">파일 히스토리에 대한 시각화가 정확하지 않을 수 있습니다.</p>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-black">
          <v-icon>mdi-close</v-icon>
        </button>
      </div>
      <VueFlow v-model="elements" :fit-view-on-init="true" :default-zoom="2" :node-types="nodeTypes" style="height: calc(100% - 50px);"/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, defineProps, defineEmits } from 'vue'
import { VueFlow, useVueFlow, getBezierPath } from '@vue-flow/core'
import { Position } from '@vue-flow/core'
import { defineComponent, h } from 'vue'
import { getSecureRandomInt } from '@/utils/utils.js'

import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import CustomNode from './nodes/CustomNode.vue'

const props = defineProps({
  visualizationInfo: {
    type: Object,
    required: true
  }
})

let data = props.visualizationInfo;

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

const elements = computed(() => {
  const slackData = data.data.slack.sort((a, b) => new Date(a.eventTs) - new Date(b.eventTs));
  const googledriveData = data.data.googleDrive.sort((a, b) => new Date(a.eventTs) - new Date(b.eventTs));
  const o365Data = data.data.o365.sort((a, b) => new Date(a.eventTs) - new Date(b.eventTs));

  // 유사도에 따른 높이 랭크 설정
  const slackSimilarities = [...new Set(slackData.map(item => item.similarity))].sort((a, b) => b - a)
  const slackSimilarityRanks = Object.fromEntries(slackSimilarities.map((sim, index) => [sim, index + 1]))

  const googledriveSimilarities = [...new Set(googledriveData.map(item => item.similarity))].sort((a, b) => b - a)
  const googledriveSimilarityRanks = Object.fromEntries(googledriveSimilarities.map((sim, index) => [sim, index + 1]))

  const o365Similarities = [...new Set(o365Data.map(item => item.similarity))].sort((a, b) => b - a)
  const o365SimilarityRanks = Object.fromEntries(o365Similarities.map((sim, index) => [sim, index + 1]))

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
    const nodeId = `${item.eventId}`;
    let yPosition;
    let tuning = 25;
    
    // (1) 이벤트 행위에 따른 높이 구분
    // switch(item.eventType.toLowerCase()) {
    //   case 'file_upload':
    //     yPosition = Math.floor((getSecureRandomInt(10) * (tuning - (-tuning))) + (-tuning));
    //     break;
    //   case 'file_change':
    //     yPosition = -300;
    //     break;
    //   case 'file_delete':
    //     yPosition = -600;
    //     break;
    //   default:
    //     yPosition = 0; // 기본값
    // }

    // (2) 유사도가 같은 것 높이 유지
    // yPosition = Math.floor(-(100 - (item.similarity)) * 5)
    // if(yPosition < 0) yPosition -= 300

    // (3) 유사도에 따른 높이랭크를 설정
    const similarityHeight = slackSimilarityRanks[item.similarity]
    yPosition = -(similarityHeight * 260);

    nodes.push({
      id: nodeId,
      type: 'custom',
      data: { 
        originNode : item.eventId === data.data.originNode,
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
  })

  googledriveData.forEach((item, index) => {
    const nodeId = `${item.eventId}`;
    let yPosition;
    let tuning = 25;
    
    // (1) 이벤트 행위에 따른 높이 구분
    // switch(item.eventType.toLowerCase()) {
    //   case 'file_upload':
    //     yPosition = Math.floor((getSecureRandomInt(100) * (tuning - (-tuning))) + (-tuning));
    //     break;
    //   case 'file_change':
    //     yPosition = -300;
    //     break;
    //   case 'file_delete':
    //     yPosition = -600;
    //     break;
    //   default:
    //     yPosition = 0; // 기본값
    // }

    // (2) 유사도가 같은 것 높이 유지
    // yPosition = Math.floor(-(100 - (item.similarity)) * 5)
    // if(yPosition < 0) yPosition -= 300

    // (3) 유사도에 따른 높이랭크를 설정
    const similarityHeight = googledriveSimilarityRanks[item.similarity]
    yPosition = -(similarityHeight * 260);

    nodes.push({
      id: nodeId,
      type: 'custom',
      data: { 
        originNode : item.eventId === data.data.originNode,
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
  })

  o365Data.forEach((item, index) => {
    const nodeId = `${item.eventId}`;
    let yPosition;
    
    // (1) 이벤트 행위에 따른 높이 구분
    // switch(item.eventType.toLowerCase()) {
    //   case 'file_upload':
    //     yPosition = Math.floor((getSecureRandomInt(100) * (tuning - (-tuning))) + (-tuning));
    //     break;
    //   case 'file_change':
    //     yPosition = -300;
    //     break;
    //   case 'file_delete':
    //     yPosition = -600;
    //     break;
    //   default:
    //     yPosition = 0; // 기본값
    // }

    // (2) 유사도가 같은 것 높이 유지
    // yPosition = Math.floor(-(100 - (item.similarity)) * 5)
    // if(yPosition < 0) yPosition -= 300

    // (3) 유사도에 따른 높이랭크를 설정
    const similarityHeight = o365SimilarityRanks[item.similarity]
    yPosition = -(similarityHeight * 260);

    nodes.push({
      id: nodeId,
      type: 'custom',
      data: { 
        originNode : item.eventId === data.data.originNode,
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
      position: { x: 50 + index * 400, y: yPosition + 600},
      // parentNode: item.saas,
      // extent: 'parent',
    })
  })

// Edges 생성
  data.data.edges.forEach((item) => {
    const edgeId = `e-${item.source}-${item.target}`;
    edges.push({
      id: edgeId,
      source: `${item.source}`,  // 문자열로 변환
      target: `${item.target}`,  // 문자열로 변환
      label: item.label == 'File_SaaS_Match' ? '': (item.label == 'File_Hash_Match' ? '내용 동일': '파일명 유사' ),
      animated: item.label == ['File_Hash_Match', 'File_SaaS_Match'] ? true : false,
      style: { 
        stroke: item.label == 'File_SaaS_Match' ? '#000' : '#A7A7A7',
        // fill: '#ddd',

      },
      labelStyle: { fill: '#000', fontWeight: 700 },
      markerStart: {
        type: item.label == 'File_Group_Relation' ? 'arrowclosed' : '',
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