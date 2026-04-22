import { create } from 'zustand'

type AnswerMap = Record<string, string> // questionId → optionId

export type SubtestInfo = {
  subtestAttemptId: string
  subtestId: string
  title: string
  durationSeconds: number
  questions: Array<{
    id: string
    content: string
    question_options: Array<{ id: string; content: string }>
  }>
}

type ExamState = {
  // Timer
  timeLeft: number
  setTime: (time: number) => void
  tick: () => void

  // Navigasi soal
  currentQuestionIndex: number
  setCurrentQuestion: (index: number) => void

  // Multi-subtest
  subtests: SubtestInfo[]
  currentSubtestIndex: number
  setSubtests: (subtests: SubtestInfo[]) => void
  goToSubtest: (index: number) => void
  getCurrentSubtest: () => SubtestInfo | null

  // Jawaban (per subtestAttemptId)
  answers: Record<string, AnswerMap> // subtestAttemptId → AnswerMap
  setAnswer: (subtestAttemptId: string, questionId: string, optionId: string) => void
  getAnswersForSubtest: (subtestAttemptId: string) => AnswerMap

  // Callback auto-submit (diisi dari ExamClient)
  onTimeUp: (() => void) | null
  setOnTimeUp: (fn: () => void) => void

  reset: () => void
}

export const useExamStore = create<ExamState>((set, get) => ({
  timeLeft: 0,
  setTime: (time) => set({ timeLeft: time }),
  tick: () =>
    set((state) => {
      const newTime = state.timeLeft > 0 ? state.timeLeft - 1 : 0
      if (newTime === 0 && state.timeLeft > 0) {
        // Timer habis → panggil callback
        setTimeout(() => state.onTimeUp?.(), 0)
      }
      return { timeLeft: newTime }
    }),

  currentQuestionIndex: 0,
  setCurrentQuestion: (index) => set({ currentQuestionIndex: index }),

  subtests: [],
  currentSubtestIndex: 0,

  setSubtests: (subtests) => set({ subtests, currentSubtestIndex: 0 }),

  goToSubtest: (index) =>
    set((state) => {
      const subtest = state.subtests[index]
      if (!subtest) return {}
      return {
        currentSubtestIndex: index,
        currentQuestionIndex: 0,
        timeLeft: subtest.durationSeconds,
      }
    }),

  getCurrentSubtest: () => {
    const { subtests, currentSubtestIndex } = get()
    return subtests[currentSubtestIndex] ?? null
  },

  answers: {},
  setAnswer: (subtestAttemptId, questionId, optionId) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [subtestAttemptId]: {
          ...(state.answers[subtestAttemptId] ?? {}),
          [questionId]: optionId,
        },
      },
    })),
  getAnswersForSubtest: (subtestAttemptId) => get().answers[subtestAttemptId] ?? {},

  onTimeUp: null,
  setOnTimeUp: (fn) => set({ onTimeUp: fn }),

  reset: () =>
    set({
      timeLeft: 0,
      currentQuestionIndex: 0,
      subtests: [],
      currentSubtestIndex: 0,
      answers: {},
      onTimeUp: null,
    }),
}))
