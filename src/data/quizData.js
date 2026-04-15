export const questions = [
  { question: "Какое число продолжает ряд: 2, 6, 12, 20, ...?", options: ["28", "30", "32", "26"], correctAnswer: 1, difficulty: 2 },

  { question: "Книга относится к чтению, как вилка к:", options: ["Еде", "Кухне", "Металлу", "Ножу"], correctAnswer: 0, difficulty: 1 },

  { question: "Найдите лишнее слово: яблоко, банан, морковь, груша", options: ["Яблоко", "Банан", "Морковь", "Груша"], correctAnswer: 2, difficulty: 1 },

  { question: "Если все Bloops — Razzies, а все Razzies — Lazzies, то все Bloops — Lazzies?", options: ["Да", "Нет", "Неизвестно", "Иногда"], correctAnswer: 0, difficulty: 2 },

  { question: "Какое число следующее: 3, 9, 27, 81, ?", options: ["162", "243", "108", "324"], correctAnswer: 1, difficulty: 1 },

  { question: "Палец относится к руке, как лист к:", options: ["Дереву", "Ветке", "Корню", "Земле"], correctAnswer: 1, difficulty: 1 },

  { question: "Найдите следующее число: 1, 1, 2, 3, 5, 8, ...", options: ["11", "13", "10", "15"], correctAnswer: 1, difficulty: 2 },

  { question: "День относится к неделе, как час к:", options: ["Минуте", "Дню", "Году", "Времени"], correctAnswer: 1, difficulty: 1 },

  { question: "Какое число лишнее: 2, 3, 5, 7, 9, 11?", options: ["2", "9", "5", "11"], correctAnswer: 1, difficulty: 2 },

  { question: "5 кошек ловят 5 мышей за 5 мин. Сколько кошек нужно для 100 мышей за 100 мин?", options: ["100", "50", "5", "10"], correctAnswer: 2, difficulty: 3 },

  { question: "Продолжите ряд букв: AZ, BY, CX, ...?", options: ["DW", "EV", "FU", "DX"], correctAnswer: 0, difficulty: 3 },

  { question: "Квадрат имеет 4 стороны, шестиугольник имеет:", options: ["5", "6", "7", "8"], correctAnswer: 1, difficulty: 1 },

  { question: "Какое число пропущено: 4, 9, 16, 25, ?", options: ["30", "36", "49", "35"], correctAnswer: 1, difficulty: 2 },

  { question: "Тёплый — холодный, как светлый:", options: ["Яркий", "Тёмный", "Белый", "Серый"], correctAnswer: 1, difficulty: 1 },

  { question: "Следующее число: 100, 95, 85, 70, 50, ?", options: ["35", "25", "30", "20"], correctAnswer: 1, difficulty: 3 },

  { question: "Океан — вода, как пустыня:", options: ["Жар", "Песок", "Засуха", "Кактус"], correctAnswer: 1, difficulty: 1 },

  { question: "2, 6, 18, 54, ?", options: ["108", "162", "72", "216"], correctAnswer: 1, difficulty: 2 },

  { question: "Найдите лишнее: роза, тюльпан, берёза, лилия", options: ["Роза", "Тюльпан", "Берёза", "Лилия"], correctAnswer: 2, difficulty: 1 },

  { question: "Если A > B и B > C, то:", options: ["A > C", "C > A", "A = C", "Неизвестно"], correctAnswer: 0, difficulty: 2 },

  { question: "Завершите ряд: 1, 4, 9, 16, 25, 36, ?", options: ["42", "49", "64", "45"], correctAnswer: 1, difficulty: 2 }
]

export const calcIQ = (correctAnswersCount, elapsedTimeSeconds) => {
  const correctRatio = correctAnswersCount / questions.length

  const baseIQ = 70
  const scoreFromAnswers = correctRatio * 75

  const speedBonus = Math.max(0, (600 - elapsedTimeSeconds) / 600 * 10)

  const totalIQ = baseIQ + scoreFromAnswers + speedBonus

  return Math.round(Math.min(145, totalIQ))
}

export const getIQLevel = (iqScore) => {
  if (iqScore >= 130) return { label: "Очень одарённый", emoji: "🏆" }

  if (iqScore >= 120) return { label: "Одарённый", emoji: "🌟" }

  if (iqScore >= 110) return { label: "Выше среднего", emoji: "📈" }

  if (iqScore >= 100) return { label: "Средний", emoji: "📊" }

  if (iqScore >= 90) return { label: "Ниже среднего", emoji: "📉" }

  return { label: "Начальный", emoji: "🌱" }
}
