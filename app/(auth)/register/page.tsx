import { register } from './actions'

export default function RegisterPage() {
  return (
    <form action={register} className="flex flex-col gap-4 max-w-sm mx-auto mt-20">
      <input name="email" placeholder="Email" className="border p-2" />
      <input name="password" type="password" placeholder="Password" className="border p-2" />

      <button type="submit" className="bg-black text-white p-2">
        Register
      </button>
    </form>
  )
}