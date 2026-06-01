import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Globe, ChevronDown } from 'lucide-react'
import { PLATFORMS } from '../data/hooks.js'

export default function CompetitorInput({ onAnalyze, compact = false }) {
  const [domain, setDomain] = useState('')
  const [platform, setPlatform] = useState('meta')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function cleanDomain(val) {
    return val.replace(/https?:\/\//, '').replace(/www\./, '').split('/')[0].trim()
  }

  function validate(d) {
    if (!d) return 'Enter a domain name (e.g. nike.com)'
    if (d.includes(' ')) return 'Domain cannot contain spaces'
    return ''
  }

  function handleSubmit(e) {
    e.preventDefault()
    const clean = cleanDomain(domain)
    const err = validate(clean)
    if (err) { setError(err); return }
    setError('')
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      if (onAnalyze) {
        onAnalyze(clean, platform)
      } else {
        navigate(`/dashboard?domain=${encodeURIComponent(clean)}&platform=${platform}`, { replace: false })
      }
    }, 800)
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? '' : 'w-full max-w-2xl mx-auto'}>
      <div className={`glass-card p-6 ${!compact && 'shadow-glass'}`}>
        <div className="flex flex-col gap-4">
          {/* Domain input */}
          <div>
            <label className="block text-[11px] font-mono text-pulse-muted uppercase tracking-widest mb-2">
              Competitor Domain
            </label>
            <div className="relative">
              <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-pulse-muted" />
              <input
                type="text"
                value={domain}
                onChange={e => { setDomain(e.target.value); setError('') }}
                placeholder="nike.com"
                className="w-full bg-pulse-surface/80 border border-pulse-border rounded-xl pl-9 pr-4 py-3 text-sm font-mono text-pulse-text placeholder-pulse-dim focus:outline-none focus:border-pulse-accent/50 focus:ring-1 focus:ring-pulse-accent/20 transition-all"
              />
            </div>
            {error && <p className="mt-1.5 text-xs text-red-400 font-mono">{error}</p>}
          </div>

          {/* Platform select */}
          <div>
            <label className="block text-[11px] font-mono text-pulse-muted uppercase tracking-widest mb-2">
              Platform
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(PLATFORMS).map(([key, p]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPlatform(key)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-mono transition-all ${
                    platform === key
                      ? 'bg-pulse-accent/10 border-pulse-accent/40 text-pulse-accent'
                      : 'bg-pulse-surface/50 border-pulse-border text-pulse-muted hover:border-pulse-dim hover:text-pulse-text'
                  }`}
                >
                  <span className="text-base">{p.icon}</span>
                  <span className="truncate">{p.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !domain}
            className="relative w-full py-3 rounded-xl font-display font-600 text-sm transition-all overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed group"
            style={{
              background: loading ? 'rgba(0,245,196,0.1)' : 'linear-gradient(135deg, #00F5C4, #3B82F6)',
              color: loading ? '#00F5C4' : '#080B14',
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <LoadingDots />
                Analyzing competitor...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Search size={14} strokeWidth={2.5} />
                Run Intelligence Scan
              </span>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}

function LoadingDots() {
  return (
    <span className="flex gap-1">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-1 h-1 rounded-full bg-current animate-bounce"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </span>
  )
}
