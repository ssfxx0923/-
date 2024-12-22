<template>
  <div class="practice">
    <div class="practice-container">
      <QuestionDisplay
        :question="currentQuestion"
        :currentIndex="currentQuestionIndex"
        :totalQuestions="questions.length"
        :selectedOption="selectedOption"
        :showAnswer="showAnswer"
        @select-option="handleSelectOption"
      />
      
      <div class="actions">
        <button 
          v-if="!showAnswer"
          class="submit-btn"
          :disabled="selectedOption === null"
          @click="submitAnswer"
        >
          提交答案
        </button>
        
        <div v-else class="navigation">
          <button 
            class="nav-btn"
            :disabled="currentQuestionIndex === 0"
            @click="previousQuestion"
          >
            上一题
          </button>
          <button 
            class="nav-btn"
            :disabled="currentQuestionIndex === questions.length - 1"
            @click="nextQuestion"
          >
            {{ isLastQuestion ? '查看结果' : '下一题' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import QuestionDisplay from '../components/QuestionDisplay.vue'
import { getStorageItem, setStorageItem } from '../utils/storage'

const router = useRouter()
const questions = ref([])
const currentQuestionIndex = ref(0)
const selectedOption = ref(null)
const showAnswer = ref(false)
const answers = ref([])

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
const isLastQuestion = computed(() => currentQuestionIndex.value === questions.value.length - 1)

onMounted(() => {
  const savedQuestions = getStorageItem('questions')
  if (!savedQuestions) {
    router.push('/')
    return
  }
  
  questions.value = savedQuestions
  const progress = getStorageItem('currentProgress')
  if (progress) {
    currentQuestionIndex.value = progress.currentQuestion
    answers.value = progress.answers
  }
})

const handleSelectOption = (option) => {
  selectedOption.value = option
}

const submitAnswer = () => {
  showAnswer.value = true
  answers.value[currentQuestionIndex.value] = {
    selected: selectedOption.value,
    correct: selectedOption.value === currentQuestion.value.answer
  }
  saveProgress()
}

const nextQuestion = () => {
  if (isLastQuestion.value) {
    finishPractice()
  } else {
    currentQuestionIndex.value++
    selectedOption.value = null
    showAnswer.value = false
  }
}

const previousQuestion = () => {
  currentQuestionIndex.value--
  selectedOption.value = answers.value[currentQuestionIndex.value]?.selected ?? null
  showAnswer.value = true
}

const saveProgress = () => {
  setStorageItem('currentProgress', {
    currentQuestion: currentQuestionIndex.value,
    answers: answers.value
  })
}

const finishPractice = () => {
  const score = answers.value.filter(answer => answer.correct).length
  setStorageItem('practiceResult', {
    score,
    totalQuestions: questions.value.length,
    answers: answers.value
  })
  router.push('/result')
}

onBeforeRouteLeave((to, from) => {
  if (to.path !== '/result' && answers.value.length > 0) {
    return window.confirm('确定要退出吗？当前进度将会保存')
  }
  return true
})
</script>

<style scoped>
.practice {
  min-height: 100vh;
  padding: 20px;
  background: #f5f5f5;
}

.practice-container {
  max-width: 800px;
  margin: 0 auto;
}

.actions {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.submit-btn {
  padding: 12px 24px;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1em;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.navigation {
  display: flex;
  gap: 12px;
}

.nav-btn {
  padding: 12px 24px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style> 