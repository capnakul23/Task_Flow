import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { LayoutDashboard, ArrowRight, Zap, Shield, Rocket } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function LandingPage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      {/* Sharp Bordered Navbar */}
      <nav className="border-b border-slate-200 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-slate-900 flex items-center justify-center text-white font-black text-xl">T</div>
            <span className="text-2xl font-black tracking-tighter uppercase">TaskFlow</span>
          </div>
          <div className="flex items-center gap-8">
            <Link to="/login" className="text-sm font-bold uppercase tracking-widest hover:text-blue-600 transition-colors">Login</Link>
            <Link to="/signup" className="bg-slate-900 text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-blue-600 transition-all">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-40 grid lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block bg-blue-600 text-white px-4 py-1 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            Available Now v2.0
          </div>
          <h1 className="text-7xl md:text-8xl font-black tracking-tightest leading-[0.9] mb-10">
            ENGINEERED <br /> FOR <span className="text-blue-600">ACTION.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-lg leading-relaxed mb-12 font-medium">
            A high-performance workspace for elite teams. Sharp, fast, and uncompromising. Manage your entire lifecycle in one unified interface.
          </p>
          <div className="flex gap-4">
            <Link to="/signup" className="bg-slate-900 text-white px-10 py-5 text-sm font-black uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center gap-3 group">
              Start Building 
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login" className="border-2 border-slate-900 px-10 py-5 text-sm font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
              Live Demo
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="aspect-square bg-slate-100 border border-slate-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-white border border-slate-200 shadow-2xl p-6">
              <div className="flex gap-2 mb-4">
                <div className="h-3 w-3 bg-red-400" />
                <div className="h-3 w-3 bg-yellow-400" />
                <div className="h-3 w-3 bg-green-400" />
              </div>
              <div className="space-y-4">
                <div className="h-4 w-2/3 bg-slate-100" />
                <div className="h-4 w-full bg-slate-50" />
                <div className="h-32 w-full bg-blue-50/50 border border-blue-100" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-20 bg-slate-50" />
                  <div className="h-20 bg-slate-50" />
                  <div className="h-20 bg-slate-50" />
                </div>
              </div>
            </div>
          </div>
          {/* Decorative Sharp Accents */}
          <div className="absolute -top-6 -right-6 h-24 w-24 border-t-4 border-r-4 border-blue-600" />
          <div className="absolute -bottom-6 -left-6 h-24 w-24 border-b-4 border-l-4 border-slate-900" />
        </motion.div>
      </main>

      {/* Features - Sharp Grid */}
      <section className="bg-slate-50 border-y border-slate-200 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 divide-x divide-slate-200 border border-slate-200 bg-white">
            <div className="p-12 hover:bg-slate-50 transition-colors">
              <Zap className="h-10 w-10 text-blue-600 mb-8" />
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Velocity</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Built for speed. Zero friction, zero lag. Your team moves at the speed of thought.</p>
            </div>
            <div className="p-12 hover:bg-slate-50 transition-colors">
              <Shield className="h-10 w-10 text-blue-600 mb-8" />
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Precision</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Sharp tracking for sharp teams. Never miss a deadline with automated oversight.</p>
            </div>
            <div className="p-12 hover:bg-slate-50 transition-colors">
              <Rocket className="h-10 w-10 text-blue-600 mb-8" />
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Impact</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Maximize output. Focus on what matters while we handle the orchestration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-slate-900 flex items-center justify-center text-white font-black">T</div>
            <span className="font-black uppercase tracking-tighter">TaskFlow</span>
          </div>
          <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            © 2026 TASKFLOW SYSTEMS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  )
}
