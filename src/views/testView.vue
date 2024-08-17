<template>
  <side-nav class="w-1/6 float-left"></side-nav>
  <div class="w-5/6 float-right px-5">
    <header-breadcrumb></header-breadcrumb>
    <main>
      <!-- <Suspense>
      <register-main 
        v-if="responseData"
        :responseData="responseData"></register-main>
      <content-error v-else></content-error>
      </Suspense> -->
    </main>
    <!-- <cycle-loading></cycle-loading> -->
  </div>

  <ul>
    <li v-for="item in paginatedItems" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
  
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">이전</button>
    <span>{{ currentPage }} / {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">다음</button>
  </div>

  <!-- <footer>
    <the-footer></the-footer>
  </footer> -->
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import SideNav from '@/components/SideNav.vue'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb.vue'
import TheFooter from '@/components/TheFooter.vue'
import RegisterMain from '@/components/RegisterMain.vue'
import ContentError from '@/components/ContentError.vue'

import CycleLoading from '@/components/CycleLoading.vue'

let responseData = ref(null);

// 예시 데이터
const items = ref([
  { id: 1, name: '아이템 1' },
  { id: 2, name: '아이템 2' },
  { id: 3, name: '아이템 3' },
  { id: 4, name: '아이템 4' },
  { id: 5, name: '아이템 5' },
  { id: 6, name: '아이템 6' },
  { id: 7, name: '아이템 7' },
  { id: 8, name: '아이템 8' },
  { id: 9, name: '아이템 9' },
  { id: 10, name: '아이템 10' },
  { id: 11, name: '아이템 11' },
  { id: 12, name: '아이템 12' },
  { id: 13, name: '아이템 13' },
  { id: 14, name: '아이템 14' },
  { id: 15, name: '아이템 15' },
  { id: 16, name: '아이템 16' },
  { id: 17, name: '아이템 17' },
  { id: 18, name: '아이템 18' },
  { id: 19, name: '아이템 19' },
  { id: 20, name: '아이템 20' },
])

const itemsPerPage = 5
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage))

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return items.value.slice(start, end)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

</script>
