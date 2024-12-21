<template>
  <div class="home">
    <h1>PDF题库练习系统</h1>
    <PDFUploader @file-uploaded="handleFileUploaded" />
    <div v-if="hasLastPractice" class="continue-practice">
      <button @click="continuePractice">继续上次练习</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PDFUploader from '../components/PDFUploader.vue'
import { getStorageItem } from '../utils/storage'

const router = useRouter()
const hasLastPractice = ref(false)

onMounted(() => {
  const currentProgress = getStorageItem('currentProgress')
  hasLastPractice.value = !!currentProgress
})

const handleFileUploaded = () => {
  router.push('/practice')
}

const continuePractice = () => {
  router.push('/practice')
}
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.continue-practice {
  margin-top: 20px;
}
</style> 