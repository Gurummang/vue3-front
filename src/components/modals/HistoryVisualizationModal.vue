<template>
  <div class="w-full h-3/5 bg-white rounded-lg">
    <VueFlow v-model="elements" :fit-view-on-init="true" :default-zoom="0.7" :node-types="nodeTypes" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { VueFlow, useVueFlow, getBezierPath } from '@vue-flow/core'
import { Position } from '@vue-flow/core'
import { defineComponent, h } from 'vue'

import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

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
          width: 300 * 4 + 'px',
          height: '400px',
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
}

// 샘플 데이터
const data = {
    "status": "success",
    "data": {
        "slack": [
            {
                "eventId": 1,
                "saas": "slack",
                "eventType": "file_uploaded",
                "fileName": "requirements.txt",
                "hash256": "886b15487fa6ae32484b1bb291abb6ac8ad78d5c09ad686651676215719f598b",
                "saasFileId": "F078MV1L5HS",
                "eventTs": "2024-06-18T05:51:37",
                "email": "hsp003636@gmail.com",
                "uploadChannel": null
            },
            {
                "eventId": 4,
                "saas": "slack",
                "eventType": "file_uploaded",
                "fileName": "Injector.pdf",
                "hash256": "26a4ed4d2dd44f70bd41650874c4388bf5444290a3b9c094a9ae652bfbb6fbbc",
                "saasFileId": "F078KQN3X26",
                "eventTs": "2024-06-18T07:13:08",
                "email": "hsp003636@gmail.com",
                "uploadChannel": null
            },
            {
                "eventId": 7,
                "saas": "slack",
                "eventType": "file_uploaded",
                "fileName": "123123123123123123fsdfgdsfg.png",
                "hash256": "139e1cfe2293dc36ecf6d49bfea7b5f046aa073edd40485a892140973e5ffc91",
                "saasFileId": "F07EMFUPV5Z",
                "eventTs": "2024-07-30T05:23:37",
                "email": "hsp003636@gmail.com",
                "uploadChannel": "SAMSUNG/slack/psh_slacktest/소셜/hsp003636"
            },
            {
                "eventId": 10,
                "saas": "slack",
                "eventType": "file_uploaded",
                "fileName": "다운로드.png",
                "hash256": "dd3453005c8846cc80540c609690266e42b9076a6bde174b6614b69a5776250a",
                "saasFileId": "F07FBFRET2L",
                "eventTs": "2024-07-30T09:29:26",
                "email": "hsp003636@gmail.com",
                "uploadChannel": "SAMSUNG/slack/psh_slacktest/소셜/hsp003636"
            }
        ],
        "googleDrive": []
    }
}

const elements = computed(() => {
  const slackData = data.data.slack.sort((a, b) => new Date(a.eventTs) - new Date(b.eventTs))
  const nodes = [
    {
      id: 'slack',
      type: 'customSlack',
      data: { label: 'Slack' },
      position: { x: 0, y: 0 },
    }
  ]
  const edges = []

  slackData.forEach((item, index) => {
    const nodeId = `file-${item.eventId}`
    nodes.push({
      id: nodeId,
      data: { 
        label: `${item.fileName}\n${item.saas}\n${item.email}\n${new Date(item.eventTs).toLocaleString()}`
      },
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
      position: { x: 50 + index * 250, y: 150 },
      parentNode: 'slack',
      extent: 'parent',
      style: {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: 'white',
        fontSize: '12px',
        width: '200px'
      }
    })
    
    if (index > 0) {
      const prevNodeId = `file-${slackData[index - 1].eventId}`
      edges.push({
        id: `e-${prevNodeId}-${nodeId}`,
        source: prevNodeId,
        target: nodeId,
        animated: true,
        style: { stroke: '#4A154B' }
      })
    }
  })

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
html, body, #app {
  margin: 0;
  height: 100%;
}
</style>