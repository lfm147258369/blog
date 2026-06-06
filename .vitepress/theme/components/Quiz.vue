<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  type: { type: String, default: 'single' },
  question: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  answer: { type: [String, Array], default: '' },
  explanation: { type: String, default: '' },
  q: { type: Object, default: null },
})

const quizType = computed(() => props.q?.type || props.type)
const quizQuestion = computed(() => props.q?.question || props.question)
const quizOptions = computed(() => props.q?.options || props.options)
const quizAnswer = computed(() => props.q?.answer || props.answer)
const quizExplanation = computed(() => props.q?.explanation || props.explanation)

const selected = ref(quizType.value === 'multi' ? [] : null)

const submitted = ref(false)

const typeLabel = computed(() => {
  return { single: '单选题', multi: '多选题', tf: '判断题' }[quizType.value] || ''
})

const correctAnswers = computed(() =>
  Array.isArray(quizAnswer.value) ? quizAnswer.value : [quizAnswer.value]
)

const isCorrect = computed(() => {
  if (!submitted.value) return null
  if (quizType.value === 'multi') {
    const s = [...selected.value].sort()
    const a = [...correctAnswers.value].sort()
    return s.length === a.length && s.every((v, i) => v === a[i])
  }
  return selected.value === correctAnswers.value[0]
})

function labelOf(i) {
  return String.fromCharCode(65 + i)
}

function textOf(opt) {
  return opt.replace(/^[A-E]\.\s*/, '')
}

function optionClass(i) {
  if (!submitted.value) {
    // Pre-submission: highlight selected options for multi-choice
    if (quizType.value === 'multi' && selected.value.includes(labelOf(i))) return 'selected'
    return ''
  }
  const letter = labelOf(i)
  const isCorrectAns = correctAnswers.value.includes(letter)
  const isSelected =
    quizType.value === 'multi'
      ? selected.value.includes(letter)
      : selected.value === letter

  if (isCorrectAns && isSelected) return 'correct'
  if (isCorrectAns) return 'correct-missed'
  if (isSelected && !isCorrectAns) return 'wrong'
  return 'dimmed'
}

function iconOf(i) {
  const letter = labelOf(i)
  const isCorrectAns = correctAnswers.value.includes(letter)
  const isSelected =
    quizType.value === 'multi'
      ? selected.value.includes(letter)
      : selected.value === letter
  if (isCorrectAns && isSelected) return '✅'
  if (isCorrectAns) return '✅'
  if (isSelected) return '❌'
  return ''
}

function handleOptionClick(i) {
  if (submitted.value) return
  const letter = labelOf(i)
  if (quizType.value === 'single') {
    selected.value = letter
    submitted.value = true
  } else if (quizType.value === 'multi') {
    const idx = selected.value.indexOf(letter)
    if (idx > -1) selected.value.splice(idx, 1)
    else selected.value.push(letter)
  }
}

function selectTF(val) {
  if (submitted.value) return
  selected.value = val
  submitted.value = true
}

function submitMulti() {
  if (selected.value.length === 0) return
  submitted.value = true
}

function reset() {
  selected.value = quizType.value === 'multi' ? [] : null
  submitted.value = false
}
</script>

<template>
  <div class="quiz-card" :class="{ submitted }">
    <span class="quiz-type-tag">{{ typeLabel }}</span>
    <div class="quiz-question" v-html="quizQuestion" />

    <div class="quiz-options">
      <template v-if="quizType !== 'tf'">
        <div
          v-for="(opt, i) in quizOptions"
          :key="i"
          class="quiz-option"
          :class="optionClass(i)"
          @click="handleOptionClick(i)"
        >
          <span class="quiz-option-letter">{{ labelOf(i) }}</span>
          <span class="quiz-option-text">{{ textOf(opt) }}</span>
          <span class="quiz-option-icon" v-if="submitted">{{ iconOf(i) }}</span>
        </div>
        <button
          v-if="quizType === 'multi' && !submitted"
          class="quiz-submit-btn"
          :disabled="selected.length === 0"
          @click="submitMulti"
        >
          提交答案
        </button>
      </template>

      <template v-else>
        <div class="quiz-tf-group">
          <button
            class="quiz-tf-btn"
            :class="{
              selected: !submitted && selected === 'true',
              correct: submitted && correctAnswers[0] === 'true',
              wrong: submitted && selected === 'true' && correctAnswers[0] !== 'true',
            }"
            @click="selectTF('true')"
          >
            ✅ 正确
          </button>
          <button
            class="quiz-tf-btn"
            :class="{
              selected: !submitted && selected === 'false',
              correct: submitted && correctAnswers[0] === 'false',
              wrong: submitted && selected === 'false' && correctAnswers[0] !== 'false',
            }"
            @click="selectTF('false')"
          >
            ❌ 错误
          </button>
        </div>
      </template>
    </div>

    <div v-if="submitted" class="quiz-result" :class="isCorrect ? 'correct' : 'wrong'">
      <div class="quiz-result-header">
        <strong v-if="isCorrect">✅ 回答正确！</strong>
        <strong v-else>❌ 回答错误</strong>
        <span class="quiz-answer-hint" v-if="!isCorrect && quizType !== 'tf'">
          正确答案：{{ Array.isArray(quizAnswer) ? quizAnswer.join('、') : quizAnswer }}
        </span>
        <span class="quiz-answer-hint" v-else-if="!isCorrect && quizType === 'tf'">
          正确答案：{{ quizAnswer === 'true' ? '正确' : '错误' }}
        </span>
        <button class="quiz-retry-btn" @click="reset">重新作答</button>
      </div>
      <div class="quiz-explanation" v-if="quizExplanation">
        <strong>解析：</strong>{{ quizExplanation }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.quiz-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px 24px;
  margin: 16px 0;
  background: var(--vp-c-bg-soft);
  position: relative;
  transition: border-color 0.2s;
}

.quiz-card.submitted {
  border-color: var(--vp-c-divider);
}

.quiz-type-tag {
  display: inline-block;
  font-size: 12px;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-radius: 4px;
  padding: 2px 8px;
  margin-bottom: 12px;
}

.quiz-question {
  font-weight: 600;
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 14px;
  color: var(--vp-c-text-1);
}

/* Options */
.quiz-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.quiz-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.15s;
  background: var(--vp-c-bg);
}

.quiz-option:hover:not(.correct):not(.wrong):not(.dimmed) {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.quiz-option-letter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  font-weight: 700;
  font-size: 13px;
  flex-shrink: 0;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.quiz-option.correct .quiz-option-letter {
  background: #16a34a;
  color: #fff;
  border-color: #16a34a;
}

.quiz-option.wrong .quiz-option-letter {
  background: #dc2626;
  color: #fff;
  border-color: #dc2626;
}

.quiz-option-text {
  flex: 1;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.quiz-option-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.quiz-option.correct {
  border-color: #16a34a;
  background: #f0fdf4;
}

.quiz-option.correct-missed {
  border-color: #16a34a;
  background: #fefce8;
  opacity: 0.9;
}

.quiz-option.wrong {
  border-color: #dc2626;
  background: #fef2f2;
}

.quiz-option.dimmed {
  opacity: 0.5;
  cursor: default;
}

/* Pre-submission selected state (multi-choice) */
.quiz-option.selected {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.quiz-option.selected .quiz-option-letter {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

/* Multi submit */
.quiz-submit-btn {
  margin-top: 4px;
  padding: 8px 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  color: #fff;
  background: var(--vp-c-brand-1);
  transition: opacity 0.15s;
  align-self: flex-start;
}

.quiz-submit-btn:hover:not(:disabled) {
  opacity: 0.85;
}

.quiz-submit-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* TF buttons */
.quiz-tf-group {
  display: flex;
  gap: 12px;
}

.quiz-tf-btn {
  flex: 1;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  border: 2px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: all 0.15s;
}

.quiz-tf-btn:hover:not(.correct):not(.wrong) {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.quiz-tf-btn.selected {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.quiz-tf-btn.correct {
  border-color: #16a34a;
  background: #f0fdf4;
  color: #16a34a;
}

.quiz-tf-btn.wrong {
  border-color: #dc2626;
  background: #fef2f2;
  color: #dc2626;
}

/* Result */
.quiz-result {
  margin-top: 14px;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1.7;
}

.quiz-result.correct {
  border: 1px solid #16a34a;
  background: #f0fdf4;
}

.quiz-result.wrong {
  border: 1px solid #dc2626;
  background: #fef2f2;
}

.quiz-result-header {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 4px;
}

.quiz-answer-hint {
  font-size: 13px;
  opacity: 0.8;
}

.quiz-explanation {
  margin-top: 6px;
  font-size: 13px;
}

.quiz-retry-btn {
  margin-left: auto;
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  background: transparent;
  color: var(--vp-c-text-2);
  transition: all 0.15s;
}

.quiz-retry-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

/* Dark mode */
html.dark .quiz-option.correct {
  background: #052e16;
}
html.dark .quiz-option.correct-missed {
  background: #2e2005;
}
html.dark .quiz-option.wrong {
  background: #2e0510;
}
html.dark .quiz-result.correct {
  background: #052e16;
}
html.dark .quiz-result.wrong {
  background: #2e0510;
}
html.dark .quiz-tf-btn.correct {
  background: #052e16;
}
html.dark .quiz-tf-btn.wrong {
  background: #2e0510;
}
</style>
