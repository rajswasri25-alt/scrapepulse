import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { HOOK_FRAMEWORKS } from '../data/hooks.js'

const COLORS = Object.values(HOOK_FRAMEWORKS).map(f => f.color)

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const { name, value } = payload[0]
    return (
      <div className="glass px-3 py-2 rounded-lg text-xs font-mono">
        <span className="text-pulse-text">{name}</span>
        <span className="ml-2 text-pulse-accent">{value} hooks</span>
      </div>
    )
  }
  return null
}

export default function FrameworkChart({ data }) {
  if (!data?.length) return null

  return (
    <div className="glass-card p-5">
      <div className="mb-3">
        <span className="text-xs font-mono text-pulse-muted uppercase tracking-widest">Framework Distribution</span>
        <p className="text-xs text-pulse-dim mt-1">Hook types in use across competitor intelligence</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="transparent"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span className="text-xs font-mono text-pulse-muted">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
