import React from 'react'
import { PRIORITY_CONFIG } from '../data/recommendations.js'
import { ArrowRight } from 'lucide-react'

export default function RecommendationCard({ rec, index }) {
  const config = PRIORITY_CONFIG[rec.priority]

  return (
    <div
      className="glass-card p-5 animate-in"
      style={{
        animationDelay: `${index * 80}ms`,
        opacity: 0,
        borderColor: config.border,
        background: config.bg,
      }}
    >
      {/* Header row */}
      <div className="flex items-start gap-3">
        <span className="text-xl flex-shrink-0 mt-0.5">{rec.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span
              className="tag-pill text-[9px]"
              style={{
                color: config.color,
                background: config.bg,
                border: `1px solid ${config.border}`,
              }}
            >
              {config.label}
            </span>
            <span className="tag-pill text-[9px] text-pulse-muted bg-pulse-border/30 border border-pulse-border">
              {rec.category}
            </span>
            <span className="tag-pill text-[9px]"
              style={{ color: '#3B82F6', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
              Impact: {rec.impact}
            </span>
          </div>
          <h4 className="font-display font-600 text-sm text-pulse-text">{rec.title}</h4>
        </div>
      </div>

      {/* Message */}
      <p className="mt-3 text-xs text-pulse-muted leading-relaxed pl-8">
        {rec.message}
      </p>

      {/* Action */}
      <div className="mt-3 pl-8 flex items-start gap-2">
        <ArrowRight size={12} className="text-pulse-accent flex-shrink-0 mt-0.5" />
        <p className="text-xs font-mono text-pulse-accent leading-relaxed">{rec.action}</p>
      </div>
    </div>
  )
}
