<template>
  <div style="width: 50vw; height: 50vh; background: white;">
    <VueFlow v-model="elements" :fit-view-on-init="true" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'

import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

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
      type: 'input',
      label: 'Slack',
      position: { x: 200, y: 50 },
      style: { background: '#4A154B', color: 'white' }
    }
  ]
  const edges = []

  slackData.forEach((item, index) => {
    const nodeId = `file-${item.eventId}`
    nodes.push({
      id: nodeId,
      label: item.fileName + item.saas,
      position: { x: 200, y: (index + 1) * 100 },
      data: item,
      style: { width: 300 }
    })
    if (index === 0) {
      edges.push({
        id: `e-slack-${nodeId}`,
        source: 'slack',
        target: nodeId,
        animated: true
      })
    } else {
      const prevNodeId = `file-${slackData[index - 1].eventId}`
      edges.push({
        id: `e-${prevNodeId}-${nodeId}`,
        source: prevNodeId,
        target: nodeId,
        animated: true,
        label: new Date(item.eventTs).toLocaleDateString()
      })
    }
  })

  return [...nodes, ...edges]
})

const { fitView } = useVueFlow()

onMounted(() => {
  fitView()
})
</script>

<style>

</style>