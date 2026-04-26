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

  // Jawaban (per subtestAttemptId)
  answers: Record<string, AnswerMap>
  setAnswer: (subtestAttemptId: string, questionId: string, optionId: string) => void

  // Callback auto-submit
  onTimeUp: (() => void) | null
  setOnTimeUp: (fn: () => void) => void

  reset: () => void
}

export const useExamStore = create<ExamState>((set, get) => ({
  // ================= TIMER =================
  timeLeft: 0,

  setTime: (time) => set({ timeLeft: time }),

  tick: () =>
    set((state) => {
      const newTime = state.timeLeft > 0 ? state.timeLeft - 1 : 0

      if (newTime === 0 && state.timeLeft > 0) {
        // Gunakan setTimeout untuk menghindari update state saat rendering
        setTimeout(() => {
          const currentOnTimeUp = get().onTimeUp
          if (currentOnTimeUp) currentOnTimeUp()
        }, 0)
      }

      return { timeLeft: newTime }
    }),

  // ================= NAVIGATION =================
  currentQuestionIndex: 0,

  setCurrentQuestion: (index) =>
    set({ currentQuestionIndex: index }),

  // ================= SUBTEST =================
  subtests: [],
  currentSubtestIndex: 0,

  setSubtests: (subtests) =>
    set({
      subtests,
      currentSubtestIndex: 0,
      currentQuestionIndex: 0, // Reset index soal saat set subtests baru
    }),

  goToSubtest: (index) =>
    set((state) => {
      const subtest = state.subtests[index]
      if (!subtest) return {}

      return {
        currentSubtestIndex: index,
        currentQuestionIndex: 0, // Reset ke soal pertama di subtest baru
        timeLeft: subtest.durationSeconds,
      }
    }),

  // ================= ANSWERS =================
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

  // ================= CALLBACK =================
  onTimeUp: null,

  setOnTimeUp: (fn) => set({ onTimeUp: fn }),

  // ================= RESET =================
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
