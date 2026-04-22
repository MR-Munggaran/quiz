import { login } from './actions'

export default function LoginPage() {
  return (
    <form action={login} className="flex flex-col gap-4 max-w-sm mx-auto mt-20">
      <input name="email" placeholder="Email" className="border p-2" />
      <input name="password" type="password" placeholder="Password" className="border p-2" />
      <button type="submit" className="bg-black text-white p-2">
        Login
      </button>
    </form>
  )
}