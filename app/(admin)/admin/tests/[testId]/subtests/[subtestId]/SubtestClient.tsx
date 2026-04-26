'use client'

import { useState, useTransition } from 'react'
import { createQuestion, updateQuestion, deleteQuestion, importQuestionsFromCSV } from '@/lib/actions/admin'

type Option = { id: string; content: string; is_correct: boolean; order_index: number }
type Question = { id: string; content: string; order_index: number; question_options: Option[] }
type Subtest = { id: string; name: string; duration_minutes: number; test_id: string }

interface Props {
  subtest: Subtest
  questions: Question[]
  testId: string
}

export default function SubtestQuestionsClient({ subtest, questions: initialQuestions, testId }: Props) {
  const [questions, setQuestions] = useState(initialQuestions)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [csvContent, setCsvContent] = useState('')
  const [csvResult, setCsvResult] = useState<{ imported: number; errors: string[]; total: number } | null>(null)
  const [isPending, startTransition] = useTransition()
  const [showCsvGuide, setShowCsvGuide] = useState(false)

  const getCorrectOption = (opts: Option[]) => {
    const correct = opts.find(o => o.is_correct)
    if (!correct) return 'A'
    return String.fromCharCode(65 + correct.order_index)
  }

  const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    setCsvContent(text)
  }

  const handleCSVImport = async () => {
    if (!csvContent) return alert('Pilih file CSV terlebih dahulu')
    const formData = new FormData()
    formData.set('subtest_id', subtest.id)
    formData.set('test_id', testId)
    formData.set('csv_content', csvContent)

    startTransition(async () => {
      try {
        const result = await importQuestionsFromCSV(formData)
        setCsvResult(result)
        if (result.imported > 0) {
          window.location.reload()
        }
      } catch (err: any) {
        alert('Gagal import: ' + err.message)
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            📝 Soal: {subtest.name}
          </h2>
          <p className="text-sm text-gray-500">⏱ {subtest.duration_minutes} menit · {questions.length} soal</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
        >
          {showForm ? '✕ Batal' : '+ Tambah Soal'}
        </button>
      </div>

      {/* Form Tambah Soal */}
      {showForm && (
        <form action={async (fd) => { await createQuestion(fd); setShowForm(false) }}
          className="bg-blue-50 rounded-xl border border-blue-200 p-6 space-y-4">
          <h3 className="font-bold text-blue-900 text-sm">Tambah Soal Baru</h3>
          <input type="hidden" name="subtest_id" value={subtest.id} />
          <input type="hidden" name="test_id" value={testId} />
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Nomor Urut</label>
            <input name="order_index" type="number" defaultValue={questions.length + 1} min={1}
              className="w-24 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Isi Soal *</label>
            <textarea name="content" placeholder="Tulis pertanyaan di sini..." required rows={3}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {['A', 'B', 'C', 'D', 'E'].map(l => (
              <div key={l}>
                <label className="block text-xs font-medium text-gray-700 mb-1">Opsi {l}</label>
                <input name={`option_${l}`} placeholder={`Isi opsi ${l}...`}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Jawaban Benar *</label>
            <select name="correct_option" required
              className="border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
              {['A', 'B', 'C', 'D', 'E'].map(l => <option key={l} value={l}>Opsi {l}</option>)}
            </select>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg text-sm">
              Simpan Soal
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              className="border border-gray-300 text-gray-600 font-medium px-5 py-2 rounded-lg text-sm hover:bg-gray-50">
              Batal
            </button>
          </div>
        </form>
      )}

      {/* Upload CSV */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-900">📤 Upload Soal via CSV</h3>
          <button onClick={() => setShowCsvGuide(!showCsvGuide)}
            className="text-xs text-blue-600 hover:underline">
            {showCsvGuide ? 'Sembunyikan Panduan' : 'Lihat Format CSV'}
          </button>
        </div>

        {showCsvGuide && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg text-xs font-mono text-gray-600 border">
            <p className="font-sans font-bold text-gray-700 mb-2 text-sm">Format kolom CSV:</p>
            <p>order_index, content, option_A, option_B, option_C, option_D, option_E, correct_option</p>
            <p className="mt-2 font-sans text-gray-500">Contoh:</p>
            <p>1,"Berapakah 2+2?","2","3","4","5","6","C"</p>
            <p>2,"Ibu kota Indonesia?","Jakarta","Surabaya","Bandung","Medan","Yogyakarta","A"</p>
          </div>
        )}

        <div className="flex items-center gap-3">
          <input type="file" accept=".csv" onChange={handleCSVUpload}
            className="block text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-xs file:font-medium file:text-gray-700 file:bg-gray-50 hover:file:bg-gray-100" />
          <button onClick={handleCSVImport} disabled={isPending || !csvContent}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-medium px-5 py-2 rounded-lg text-sm transition-colors">
            {isPending ? 'Mengimport...' : 'Import CSV'}
          </button>
        </div>

        {csvResult && (
          <div className={`mt-3 p-3 rounded-lg text-sm ${csvResult.errors.length > 0 ? 'bg-yellow-50 border border-yellow-200' : 'bg-green-50 border border-green-200'}`}>
            <p className="font-medium">
              ✅ {csvResult.imported} dari {csvResult.total} soal berhasil diimport
            </p>
            {csvResult.errors.length > 0 && (
              <ul className="mt-2 space-y-0.5 text-red-600 text-xs">
                {csvResult.errors.map((e, i) => <li key={i}>⚠ {e}</li>)}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Daftar Soal */}
      <div className="space-y-3">
        {questions.map((q, idx) => (
          <div key={q.id} className="bg-white rounded-xl border border-gray-200 p-5">
            {editingId === q.id ? (
              <form action={async (fd) => { await updateQuestion(fd); setEditingId(null) }} className="space-y-4">
                <input type="hidden" name="id" value={q.id} />
                <input type="hidden" name="subtest_id" value={subtest.id} />
                <input type="hidden" name="test_id" value={testId} />
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Nomor Urut</label>
                  <input name="order_index" type="number" defaultValue={q.order_index}
                    className="w-20 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Isi Soal</label>
                  <textarea name="content" defaultValue={q.content} rows={3}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['A', 'B', 'C', 'D', 'E'].map((l, i) => (
                    <div key={l}>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Opsi {l}</label>
                      <input name={`option_${l}`} defaultValue={q.question_options.find(o => o.order_index === i)?.content || ''}
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Jawaban Benar</label>
                  <select name="correct_option" defaultValue={getCorrectOption(q.question_options)}
                    className="border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                    {['A', 'B', 'C', 'D', 'E'].map(l => <option key={l} value={l}>Opsi {l}</option>)}
                  </select>
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm">Simpan</button>
                  <button type="button" onClick={() => setEditingId(null)} className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">Batal</button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-900 text-white text-xs font-bold">{idx + 1}</span>
                      <p className="text-sm font-medium text-gray-900">{q.content}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-3">
                      {q.question_options
                        .sort((a, b) => a.order_index - b.order_index)
                        .map((opt) => (
                          <div key={opt.id}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs border ${opt.is_correct ? 'bg-green-50 border-green-300 text-green-800 font-semibold' : 'bg-gray-50 border-gray-100 text-gray-600'}`}>
                            <span className="font-bold">{String.fromCharCode(65 + opt.order_index)}.</span>
                            <span>{opt.content}</span>
                            {opt.is_correct && <span className="ml-auto">✓</span>}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => setEditingId(q.id)}
                      className="text-xs px-3 py-1.5 border border-blue-200 text-blue-600 hover:bg-blue-50 rounded-lg font-medium">
                      Edit
                    </button>
                    <form action={deleteQuestion.bind(null, q.id, subtest.id, testId)} className="inline">
                      <button type="submit"
                        onClick={e => { if (!confirm('Hapus soal ini?')) e.preventDefault() }}
                        className="text-xs px-3 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg font-medium">
                        Hapus
                      </button>
                    </form>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}

        {questions.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300 text-gray-400">
            <p className="text-lg">📭</p>
            <p className="text-sm mt-2">Belum ada soal. Tambah soal atau upload via CSV.</p>
          </div>
        )}
      </div>
    </div>
  )
}