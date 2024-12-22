<template>
  <div class="pdf-uploader">
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <p>正在解析PDF文件...</p>
    </div>
    <div
      class="upload-area"
      @drop.prevent="handleDrop"
      @dragover.prevent
      @click="triggerFileInput"
      :class="{ 'is-error': error }"
    >
      <input
        type="file"
        ref="fileInput"
        accept=".pdf"
        @change="handleFileChange"
        style="display: none"
      >
      <div class="upload-hint">
        <i class="upload-icon">📄</i>
        <p>点击或拖拽PDF文件到此处上传</p>
      </div>
    </div>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { parsePDF } from '../utils/pdfParser'

const emit = defineEmits(['file-uploaded'])
const fileInput = ref(null)
const loading = ref(false)
const error = ref('')

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileChange = async (event) => {
  const file = event.target.files[0]
  if (file) {
    await processPDFFile(file)
  }
}

const handleDrop = async (event) => {
  const file = event.dataTransfer.files[0]
  if (file.type === 'application/pdf') {
    await processPDFFile(file)
  }
}

const processPDFFile = async (file) => {
  try {
    loading.value = true
    error.value = ''
    
    if (file.size > import.meta.env.VITE_MAX_PDF_SIZE) {
      throw new Error('文件大小不能超过10MB')
    }
    
    if (file.type !== import.meta.env.VITE_SUPPORTED_PDF_TYPES) {
      throw new Error('只支持PDF文件格式')
    }
    
    const questions = await parsePDF(file)
    if (!questions || questions.length === 0) {
      throw new Error('未能识别出题目，请检查PDF格式')
    }
    
    localStorage.setItem('questions', JSON.stringify(questions))
    emit('file-uploaded')
  } catch (error) {
    console.error('PDF处理错误:', error)
    error.value = error.message || 'PDF处理失败，请重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.pdf-uploader {
  margin: 20px 0;
}

.upload-area {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
}

.upload-area:hover {
  border-color: #666;
}

.upload-icon {
  font-size: 48px;
}

.upload-hint {
  color: #666;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #2196f3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.error-message {
  color: #f44336;
  margin-top: 10px;
  text-align: center;
}

.is-error {
  border-color: #f44336;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 