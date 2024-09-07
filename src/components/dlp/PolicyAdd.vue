<template>
  <div>
    <div class="bg-white shadow-sm rounded-lg p-4 mb-5">
      <div class="mb-2">
        <h2 class="text-xl font-bold text-gray-800 mb-4">DLP 정책 목록</h2>
      
      </div>
    </div>

  </div>

<DlpDeleteModal
  v-if="isDlpDeleteModalOpen"
  :checkedIndex="checkedIndex"
  @close="closeDlpDeleteModal"
></DlpDeleteModal>

</template>

<script setup>
import { ref, watch, defineProps, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DlpDeleteModal from '@/components/modals/DlpDeleteModal.vue'

const props = defineProps({
  policyDetails: Object,
  // required: true
})
const router = useRouter();

const isDlpDeleteModalOpen = ref(false)

// Modal Function
const openDlpDeleteModal = () => {
  if (checkedIndex.value.length) {
    isDlpDeleteModalOpen.value = true
  } else {
    alert('삭제할 정책을 선택해주세요.')
  }
}

const closeDlpDeleteModal = () => {
  isDlpDeleteModalOpen.value = false
  clearCheckedIndex()
}
</script>

<style scoped>
</style>
