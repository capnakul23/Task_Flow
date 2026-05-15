import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { motion } from 'framer-motion'

export default function IssuesByAssigneeChart({ data = [] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card p-6 rounded-2xl"
    >
      <div className="mb-6 text-lg font-bold text-[var(--text-primary)]">Issues by member</div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="var(--text-secondary)" 
              tickLine={false} 
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              stroke="var(--text-secondary)" 
              tickLine={false} 
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
              contentStyle={{ 
                backgroundColor: 'var(--bg-elevated)', 
                borderColor: 'var(--border-color)', 
                color: 'var(--text-primary)',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Bar 
              dataKey="count" 
              fill="#579DFF" 
              radius={[6, 6, 0, 0]} 
              barSize={40}
              style={{ filter: 'drop-shadow(0 4px 6px rgba(87, 157, 255, 0.3))' }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
