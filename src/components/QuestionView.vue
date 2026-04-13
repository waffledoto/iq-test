<template>
  <div class="card">
    <div class="head">
      <span class="num">Вопрос {{ questionNumber }}/{{ totalQuestions }}</span>
      <span class="stars">{{ '★'.repeat(difficulty).padEnd(3, '☆') }}</span>
    </div>
    <h2 class="text">{{ questionText }}</h2>
    <button v-for="(option, index) in options" :key="index" :class="['opt', { sel: selectedAnswer === index }]" @click="$emit('select', index)">
      <span class="let">{{ String.fromCharCode(65 + index) }}</span> {{ option }}
    </button>
  </div>
</template>

<script setup>
const {
  questionNumber,
  totalQuestions,
  questionText,
  options,
  selectedAnswer,
  difficulty
} = defineProps(['questionNumber', 'totalQuestions', 'questionText', 'options', 'selectedAnswer', 'difficulty'])
defineEmits(['select'])
</script>

<style scoped>
.card {
  background: #fff; border-radius: 20px; padding: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1); animation: slide 0.4s ease;
}
.head { display: flex; justify-content: space-between; margin-bottom: 1rem; }
.num {
  background: linear-gradient(135deg, #667eea, #764ba2); color: #fff;
  padding: 0.4rem 0.8rem; border-radius: 15px; font-weight: 600; font-size: 0.9rem;
}
.stars { color: #e0e0e0; font-size: 1.2rem; }
.text { font-size: 1.4rem; color: #2d3748; margin-bottom: 1.5rem; }
.opt {
  display: flex; align-items: center; gap: 0.8rem; width: 100%; padding: 1rem 1.2rem;
  border: 2px solid #e2e8f0; border-radius: 12px; background: #f7fafc;
  cursor: pointer; transition: all 0.3s; font-size: 1rem; text-align: left; margin-bottom: 0.8rem;
}
.opt:hover { border-color: #667eea; background: #edf2ff; transform: translateX(8px); }
.sel { border-color: #667eea; background: linear-gradient(135deg, #667eea20, #764ba220); }
.let {
  width: 32px; height: 32px; border-radius: 50%; background: #fff;
  display: flex; align-items: center; justify-content: center;
  font-weight: bold; color: #667eea; flex-shrink: 0;
}
.sel .let { background: linear-gradient(135deg, #667eea, #764ba2); color: #fff; }
@keyframes slide { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
@media (max-width: 768px) { .card { padding: 1.2rem; } .text { font-size: 1.1rem; } }
</style>
