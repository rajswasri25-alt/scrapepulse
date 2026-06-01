import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function HookCard({ hook, index }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(hook.text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="glass-card p-4 group hover:border-white/10 transition-all duration-300 animate-in"
      style={{ animationDelay: `${index * 60}ms`, opacity: 0 }}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Framework badge */}
        <div className="flex-shrink-0">
          <span
            className="tag-pill"
            style={{
              background: hook.frameworkBg,
              color: hook.frameworkColor,
              border: `1px solid ${hook.frameworkColor}30`,
            }}
          >
            {hook.frameworkLabel}
          </span>
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-white/5 text-pulse-muted hover:text-pulse-text"
          title="Copy hook"
        >
          {copied ? <Check size={13} className="text-pulse-accent" /> : <Copy size={13} />}
        </button>
      </div>

      {/* Hook text */}
      <p className="mt-3 text-sm text-pulse-text leading-relaxed font-body">
        {hook.text}
      </p>

      {/* Mini scores */}
      <div className="mt-3 flex items-center gap-4 pt-3 border-t border-pulse-border">
        <MiniScore label="Strength" value={hook.strength} />
        <MiniScore label="CTR" value={hook.ctr} />
        <MiniScore label="Engagement" value={hook.engagement} />
      </div>
    </div>
  )
}

function MiniScore({ label, value }) {
  const color = value >= 70 ? '#00F5C4' : value >= 45 ? '#F59E0B' : '#EF4444'
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] font-mono text-pulse-muted uppercase tracking-wider">{label}</span>
      <span className="text-xs font-mono font-500" style={{ color }}>{value}</span>
    </div>
  )
}
