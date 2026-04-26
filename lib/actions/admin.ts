'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// ─── Helper: pastikan user adalah admin ───────────────────────────────────────
async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') redirect('/dashboard')

  return supabase
}

// ============================================================
// CRUD TEST
// ============================================================

export async function createTest(formData: FormData) {
  const supabase = await requireAdmin()

  const title                   = formData.get('title') as string
  const description             = formData.get('description') as string
  const global_duration_minutes = formData.get('global_duration_minutes')
    ? Number(formData.get('global_duration_minutes'))
    : null

  const { error } = await supabase.from('tests').insert({
    title,
    description,
    is_active: false,
    global_duration_minutes,
  })

  if (error) throw new Error(error.message)
  revalidatePath('/admin')
}

export async function updateTest(formData: FormData) {
  const supabase = await requireAdmin()

  const id                      = formData.get('id') as string
  const title                   = formData.get('title') as string
  const description             = formData.get('description') as string
  const global_duration_minutes = formData.get('global_duration_minutes')
    ? Number(formData.get('global_duration_minutes'))
    : null

  const { error } = await supabase
    .from('tests')
    .update({ title, description, global_duration_minutes, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin')
  revalidatePath('/admin/tests/' + id)
}

export async function deleteTest(testId: string) {
  const supabase = await requireAdmin()
  await supabase.from('tests').delete().eq('id', testId)
  revalidatePath('/admin')
}

export async function toggleTestStatus(testId: string, currentStatus: boolean) {
  const supabase = await requireAdmin()
  await supabase.from('tests').update({ is_active: !currentStatus }).eq('id', testId)
  revalidatePath('/admin')
  revalidatePath('/dashboard')
}

// ============================================================
// CRUD SUBTEST
// ============================================================

export async function createSubtest(formData: FormData) {
  const supabase = await requireAdmin()

  const test_id          = formData.get('test_id') as string
  const title            = formData.get('name') as string // Input form menggunakan 'name', tapi kolom DB adalah 'title'
  const duration_minutes = Number(formData.get('duration_minutes') || 30)
  const order_index      = Number(formData.get('order_index') || 0)

  const { error } = await supabase.from('subtests').insert({
    test_id, 
    title, // DIUBAH: dari 'name' ke 'title'
    duration_minutes, 
    order_index,
  })

  if (error) throw new Error(error.message)
  revalidatePath('/admin/tests/' + test_id)
}

export async function updateSubtest(formData: FormData) {
  const supabase = await requireAdmin()

  const id               = formData.get('id') as string
  const test_id          = formData.get('test_id') as string
  const title            = formData.get('name') as string // Input form menggunakan 'name', tapi kolom DB adalah 'title'
  const duration_minutes = Number(formData.get('duration_minutes') || 30)
  const order_index      = Number(formData.get('order_index') || 0)

  const { error } = await supabase
    .from('subtests')
    .update({ 
      title, // DIUBAH: dari 'name' ke 'title'
      duration_minutes, 
      order_index 
    })
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/admin/tests/' + test_id)
}

export async function deleteSubtest(subtestId: string, testId: string) {
  const supabase = await requireAdmin()
  await supabase.from('subtests').delete().eq('id', subtestId)
  revalidatePath('/admin/tests/' + testId)
}

// ============================================================
// CRUD QUESTION
// ============================================================

export async function createQuestion(formData: FormData) {
  const supabase = await requireAdmin()

  const subtest_id  = formData.get('subtest_id') as string
  const test_id     = formData.get('test_id') as string
  const content     = formData.get('content') as string
  const order_index = Number(formData.get('order_index') || 0)

  const { data: question, error } = await supabase
    .from('questions')
    .insert({ subtest_id, content, order_index })
    .select()
    .single()

  if (error) throw new Error(error.message)

  // Simpan opsi jawaban (A-E)
  const options: Array<{ question_id: string; content: string; is_correct: boolean; order_index: number }> = []
  const correct_option = formData.get('correct_option') as string

  for (let i = 0; i < 5; i++) {
    const label = String.fromCharCode(65 + i) // A, B, C, D, E
    const optContent = formData.get(`option_${label}`) as string
    if (optContent && optContent.trim()) {
      options.push({
        question_id: question.id,
        content: optContent.trim(),
        is_correct: correct_option === label,
        order_index: i,
      })
    }
  }

  if (options.length > 0) {
    const { error: optError } = await supabase.from('question_options').insert(options)
    if (optError) throw new Error(optError.message)
  }

  revalidatePath('/admin/tests/' + test_id + '/subtests/' + subtest_id)
}

export async function updateQuestion(formData: FormData) {
  const supabase = await requireAdmin()

  const id          = formData.get('id') as string
  const subtest_id  = formData.get('subtest_id') as string
  const test_id     = formData.get('test_id') as string
  const content     = formData.get('content') as string
  const order_index = Number(formData.get('order_index') || 0)

  const { error } = await supabase
    .from('questions')
    .update({ content, order_index })
    .eq('id', id)

  if (error) throw new Error(error.message)

  // Hapus opsi lama, simpan yang baru
  await supabase.from('question_options').delete().eq('question_id', id)

  const correct_option = formData.get('correct_option') as string
  const options: Array<{ question_id: string; content: string; is_correct: boolean; order_index: number }> = []

  for (let i = 0; i < 5; i++) {
    const label = String.fromCharCode(65 + i)
    const optContent = formData.get(`option_${label}`) as string
    if (optContent && optContent.trim()) {
      options.push({
        question_id: id,
        content: optContent.trim(),
        is_correct: correct_option === label,
        order_index: i,
      })
    }
  }

  if (options.length > 0) {
    await supabase.from('question_options').insert(options)
  }

  revalidatePath('/admin/tests/' + test_id + '/subtests/' + subtest_id)
}

export async function deleteQuestion(questionId: string, subtestId: string, testId: string) {
  const supabase = await requireAdmin()
  await supabase.from('questions').delete().eq('id', questionId)
  revalidatePath('/admin/tests/' + testId + '/subtests/' + subtestId)
}

// ============================================================
// UPDATE WAKTU (Setting Durasi)
// ============================================================

export async function updateTestDuration(formData: FormData) {
  const supabase = await requireAdmin()

  const test_id                 = formData.get('test_id') as string
  const global_duration_minutes = formData.get('global_duration_minutes')
    ? Number(formData.get('global_duration_minutes'))
    : null

  await supabase
    .from('tests')
    .update({ global_duration_minutes, updated_at: new Date().toISOString() })
    .eq('id', test_id)

  revalidatePath('/admin/tests/' + test_id)
}

export async function updateSubtestDuration(formData: FormData) {
  const supabase = await requireAdmin()

  const id               = formData.get('id') as string
  const test_id          = formData.get('test_id') as string
  const duration_minutes = Number(formData.get('duration_minutes'))

  await supabase.from('subtests').update({ duration_minutes }).eq('id', id)

  revalidatePath('/admin/tests/' + test_id)
}

// ============================================================
// UPLOAD SOAL VIA CSV
// ============================================================

export async function importQuestionsFromCSV(formData: FormData) {
  const supabase = await requireAdmin()

  const subtest_id  = formData.get('subtest_id') as string
  const test_id     = formData.get('test_id') as string
  const csvText     = formData.get('csv_content') as string

  if (!csvText || !subtest_id) throw new Error('Data CSV atau subtest tidak ditemukan')

  const lines = csvText.trim().split('\n').filter(Boolean)
  // Skip baris header
  const dataLines = lines.slice(1)

  let imported = 0
  const errors: string[] = []

  for (let i = 0; i < dataLines.length; i++) {
    const line = dataLines[i]
    // Parse CSV sederhana (koma sebagai delimiter, kutip ganda untuk escape)
    const cols = parseCSVLine(line)

    // Format: order_index, content, option_A, option_B, option_C, option_D, option_E, correct_option
    if (cols.length < 7) {
      errors.push(`Baris ${i + 2}: kolom tidak cukup (${cols.length} dari minimal 7)`)
      continue
    }

    const [order_str, content, opt_A, opt_B, opt_C, opt_D, opt_E, correct_option] = cols
    const order_index = parseInt(order_str) || (i + 1)

    if (!content.trim()) {
      errors.push(`Baris ${i + 2}: konten soal kosong`)
      continue
    }

    const correctLabel = (correct_option || '').trim().toUpperCase()
    if (!['A', 'B', 'C', 'D', 'E'].includes(correctLabel)) {
      errors.push(`Baris ${i + 2}: jawaban benar harus A/B/C/D/E, ditemukan "${correct_option}"`)
      continue
    }

    const { data: question, error: qErr } = await supabase
      .from('questions')
      .insert({ subtest_id, content: content.trim(), order_index })
      .select()
      .single()

    if (qErr) { errors.push(`Baris ${i + 2}: ${qErr.message}`); continue }

    const optList = [opt_A, opt_B, opt_C, opt_D, opt_E]
    const optLetters = ['A', 'B', 'C', 'D', 'E']

    const options = optList
      .map((opt, idx) => ({
        question_id: question.id,
        content: opt.trim(),
        is_correct: optLetters[idx] === correctLabel,
        order_index: idx,
      }))
      .filter(o => o.content !== '')

    if (options.length > 0) {
      await supabase.from('question_options').insert(options)
    }

    imported++
  }

  revalidatePath('/admin/tests/' + test_id + '/subtests/' + subtest_id)
  return { imported, errors, total: dataLines.length }
}

// Helper parse CSV line (handle quoted fields)
function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'; i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  result.push(current)
  return result
}
