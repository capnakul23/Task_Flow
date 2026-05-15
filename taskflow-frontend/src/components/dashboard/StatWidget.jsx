import { motion } from 'framer-motion'

export default function StatWidget({ label, value, accent = 'blue' }) {
  const accents = {
    blue: 'from-blue-500/20 to-indigo-500/20 text-blue-500',
    green: 'from-emerald-500/20 to-teal-500/20 text-emerald-500',
    red: 'from-rose-500/20 to-orange-500/20 text-rose-500',
    purple: 'from-violet-500/20 to-fuchsia-500/20 text-violet-500'
  }
  
  const currentAccent = accents[accent] || accents.blue

  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className={`glass-card p-6 rounded-2xl relative overflow-hidden group`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${currentAccent.split(' text-')[0]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="relative z-10">
        <div className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">{label}</div>
        <div className={`mt-2 text-4xl font-black ${currentAccent.split(' text-')[1]}`}>{value}</div>
      </div>
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
    </motion.div>
  )
}
