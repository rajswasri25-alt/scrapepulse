import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LayoutDashboard, Zap, Brain, TrendingUp, Filter } from 'lucide-react'
import CompetitorInput from '../components/CompetitorInput.jsx'
import ScoreCard from '../components/ScoreCard.jsx'
import HookCard from '../components/HookCard.jsx'
import RecommendationCard from '../components/RecommendationCard.jsx'
import FrameworkChart from '../components/FrameworkChart.jsx'
import ExportBar from '../components/ExportBar.jsx'
import { generateHooks, computeDashboardScores, generateRecommendations, buildChartData } from '../utils/engine.js'
import { PLATFORMS, HOOK_FRAMEWORKS } from '../data/hooks.js'

const SCORE_CARDS = [
  { key: 'hookStrength', label: 'Hook Strength', icon: '⚡', description: 'Composite hook persuasion power across all frameworks.' },
  { key: 'engagement', label: 'Engagement Score', icon: '💬', description: 'Predicted audience interaction depth and emotional resonance.' },
  { key: 'ctrPrediction', label: 'CTR Prediction', icon: '📊', description: 'Click-through rate prediction vs. platform benchmark.' },
  { key: 'creativeFatigue', label: 'Creative Fatigue Risk', icon: '🔄', description: 'Risk of diminishing returns from overexposed angles.', inverted: true },
  { key: 'funnelEfficiency', label: 'Funnel Efficiency', icon: '🔽', description: 'Alignment between hook promise and funnel conversion architecture.' },
]

export default function DashboardPage() {
  const [searchParams] = useSearchParams()
  const [domain, setDomain] = useState(searchParams.get('domain') || '')
  const [platform, setPlatform] = useState(searchParams.get('platform') || 'meta')
  const [hooks, setHooks] = useState([])
  const [scores, setScores] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('hooks')

  // Auto-run if domain is in URL
  useEffect(() => {
    if (domain) runAnalysis(domain, platform)
  }, [])

  function runAnalysis(d, p) {
    setLoading(true)
    setDomain(d)
    setPlatform(p)
    setTimeout(() => {
      const h = generateHooks(d, p)
      const s = computeDashboardScores(h, d, p)
      setHooks(h)
      setScores(s)
      setLoading(false)
      setActiveTab('hooks')
    }, 600)
  }

  const recommendations = useMemo(() => generateRecommendations(scores), [scores])
  const chartData = useMemo(() => buildChartData(hooks), [hooks])

  const filteredHooks = activeFilter === 'all'
    ? hooks
    : hooks.filter(h => h.framework === activeFilter)

  const platformInfo = PLATFORMS[platform]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      {/* Page header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <LayoutDashboard size={16} className="text-pulse-accent" />
            <span className="text-xs font-mono text-pulse-muted uppercase tracking-widest">Intelligence Dashboard</span>
          </div>
          <h1 className="font-display font-700 text-2xl text-pulse-text">
            {domain ? (
              <>
                <span className="text-gradient">{domain}</span>
                <span className="text-pulse-muted text-lg ml-2 font-400">· {platformInfo?.label}</span>
              </>
            ) : 'Competitor Analysis'}
          </h1>
        </div>
        {scores && (
          <ExportBar domain={domain} platform={platform} hooks={hooks} scores={scores} recommendations={recommendations} />
        )}
      </div>

      {/* Input */}
      <div className="mb-8">
        <CompetitorInput onAnalyze={runAnalysis} compact />
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-pulse-accent/20 border-t-pulse-accent animate-spin" />
          <p className="text-sm font-mono text-pulse-muted animate-pulse-slow">
            Scanning competitor intelligence for <span className="text-pulse-accent">{domain}</span>...
          </p>
        </div>
      )}

      {/* Empty state */}
      {!loading && !scores && (
        <div className="text-center py-24">
          <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4"
            style={{ background: 'linear-gradient(135deg, rgba(0,245,196,0.1), rgba(59,130,246,0.1))' }}>
            <Brain size={28} className="text-pulse-accent opacity-50" />
          </div>
          <p className="text-pulse-muted font-body text-sm">Enter a competitor domain above to begin analysis</p>
          <p className="text-pulse-dim font-mono text-xs mt-1">e.g. nike.com, hubspot.com, mailchimp.com</p>
        </div>
      )}

      {/* Results */}
      {!loading && scores && (
        <div className="space-y-8 animate-in" style={{ opacity: 0 }}>

          {/* Score cards grid */}
          <section>
            <SectionLabel icon="📈" label="Marketing Audit Scores" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-3">
              {SCORE_CARDS.map((card, i) => (
                <ScoreCard
                  key={card.key}
                  label={card.label}
                  value={scores[card.key]}
                  icon={card.icon}
                  inverted={card.inverted}
                  description={card.description}
                  delay={i * 80}
                />
              ))}
            </div>
          </section>

          {/* Framework insight bar */}
          <div className="glass-card p-4 flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono text-pulse-muted">Dominant Framework:</span>
            {scores.dominantFramework && (
              <span className="tag-pill"
                style={{
                  background: HOOK_FRAMEWORKS[scores.dominantFramework]?.bgColor,
                  color: HOOK_FRAMEWORKS[scores.dominantFramework]?.color,
                  border: `1px solid ${HOOK_FRAMEWORKS[scores.dominantFramework]?.color}30`
                }}>
                {HOOK_FRAMEWORKS[scores.dominantFramework]?.label}
              </span>
            )}
            <span className="text-xs text-pulse-muted font-mono ml-2">
              {scores.frameworkDiversity} frameworks active ·
              <span className="text-pulse-accent ml-1">{hooks.length} hooks generated</span>
            </span>
          </div>

          {/* Main content tabs */}
          <section>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div className="flex gap-1 p-1 glass rounded-xl">
                {[
                  { id: 'hooks', label: 'Hook Intelligence', icon: Zap, count: hooks.length },
                  { id: 'recs', label: 'Recommendations', icon: Brain, count: recommendations.length },
                  { id: 'chart', label: 'Distribution', icon: TrendingUp, count: null },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      activeTab === tab.id
                        ? 'bg-pulse-accent/10 text-pulse-accent'
                        : 'text-pulse-muted hover:text-pulse-text'
                    }`}
                  >
                    <tab.icon size={12} />
                    {tab.label}
                    {tab.count !== null && (
                      <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[9px] ${
                        activeTab === tab.id ? 'bg-pulse-accent/20 text-pulse-accent' : 'bg-pulse-border text-pulse-muted'
                      }`}>{tab.count}</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Framework filter (only on hooks tab) */}
              {activeTab === 'hooks' && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Filter size={11} className="text-pulse-muted" />
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`tag-pill transition-all ${activeFilter === 'all' ? 'bg-pulse-accent/15 text-pulse-accent border-pulse-accent/30' : 'bg-pulse-surface text-pulse-muted border-pulse-border hover:text-pulse-text'}`}
                    style={{ border: '1px solid' }}
                  >
                    All
                  </button>
                  {Object.entries(HOOK_FRAMEWORKS).map(([key, fw]) => (
                    <button
                      key={key}
                      onClick={() => setActiveFilter(key)}
                      className="tag-pill transition-all"
                      style={{
                        background: activeFilter === key ? fw.bgColor : 'rgba(30,42,58,0.4)',
                        color: activeFilter === key ? fw.color : '#64748B',
                        border: `1px solid ${activeFilter === key ? fw.color + '40' : 'transparent'}`
                      }}
                    >
                      {fw.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tab: Hooks */}
            {activeTab === 'hooks' && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredHooks.map((hook, i) => (
                  <HookCard key={hook.id} hook={hook} index={i} />
                ))}
                {filteredHooks.length === 0 && (
                  <div className="col-span-3 text-center py-8 text-pulse-muted text-sm font-mono">
                    No hooks found for this framework.
                  </div>
                )}
              </div>
            )}

            {/* Tab: Recommendations */}
            {activeTab === 'recs' && (
              <div className="grid sm:grid-cols-2 gap-3">
                {recommendations.map((rec, i) => (
                  <RecommendationCard key={rec.id} rec={rec} index={i} />
                ))}
              </div>
            )}

            {/* Tab: Chart */}
            {activeTab === 'chart' && (
              <div className="max-w-lg">
                <FrameworkChart data={chartData} />
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {Object.entries(scores.frameworkCounts).map(([fw, count]) => (
                    <div key={fw} className="glass-card px-4 py-3 flex items-center justify-between">
                      <span className="text-xs font-mono"
                        style={{ color: HOOK_FRAMEWORKS[fw]?.color }}>
                        {HOOK_FRAMEWORKS[fw]?.label}
                      </span>
                      <span className="text-xs font-mono text-pulse-muted">{count} hooks</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  )
}

function SectionLabel({ icon, label }) {
  return (
    <div className="flex items-center gap-2">
      <span>{icon}</span>
      <span className="text-xs font-mono text-pulse-muted uppercase tracking-widest">{label}</span>
    </div>
  )
}
