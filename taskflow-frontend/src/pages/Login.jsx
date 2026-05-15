import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Eye, EyeOff, Command } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../api/axios'
import { useAuth } from '../hooks/useAuth'

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required()
})

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/auth/login', data)
      login(response.data.token, response.data.user)
      toast.success('Welcome back')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa] px-4 font-sans antialiased">
      <div className="w-full max-w-[420px] border border-[#eee] bg-white p-12 shadow-2xl">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-10 w-10 items-center justify-center bg-black text-white font-bold text-sm">T</div>
          <h1 className="text-2xl font-bold tracking-tight text-[#111]">Sign in to TaskFlow</h1>
          <p className="mt-2 text-sm text-[#666] font-medium">Welcome back to the studio.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#111]">Email Address</label>
            <input 
              type="email" 
              placeholder="name@company.com" 
              {...register('email')}
              className={`w-full border ${errors.email ? 'border-red-500' : 'border-[#eee]'} bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 transition-all`}
            />
            {errors.email && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5 relative">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#111]">Password</label>
              <Link to="#" className="text-[10px] font-black uppercase text-[#888] hover:text-black">Forgot?</Link>
            </div>
            <div className="relative">
              <input 
                type={visible ? 'text' : 'password'} 
                placeholder="••••••••" 
                {...register('password')}
                className={`w-full border ${errors.password ? 'border-red-500' : 'border-[#eee]'} bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 transition-all`}
              />
              <button 
                type="button" 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-black" 
                onClick={() => setVisible((v) => !v)}
              >
                {visible ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.password.message}</p>}
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-[#333] transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Authenticating...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-10 flex items-center justify-center gap-2 text-[11px] font-bold text-[#666] border border-[#eee] py-3 cursor-pointer hover:bg-white hover:border-[#ddd] transition-all">
          <Command className="h-3 w-3" />
          <span>Login with SSO</span>
        </div>

        <div className="mt-8 text-center text-xs font-medium text-[#666]">
          Don&apos;t have an account? <Link to="/signup" className="font-black text-[#111] hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  )
}
