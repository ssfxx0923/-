<template>
  <div class="question-display">
    <div class="question-header">
      <span class="question-number">第 {{ currentIndex + 1 }} 题</span>
      <div class="progress">{{ currentIndex + 1 }} / {{ totalQuestions }}</div>
    </div>
    
    <div class="question-content">
      <p>{{ question.question }}</p>
    </div>

    <div class="options">
      <div
        v-for="(option, index) in question.options"
        :key="index"
        class="option"
        :class="{ 
          'selected': selectedOption === index,
          'correct': showAnswer && index === question.answer,
          'wrong': showAnswer && selectedOption === index && index !== question.answer
        }"
        @click="selectOption(index)"
      >
        <span class="option-label">{{ ['A', 'B', 'C', 'D'][index] }}.</span>
        <span class="option-content">{{ option }}</span>
      </div>
    </div>

    <div v-if="showAnswer && question.explanation" class="explanation">
      <h4>解析:</h4>
      <p>{{ question.explanation }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  question: {
    type: Object,
    required: true
  },
  currentIndex: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  selectedOption: {
    type: Number,
    default: null
  },
  showAnswer: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select-option'])

const selectOption = (index) => {
  if (!props.showAnswer) {
    emit('select-option', index)
  }
}
</script>

<style scoped>
.question-display {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.question-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.question-number {
  font-weight: bold;
  color: #333;
}

.progress {
  color: #666;
}

.question-content {
  margin-bottom: 20px;
  font-size: 1.1em;
  line-height: 1.6;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option {
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
}

.option:hover:not(.selected) {
  background: #f5f5f5;
}

.option.selected {
  background: #e3f2fd;
  border-color: #2196f3;
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
  margin-top: 20px;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 6px;
}

.explanation h4 {
  margin: 0 0 8px 0;
  color: #333;
}
</style> 