import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

const SCORE_THRESHOLDS = {
  high: { min: 70, color: '#00F5C4', label: 'Strong' },
  mid: { min: 45, color: '#F59E0B', label: 'Average' },
  low: { min: 0, color: '#EF4444', label: 'Weak' },
}

function getThreshold(value, inverted = false) {
  const v = inverted ? 100 - value : value
  if (v >= 70) return SCORE_THRESHOLDS.high
  if (v >= 45) return SCORE_THRESHOLDS.mid
  return SCORE_THRESHOLDS.low
}

export default function ScoreCard({ label, value, icon, inverted = false, description, delay = 0 }) {
  const [animated, setAnimated] = useState(0)
  const threshold = getThreshold(value, inverted)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(value), 100 + delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return (
    <div className="glass-card p-5 flex flex-col gap-3 group hover:border-white/10 transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <span className="text-xs font-mono text-pulse-muted uppercase tracking-widest">{label}</span>
        </div>
        <span className="tag-pill" style={{ background: threshold.color + '15', color: threshold.color, border: `1px solid ${threshold.color}30` }}>
          {threshold.label}
        </span>
      </div>

      {/* Score */}
      <div className="flex items-end gap-2">
        <span className="font-display text-4xl font-800 leading-none" style={{ color: threshold.color }}>
          {value}
        </span>
        <span className="text-pulse-muted text-sm mb-1 font-mono">/100</span>
      </div>

      {/* Progress bar */}
      <div className="score-bar">
        <div
          className="score-bar-fill"
          style={{
            width: `${animated}%`,
            background: `linear-gradient(90deg, ${threshold.color}99, ${threshold.color})`,
            boxShadow: `0 0 8px ${threshold.color}40`
          }}
        />
      </div>

      {/* Description */}
      {description && (
        <p className="text-xs text-pulse-muted leading-relaxed">{description}</p>
      )}
    </div>
  )
}
