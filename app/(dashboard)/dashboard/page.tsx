import { createClient } from '@/lib/supabase/server'
import { logout } from '@/lib/actions/auth'

export default async function Dashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="p-6">
      <h1>Hello {user?.email}</h1>

      <form action={logout}>
        <button className="mt-4 bg-black text-white px-4 py-2">
          Logout
        </button>
      </form>
    </div>
  )
}