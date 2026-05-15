import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Eye, EyeOff, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../api/axios'
import { useAuth } from '../hooks/useAuth'

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Minimum 8 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm your password')
})

export default function Signup() {
  const { login } = useAuth()
  const [visible, setVisible] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async ({ confirmPassword, ...data }) => {
    try {
      const response = await api.post('/auth/signup', data)
      login(response.data.token, response.data.user)
      toast.success('Welcome to TaskFlow')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Signup failed')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fafafa] px-4 font-sans antialiased">
      <div className="w-full max-w-[440px] border border-[#eee] bg-white p-12 shadow-2xl">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-10 w-10 items-center justify-center bg-black text-white font-bold text-sm">T</div>
          <h1 className="text-2xl font-bold tracking-tight text-[#111]">Create your workspace</h1>
          <p className="mt-2 text-sm text-[#666] font-medium">Join the next generation of product teams.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#111]">Full Name</label>
            <input 
              placeholder="Elon Musk" 
              {...register('name')}
              className={`w-full border ${errors.name ? 'border-red-500' : 'border-[#eee]'} bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 transition-all`}
            />
            {errors.name && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#111]">Work Email</label>
            <input 
              type="email" 
              placeholder="name@company.com" 
              {...register('email')}
              className={`w-full border ${errors.email ? 'border-red-500' : 'border-[#eee]'} bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 transition-all`}
            />
            {errors.email && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.email.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 relative">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#111]">Password</label>
              <div className="relative">
                <input 
                  type={visible ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  {...register('password')}
                  className={`w-full border ${errors.password ? 'border-red-500' : 'border-[#eee]'} bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 transition-all`}
                />
              </div>
              {errors.password && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.password.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#111]">Confirm</label>
              <input 
                type={visible ? 'text' : 'password'} 
                placeholder="••••••••" 
                {...register('confirmPassword')}
                className={`w-full border ${errors.confirmPassword ? 'border-red-500' : 'border-[#eee]'} bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 transition-all`}
              />
              {errors.confirmPassword && <p className="text-[10px] font-bold text-red-500 uppercase">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div className="flex items-center gap-2 py-2">
             <input type="checkbox" id="terms" className="h-3 w-3 border-[#eee] rounded-none checked:bg-black" required />
             <label htmlFor="terms" className="text-[11px] font-medium text-[#666]">I agree to the <span className="text-black font-bold underline cursor-pointer">Terms of Service</span></label>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-[#333] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Creating...' : <><Sparkles size={14} /> Create account</>}
          </button>
        </form>

        <div className="mt-10 text-center text-xs font-medium text-[#666]">
          Already using TaskFlow? <Link to="/login" className="font-black text-[#111] hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
