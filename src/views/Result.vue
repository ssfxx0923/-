<template>
  <div class="result">
    <div class="result-container">
      <div class="score-card">
        <h1>练习完成!</h1>
        <div class="score">
          <div class="score-number">{{ result.score }}</div>
          <div class="score-total">/ {{ result.totalQuestions }}</div>
        </div>
        <div class="score-percentage">
          正确率: {{ (result.score / result.totalQuestions * 100).toFixed(1) }}%
        </div>
      </div>

      <div class="wrong-questions" v-if="wrongQuestions.length > 0">
        <h2>错题回顾</h2>
        <div class="question-list">
          <div 
            v-for="(question, index) in wrongQuestions" 
            :key="index"
            class="question-item"
          >
            <div class="question-content">
              <div class="question-number">第 {{ question.index + 1 }} 题</div>
              <p>{{ question.question }}</p>
            </div>
            
            <div class="options">
              <div 
                v-for="(option, optIndex) in question.options" 
                :key="optIndex"
                class="option"
                :class="{
                  'wrong': optIndex === question.selectedAnswer,
                  'correct': optIndex === question.answer
                }"
              >
                <span class="option-label">{{ ['A', 'B', 'C', 'D'][optIndex] }}.</span>
                <span class="option-content">{{ option }}</span>
              </div>
            </div>

            <div class="explanation" v-if="question.explanation">
              <h4>解析:</h4>
              <p>{{ question.explanation }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="actions">
        <button class="action-btn retry" @click="retryPractice">
          重新练习
        </button>
        <button class="action-btn home" @click="goHome">
          返回首页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getStorageItem, removeStorageItem } from '../utils/storage'

const router = useRouter()
const result = ref({
  score: 0,
  totalQuestions: 0,
  answers: []
})
const wrongQuestions = ref([])

onMounted(() => {
  const practiceResult = getStorageItem('practiceResult')
  const questions = getStorageItem('questions')
  
  if (!practiceResult || !questions) {
    router.push('/')
    return
  }

  result.value = practiceResult
  
  // 收集错题信息
  wrongQuestions.value = questions
    .map((question, index) => ({
      ...question,
      index,
      selectedAnswer: practiceResult.answers[index]?.selected
    }))
    .filter((question, index) => !practiceResult.answers[index]?.correct)
})

const retryPractice = () => {
  removeStorageItem('currentProgress')
  router.push('/practice')
}

const goHome = () => {
  removeStorageItem('currentProgress')
  removeStorageItem('practiceResult')
  router.push('/')
}
</script>

<style scoped>
.result {
  min-height: 100vh;
  padding: 20px;
  background: #f5f5f5;
}

.result-container {
  max-width: 800px;
  margin: 0 auto;
}

.score-card {
  background: white;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.score {
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin: 20px 0;
}

.score-number {
  font-size: 48px;
  font-weight: bold;
  color: #2196f3;
}

.score-total {
  font-size: 24px;
  color: #666;
  margin-left: 8px;
}

.score-percentage {
  font-size: 18px;
  color: #666;
}

.wrong-questions {
  margin-top: 30px;
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.question-list {
  margin-top: 20px;
}

.question-item {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 6px;
  margin-bottom: 20px;
}

.question-number {
  font-weight: bold;
  margin-bottom: 10px;
}

.options {
  margin: 15px 0;
}

.option {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.option.correct {
  background: #e8f5e9;
  border-color: #4caf50;
}

.option.wrong {
  background: #ffebee;
  border-color: #f44336;
}

.option-label {
  font-weight: bold;
  margin-right: 12px;
  min-width: 24px;
}

.explanation {
  margin-top: 15px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 4px;
}

.explanation h4 {
  margin: 0 0 8px 0;
  color: #333;
}

.actions {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.action-btn {
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1em;
  border: none;
}

.action-btn.retry {
  background: #2196f3;
  color: white;
}

.action-btn.home {
  background: white;
  border: 1px solid #ddd;
}

.action-btn:hover {
  opacity: 0.9;
}
</style> 