<template>
  <div class="flex justify-center">
    <a
      @click="moveToPrev"
      class="flex items-center justify-center px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md rtl:-scale-x-100 hover:bg-indigo-900 hover:text-white dar"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </a>
    <a
      @click="movePage(index + 1)"
      v-for="index in pages[step]"
      :key="index"
      :class="['hidden px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:inline hover:bg-indigo-900 hover:text-white dar', (index + 1) === props.selectPages ? 'bg-indigo-900 text-white' : 'text-gray-700 bg-white']"
    >
      {{ index + 1 }}
    </a>
    <a
      @click="moveToNext"
      class="flex items-center justify-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md rtl:-scale-x-100 hover:bg-indigo-900 hover:text-white dar"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </a>
  </div>
  <!-- {{ totalPage }} -->
  <!-- {{ pages }} -->
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  totalPage: {
    type: Number,
    required: true
  },
  selectPages: {
    type: Number,
    required: true
  }
})

const step = ref(0)
const pages = computed(() => {
  const newArr = []
  for (let i = 0; i < props.totalPage; i++) {
    newArr.push(i)
  }
  const length = newArr.length
  // const divide = Math.floor(length / 10) + (Math.floor(length % 10) > 0 ? 1 : 0)
  // const res = []

  // for (let i = 0; i <= divide; i++) {
  //   res.push(newArr.slice(0, 10))
  // }
  // return res
  const divide = Math.ceil(length / 10) // 전체 페이지를 10개씩 나눔
  const res = []

  for (let i = 0; i < divide; i++) {
    res.push(newArr.slice(i * 10, (i + 1) * 10)) // 10개씩 슬라이스하여 추가
  }
  return res
})

const page = ref(1)
const emit = defineEmits(['send-event'])

const movePage = (pageIdx) => {
  emit('send-event', pageIdx)
  page.value = pageIdx
}

const moveToPrev = () => {
  if (page.value <= 1) {
    return
  } else page.value--

  emit('send-event', page.value)
}

const moveToNext = () => {
  if (page.value <= props.totalPage - 1) page.value++
  else return

  emit('send-event', page.value)
}
</script>

<style scoped>
</style>