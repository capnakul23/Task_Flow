import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

const colors = ['#579DFF', '#9F8FEF', '#4BCE97', '#F87168']

export default function IssueStatusChart({ data = [] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card p-6 rounded-2xl"
    >
      <div className="mb-6 text-lg font-bold text-[var(--text-primary)]">Issues by status</div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={data} 
              dataKey="value" 
              nameKey="name" 
              innerRadius={65} 
              outerRadius={90} 
              paddingAngle={5}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={entry.name} 
                  fill={colors[index % colors.length]} 
                  style={{ filter: `drop-shadow(0 0 8px ${colors[index % colors.length]}44)` }}
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--bg-elevated)', 
                borderColor: 'var(--border-color)', 
                color: 'var(--text-primary)',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }} 
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
