import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Shield, Rocket, LayoutDashboard, Command } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function LandingPage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#111] font-sans selection:bg-blue-600 selection:text-white antialiased">
      {/* Precision Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#eee]">
        <div className="max-w-[1400px] mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="h-7 w-7 bg-black flex items-center justify-center text-white font-bold text-sm">T</div>
              <span className="text-lg font-bold tracking-tighter uppercase">TaskFlow</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-[13px] font-medium text-[#666]">
              <a href="#features" className="hover:text-black transition-colors">Features</a>
              <a href="#method" className="hover:text-black transition-colors">Method</a>
              <a href="#customers" className="hover:text-black transition-colors">Customers</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-[13px] font-medium text-[#666] hover:text-black transition-colors">Log in</Link>
            <Link to="/signup" className="bg-black text-white px-4 py-1.5 text-[13px] font-bold hover:bg-[#333] transition-all">Sign up</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - The Linear Look */}
      <main className="max-w-[1400px] mx-auto px-8 pt-48 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-[#eee] px-3 py-1 text-[11px] font-bold text-[#666] mb-8 shadow-sm">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            TASKFLOW 2026 RELEASE
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tightest leading-[0.95] mb-8 text-[#111]">
            Build better <br /> <span className="text-[#888]">products.</span>
          </h1>
          <p className="text-xl text-[#666] max-w-xl leading-relaxed mb-12 font-medium">
            Linear meets Asana. A high-performance task management system designed for teams that value speed, precision, and a clean workspace.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/signup" className="bg-black text-white px-8 py-4 text-sm font-bold hover:bg-[#333] transition-all flex items-center gap-3 group">
              Start your project
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-2 text-[13px] font-bold text-[#666] border border-[#eee] px-6 py-4 cursor-pointer hover:bg-white hover:border-[#ddd] transition-all">
              <Command className="h-4 w-4" />
              <span>CMD + K to search</span>
            </div>
          </div>
        </motion.div>

        {/* Visual Benchmark Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-32 border border-[#eee] bg-white shadow-2xl p-4 overflow-hidden"
        >
          <div className="bg-[#fcfcfc] border border-[#eee] aspect-[16/9] relative group">
             {/* Simulated UI interface */}
             <div className="absolute inset-0 flex">
                <div className="w-64 border-r border-[#eee] bg-white p-6 hidden md:block">
                  <div className="space-y-6">
                    <div className="h-3 w-2/3 bg-[#eee]" />
                    <div className="space-y-3">
                      <div className="h-2 w-full bg-[#f5f5f5]" />
                      <div className="h-2 w-full bg-[#f5f5f5]" />
                      <div className="h-2 w-4/5 bg-[#f5f5f5]" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 p-10 bg-white">
                  <div className="flex items-center justify-between mb-12">
                    <div className="h-6 w-48 bg-[#eee]" />
                    <div className="h-8 w-32 bg-black" />
                  </div>
                  <div className="grid grid-cols-3 gap-10">
                    <div className="space-y-4">
                      <div className="h-3 w-1/2 bg-[#f5f5f5]" />
                      <div className="h-24 w-full border border-[#eee] bg-[#fafafa]" />
                      <div className="h-24 w-full border border-[#eee] bg-[#fafafa]" />
                    </div>
                    <div className="space-y-4">
                      <div className="h-3 w-1/2 bg-[#f5f5f5]" />
                      <div className="h-24 w-full border border-[#eee] bg-[#fafafa]" />
                      <div className="h-32 w-full border-2 border-blue-600 bg-white" />
                    </div>
                    <div className="space-y-4">
                      <div className="h-3 w-1/2 bg-[#f5f5f5]" />
                      <div className="h-24 w-full border border-[#eee] bg-[#fafafa]" />
                    </div>
                  </div>
                </div>
             </div>
             {/* Interactive Overlay */}
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors cursor-crosshair" />
          </div>
        </motion.div>
      </main>

      {/* Philosophy Grid */}
      <section className="bg-white border-t border-[#eee] py-32">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-12">
             <div className="space-y-6">
                <div className="text-[11px] font-black uppercase tracking-widest text-blue-600">Built for speed</div>
                <h3 className="text-xl font-bold tracking-tight">Zero friction workflows</h3>
                <p className="text-[#666] text-sm leading-relaxed">Every detail is optimized for speed. Focus on shipping, not managing.</p>
             </div>
             <div className="space-y-6">
                <div className="text-[11px] font-black uppercase tracking-widest text-[#666]">Keyboard first</div>
                <h3 className="text-xl font-bold tracking-tight">Command Anything</h3>
                <p className="text-[#666] text-sm leading-relaxed">A powerful command menu allows you to navigate and edit without a mouse.</p>
             </div>
             <div className="space-y-6">
                <div className="text-[11px] font-black uppercase tracking-widest text-[#666]">Insights</div>
                <h3 className="text-xl font-bold tracking-tight">Real-time Visibility</h3>
                <p className="text-[#666] text-sm leading-relaxed">Automatic reports and dashboards keep the whole team in sync.</p>
             </div>
             <div className="space-y-6">
                <div className="text-[11px] font-black uppercase tracking-widest text-[#666]">Scale</div>
                <h3 className="text-xl font-bold tracking-tight">Engineered to Grow</h3>
                <p className="text-[#666] text-sm leading-relaxed">From 2 to 2000. TaskFlow scales with your organization effortlessly.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Sharp Footer */}
      <footer className="py-20 bg-white border-t border-[#eee]">
        <div className="max-w-[1400px] mx-auto px-8 flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-black flex items-center justify-center text-white font-bold text-xs">T</div>
              <span className="font-bold tracking-tighter uppercase">TaskFlow</span>
            </div>
            <p className="text-xs font-bold text-[#999] uppercase tracking-widest max-w-[200px]">THE NEW STANDARD FOR PRODUCT TEAMS.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
             <div className="space-y-4">
                <div className="text-[10px] font-black uppercase text-[#111]">Product</div>
                <div className="flex flex-col gap-2 text-[13px] text-[#666] font-medium">
                  <a href="#" className="hover:text-black">Changelog</a>
                  <a href="#" className="hover:text-black">Method</a>
                  <a href="#" className="hover:text-black">Integrations</a>
                </div>
             </div>
             <div className="space-y-4">
                <div className="text-[10px] font-black uppercase text-[#111]">Company</div>
                <div className="flex flex-col gap-2 text-[13px] text-[#666] font-medium">
                  <a href="#" className="hover:text-black">About</a>
                  <a href="#" className="hover:text-black">Careers</a>
                  <a href="#" className="hover:text-black">Privacy</a>
                </div>
             </div>
             <div className="space-y-4">
                <div className="text-[10px] font-black uppercase text-[#111]">Support</div>
                <div className="flex flex-col gap-2 text-[13px] text-[#666] font-medium">
                  <a href="#" className="hover:text-black">Help Center</a>
                  <a href="#" className="hover:text-black">Community</a>
                  <a href="#" className="hover:text-black">Contact</a>
                </div>
             </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
