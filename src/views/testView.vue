<template>
  <side-nav class="w-1/6 float-left"></side-nav>
  <div class="w-5/6 float-right px-5">
    <header-breadcrumb></header-breadcrumb>
    <main class="scroll-h scroll overflow-auto rounded-lg">
      <!-- <Suspense>
      <register-main 
        v-if="responseData"
        :responseData="responseData"></register-main>
      <content-error v-else></content-error>
      </Suspense> -->

      <ul>
        <li v-for="item in totalData" :key="item.id">
          {{ item.name }}
        </li>
      </ul>
      
      <!-- <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">이전</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">다음</button>
      </div> -->


      <the-pagination :totalPage="totalPage" @send-event="reset"></the-pagination>
    </main>
    <!-- <cycle-loading></cycle-loading> -->
  </div>


  <!-- <footer>
    <the-footer></the-footer>
  </footer> -->
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import SideNav from '@/components/SideNav.vue'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb.vue'
import TheFooter from '@/components/TheFooter.vue'
import RegisterMain from '@/components/RegisterMain.vue'
import ContentError from '@/components/ContentError.vue'
import CycleLoading from '@/components/CycleLoading.vue'
import ThePagination from '@/components/ThePagination.vue'

let responseData = ref(null);


const items = ref([]);
const totalData = ref([]);
const selectPages = ref(1); // 1이라는 페이지로 셋팅
const totalPage = ref(0); // totalData의 개수에 따라 페이지네이션을 그려지는 리스트를 뜻합니다.
const totalCount = ref(null);
const limit = ref(10) // 한 페이지에 보여줄 아이템 개수

const getData = () => {
  // 40개의 아이템을 생성하는 함수
  const generateItems = () => {
    const newItems = []
    for (let i = 1; i <= 40; i++) {
      newItems.push({
        id: i,
        name: `아이템 ${i}`,
        description: `이것은 아이템 ${i}의 설명입니다.`
      })
    }
    return newItems
  }
  totalData.value = generateItems();
  totalCount.value = totalData !== undefined ? totalData.value.length : 0;
  totalPage.value = Math.ceil(totalCount.value / limit.value) !== 0 ? Math.ceil(totalCount.value / limit.value) : 1;
  totalData.value = disassemble(selectPages.value - 1, totalData.value, limit.value);
}

const disassemble = (index, data, size) => {
  const res = new Array();

  for(let i = 0; i < data.length; i += size) {
    res.push(data.slice(i, i + size));
  }
  console.log('res:', res);
  return res[index];
}

onMounted(() => {
  getData();
})

const reset = (pageIdx) => {
  if(pageIdx === 0 ) selectPages.value = 1;
  else selectPages.value = pageIdx;
}

watch(selectPages, () => {
  getData();
})


// 컴포넌트가 생성될 때 아이템 리스트 초기화
// items.value = generateItems();

// const itemsPerPage = 5
// const currentPage = ref(1)

// const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage))

// const paginatedItems = computed(() => {
//   const start = (currentPage.value - 1) * itemsPerPage
//   const end = start + itemsPerPage
//   return items.value.slice(start, end)
// })

// const nextPage = () => {
//   if (currentPage.value < totalPages.value) {
//     currentPage.value++
//   }
// }

// const prevPage = () => {
//   if (currentPage.value > 1) {
//     currentPage.value--
//   }
// }

</script>
