<template>
  <div class="app">
    <header class="header">🧠 IQ Test</header>

    <main class="main" :class="{ 'has-sidebar': !started && !finished }">
      <!-- Боковые панели -->
      <aside v-if="!started && !finished" class="sidebar left">
        <h3>📖 Что такое IQ?</h3>
        <p>IQ (Intelligence Quotient) — коэффициент интеллекта, измеряющий уровень умственных способностей.</p>
        <p>Тест оценивает логическое мышление, анализ и способность находить закономерности.</p>
      </aside>

      <!-- Стартовый экран -->
      <div v-if="!started && !finished" class="screen start-screen">
        <h1>Проверь интеллект</h1>
        <div class="info">
          <span>📝 20 вопросов</span>
          <span>⏱️ 20 минут</span>
        </div>
        <button class="btn-primary" @click="startTest">Начать →</button>
      </div>

      <!-- Экран теста -->
      <div v-if="started && !finished" class="screen test-screen">
        <div class="header-bar">
          <div class="progress"><div class="fill" :style="{ width: progress + '%' }"></div></div>
          <span :class="['timer', { warning: timeLeft <= 120 }]">⏱️ {{ ft(timeLeft) }}</span>
          <button class="btn-exit" @click="exitTest">✕ Выйти</button>
        </div>

        <QuestionView
          :n="cur + 1" :t="q.length" :q="cq.q"
          :opts="cq.o" :sel="ans[cur]" :d="cq.d"
          @select="ans[cur] = $event"
        />

        <div class="nav">
          <button v-if="cur > 0" class="btn-nav" @click="cur--">← Назад</button>
          <button v-if="cur < q.length - 1" class="btn-nav" @click="cur++" :disabled="ans[cur] == null">Далее →</button>
          <button v-else class="btn-ok" @click="finish" :disabled="ans.includes(null)">✓ Завершить</button>
        </div>
      </div>

      <!-- Боковая панель справа -->
      <aside v-if="!started && !finished" class="sidebar right">
        <h3>📊 Результат</h3>
        <p><strong>130+</strong> — Очень одарённый 🏆</p>
        <p><strong>120–129</strong> — Одарённый 🌟</p>
        <p><strong>110–119</strong> — Выше среднего 📈</p>
        <p><strong>100–109</strong> — Средний 📊</p>
        <p><strong>90–99</strong> — Ниже среднего 📉</p>
        <p><strong>&lt;90</strong> — Начальный 🌱</p>
      </aside>

      <!-- Результаты -->
      <div v-if="finished" class="screen result">
        <div class="circle"><div class="score">{{ iq }}</div><div>IQ</div></div>
        <h2>{{ lv.e }} {{ lv.l }}</h2>
        <div class="stats">
          <div class="stat"><div class="v">{{ cor }}/{{ q.length }}</div><div>Правильных</div></div>
          <div class="stat"><div class="v">{{ spent }}</div><div>Время</div></div>
          <div class="stat"><div class="v">{{ acc }}%</div><div>Точность</div></div>
        </div>
        <button class="btn-primary" @click="restart">🔄 Заново</button>
      </div>
    </main>

    <footer class="footer">© 2026 IQ Test • Создано на Vue.js</footer>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { questions as q, calcIQ, getIQLevel } from './data/quizData.js'
import QuestionView from './components/QuestionView.vue'

const TOTAL_TIME = 20 * 60
const started = ref(false), finished = ref(false), cur = ref(0)
const ans = ref(Array(q.length).fill(null))
const timeLeft = ref(TOTAL_TIME), tm = ref(0), ti = null
let startTime = 0

const cq = computed(() => q[cur.value])
const progress = computed(() => (cur.value + 1) / q.length * 100)
const cor = computed(() => q.reduce((s, x, i) => s + (ans.value[i] === x.a ? 1 : 0), 0))
const iq = computed(() => calcIQ(cor.value, tm.value))
const lv = computed(() => getIQLevel(iq.value))
const acc = computed(() => Math.round(cor.value / q.length * 100))
const spent = computed(() => ft(tm.value))

function tick() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000)
  tm.value = elapsed
  timeLeft.value = Math.max(0, TOTAL_TIME - elapsed)
  if (timeLeft.value <= 0) { finish(); return }
  ti = setTimeout(tick, 1000)
}

function startTest() {
  started.value = true
  startTime = Date.now()
  tick()
}
const finish = () => { finished.value = true; clearTimeout(ti) }
const exitTest = () => { if (confirm('Выйти? Прогресс будет потерян')) restart() }
const restart = () => {
  started.value = false; finished.value = false; cur.value = 0
  ans.value = Array(q.length).fill(null); timeLeft.value = TOTAL_TIME; tm.value = 0
}
const ft = s => {
  const m = Math.max(0, ~~(s / 60)), sec = Math.max(0, s % 60)
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}
onUnmounted(() => clearTimeout(ti))
</script>

<style scoped>
.app { min-height: 100vh; display: flex; flex-direction: column; background: url('/background.jpg') center/cover no-repeat fixed; }
.app::before { content: ''; position: fixed; inset: 0; background: rgba(0, 0, 0, 0.4); z-index: 0; }
.app > * { position: relative; z-index: 1; }
.header {
  background: rgba(102, 126, 234, 0.9); backdrop-filter: blur(10px);
  color: #fff; padding: 1rem 2rem; font-size: 1.4rem; font-weight: 700;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}
.main { flex: 1; display: flex; align-items: center; justify-content: center; padding: 2rem; }
.main.has-sidebar { display: grid; grid-template-columns: 300px 1fr 300px; gap: 2rem; align-items: center; }
.sidebar {
  background: rgba(255,255,255,0.95); padding: 1.8rem; border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1); animation: fade 0.5s ease;
  min-height: 250px;
  margin: auto 0;
}
.sidebar h3 { color: #667eea; font-size: 1.1rem; margin-bottom: 1rem; font-weight: 600; }
.sidebar p { color: #4a5568; font-size: 0.95rem; line-height: 1.6; margin-bottom: 0.6rem; }
.sidebar p strong { color: #2d3748; }
.screen { max-width: 650px; width: 100%; animation: fade 0.5s ease; justify-self: center; }
.start-screen { text-align: center; }
.start-screen h1 { font-size: 2.5rem; margin-bottom: 1.5rem; color: #fff; text-shadow: 0 2px 8px rgba(0,0,0,0.3); }
.info { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
.info span {
  background: rgba(255,255,255,0.95); padding: 1rem; border-radius: 12px;
  font-size: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.header-bar {
  display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;
  background: rgba(255,255,255,0.95); padding: 0.8rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.progress { flex: 1; height: 8px; background: #e2e8f0; border-radius: 10px; overflow: hidden; }
.fill { height: 100%; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 10px; transition: width 0.3s; }
.timer { color: #667eea; font-weight: 600; white-space: nowrap; }
.timer.warning { color: #e53e3e; animation: blink 1s infinite; }
.btn-exit { background: #e53e3e; color: #fff; width: auto; padding: 0.5rem 1rem; font-size: 0.9rem; }
.btn-exit:hover { background: #c53030; }
.nav { display: flex; gap: 1rem; margin-top: 1rem; }
.result { text-align: center; }
.circle {
  background: rgba(255,255,255,0.95); width: 150px; height: 150px;
  border-radius: 50%; margin: 0 auto 1rem; display: flex; flex-direction: column;
  justify-content: center; align-items: center; box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
.score { font-size: 3rem; font-weight: 800; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.result h2 { font-size: 1.8rem; margin-bottom: 1.5rem; color: #fff; text-shadow: 0 2px 8px rgba(0,0,0,0.3); }
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
.stat { background: rgba(255,255,255,0.95); padding: 1rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.v { font-size: 1.4rem; font-weight: 700; color: #667eea; margin-bottom: 0.3rem; }
button { width: 100%; padding: 1rem; border: none; border-radius: 12px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: all 0.3s; }
.btn-primary { background: linear-gradient(135deg, #667eea, #764ba2); color: #fff; }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(102,126,234,0.5); }
.btn-nav { background: rgba(255,255,255,0.9); color: #667eea; }
.btn-ok { background: #48bb78; color: #fff; }
button:disabled { opacity: 0.5; cursor: not-allowed; }
.footer { text-align: center; padding: 1rem; color: #fff; font-size: 0.9rem; background: rgba(0,0,0,0.3); backdrop-filter: blur(5px); }
@keyframes fade { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
@media (max-width: 1024px) { .main.has-sidebar { grid-template-columns: 1fr; } .sidebar { display: none; } }
@media (max-width: 768px) { .main { padding: 1rem; } .start-screen h1 { font-size: 2rem; } .info, .stats { grid-template-columns: 1fr; } .circle { width: 120px; height: 120px; } .score { font-size: 2.5rem; } }
</style>
