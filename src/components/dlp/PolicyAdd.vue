<template>
  <div>
    <div class="bg-white shadow-sm rounded-lg p-4 mb-5">
      <div class="mb-2">
        <h2 class="text-xl font-bold text-gray-800 mb-4">DLP 정책 추가</h2>

        <div class="mb-2">
          <label for="SaasAlias" class="block text-sm font-semibold text-gray-700"> 정책명 </label>
          <input
            type="text"
            id="SaasAlias"
            placeholder="연동할 SaaS의 별칭을 입력해주세요."
            class="mt-1 p-1.5 w-full rounded-md shadow-sm text-xs border-2 border-gray-300"
            v-model="alias"
          />
        </div>

        <div class="mb-2">
          <label for="SaasAlias" class="block text-sm font-semibold text-gray-700"> 정책 설명 </label>
          <input
            type="text"
            id="SaasAlias"
            placeholder="연동할 SaaS의 별칭을 입력해주세요."
            class="mt-1 p-1.5 w-full rounded-md shadow-sm text-xs border-2 border-gray-300"
            v-model="alias"
          />
        </div>

        <!-- <div class="mb-2">
          <label class="inline-flex items-center">
            <input type="checkbox" v-model="agreeToTerms" class="form-checkbox size-4" />
            <span class="ml-2 text-sm">위 SaaS 연동을 동의하겠습니다.</span>
          </label>
        </div> -->

        <div class="mb-2">
          <label for="SaasAlias" class="block text-sm font-semibold text-gray-700"> 권장 조치 </label>
          <input
            type="text"
            id="SaasAlias"
            placeholder="연동할 SaaS의 별칭을 입력해주세요."
            class="mt-1 p-1.5 w-full rounded-md shadow-sm text-xs border-2 border-gray-300"
            v-model="alias"
          />
        </div>

      </div>
      <div class="flex justify-end py-3 gap-2">
        <button @click="syncSaaS" class="bg-white text-orange-500 px-4 py-2 rounded text-sm font-semibold hover:bg-orange-600">정책 취소</button>
        <button @click="syncSaaS" class="bg-orange-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-orange-600">정책 추가</button>
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
