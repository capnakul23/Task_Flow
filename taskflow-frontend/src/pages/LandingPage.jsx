import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { LayoutDashboard, Kanban, Users, Zap, CheckCircle2, ArrowRight } from 'lucide-react'

import { useAuth } from '../hooks/useAuth'

export default function LandingPage() {
  const { isAuthenticated } = useAuth()
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  }

  return (
    <div className="min-h-screen bg-[#0A0D14] text-gray-200 font-sans selection:bg-jira-blue/30 overflow-hidden relative">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-jira-blue/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-jira-purple/20 blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-jira-blue to-jira-purple shadow-lg shadow-jira-blue/20">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">TaskFlow</span>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <Link to="/projects" className="rounded-full bg-jira-blue px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-jira-blue-hover hover:scale-105 active:scale-95">Go to Dashboard</Link>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Log in</Link>
              <Link to="/signup" className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-all hover:bg-gray-200 hover:scale-105 active:scale-95">Get Started</Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-24 pb-32 text-center md:pt-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="mb-6 flex items-center gap-2 rounded-full border border-jira-blue/30 bg-jira-blue/10 px-4 py-1.5 text-sm font-medium text-jira-blue-bold backdrop-blur-sm">
            <Zap className="h-4 w-4" fill="currentColor" />
            <span>The new standard for agile teams</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="mb-6 text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-[5.5rem] leading-[1.1]">
            Manage work <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-jira-blue-bold to-jira-purple-bold">effortlessly.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="mb-10 max-w-2xl text-lg text-gray-400 md:text-xl leading-relaxed">
            TaskFlow brings your team's work into one unified, elegant workspace. Plan sprints, track issues, and ship faster with intuitive Kanban boards and real-time collaboration.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {isAuthenticated ? (
              <Link to="/projects" className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-jira-blue px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-jira-blue/25 transition-all hover:bg-jira-blue-hover hover:scale-105 active:scale-95">
                Go to Dashboard
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <>
                <Link to="/signup" className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-jira-blue px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-jira-blue/25 transition-all hover:bg-jira-blue-hover hover:scale-105 active:scale-95">
                  Start Planning Free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/login" className="w-full sm:w-auto rounded-full border border-gray-700 bg-gray-800/50 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-gray-700 hover:scale-105 active:scale-95">
                  View Demo Board
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>
      </main>

      {/* Features Grid */}
      <section className="relative z-10 bg-[#0F131A] border-t border-gray-800/50 py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Everything you need to ship</h2>
            <p className="mt-4 text-gray-400">Powerful features disguised by a beautifully simple interface.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -5 }} className="rounded-2xl border border-gray-800 bg-[#161B22] p-8 shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-jira-blue/10 text-jira-blue-bold">
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">Agile Boards</h3>
              <p className="text-gray-400 leading-relaxed">Visualize your workflow with drag-and-drop Kanban boards. Track 'To Do' to 'Done' seamlessly.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="rounded-2xl border border-gray-800 bg-[#161B22] p-8 shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-jira-purple/10 text-jira-purple-bold">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">Team Collaboration</h3>
              <p className="text-gray-400 leading-relaxed">Assign tasks, manage roles, and keep everyone on the same page with real-time updates.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="rounded-2xl border border-gray-800 bg-[#161B22] p-8 shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-jira-green/10 text-jira-green-bold">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">Issue Tracking</h3>
              <p className="text-gray-400 leading-relaxed">Create detailed issues, set priorities, and track progress with precision and clarity.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
    </div>
  )
}
