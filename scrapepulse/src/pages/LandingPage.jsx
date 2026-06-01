import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Zap, BarChart3, Brain, Download, Shield, ArrowRight, Check } from 'lucide-react'
import CompetitorInput from '../components/CompetitorInput.jsx'
import ScoreCard from '../components/ScoreCard.jsx'
import HookCard from '../components/HookCard.jsx'
import RecommendationCard from '../components/RecommendationCard.jsx'
import FrameworkChart from '../components/FrameworkChart.jsx'
import ExportBar from '../components/ExportBar.jsx'
import Layout from '../components/Layout.jsx'
import { generateHooks, computeDashboardScores, generateRecommendations, buildChartData } from '../utils/engine.js'
import { PLATFORMS, HOOK_FRAMEWORKS } from '../data/hooks.js'
import { Filter, TrendingUp } from 'lucide-react'

const FEATURES = [
  { icon: Brain, title: 'Hook Intelligence Engine', desc: '7 persuasion frameworks: PAS, AIDA, Curiosity Gap, FOMO, Authority, Social Proof, Problem Agitation.' },
  { icon: BarChart3, title: 'Marketing Audit Dashboard', desc: 'Hook Strength, CTR Prediction, Engagement Score, Creative Fatigue Risk, Funnel Efficiency — all local.' },
  { icon: Zap, title: 'AI Recommendation Engine', desc: 'Rule-based intelligence fires actionable insights based on your score profile. No AI APIs.' },
  { icon: Download, title: 'One-Click Export', desc: 'Download full intelligence reports as CSV or JSON instantly.' },
  { icon: Shield, title: '100% Free, Zero APIs', desc: 'No OpenAI, no Firebase, no paid subscriptions. Runs in your browser. Always.' },
]

const SCORE_CARDS = [
  { key: 'hookStrength', label: 'Hook Strength', icon: '⚡', description: 'Composite hook persuasion power across all frameworks.' },
  { key: 'engagement', label: 'Engagement Score', icon: '💬', description: 'Predicted audience interaction depth and emotional resonance.' },
  { key: 'ctrPrediction', label: 'CTR Prediction', icon: '📊', description: 'Click-through rate prediction vs. platform benchmark.' },
  { key: 'creativeFatigue', label: 'Creative Fatigue Risk', icon: '🔄', description: 'Risk of diminishing returns from overexposed angles.', inverted: true },
  { key: 'funnelEfficiency', label: 'Funnel Efficiency', icon: '🔽', description: 'Alignment between hook promise and funnel conversion.' },
]

export default function LandingPage() {
  const [results, setResults] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('hooks')

  function handleAnalyze(domain, platform) {
    const hooks = generateHooks(domain, platform)
    const scores = computeDashboardScores(hooks, domain, platform)
    const recommendations = generateRecommendations(scores)
    const chartData = buildChartData(hooks)
    setResults({ domain, platform, hooks, scores, recommendations, chartData })
    setActiveFilter('all')
    setActiveTab('hooks')
    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const filteredHooks = results
    ? (activeFilter === 'all' ? results.hooks : results.hooks.filter(h => h.framework === activeFilter))
    : []

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">

        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-pulse-accent/20 text-xs font-mono text-pulse-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-pulse-accent animate-pulse-slow" />
            Free Competitor Intelligence — No API Required
          </div>
        </div>

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="font-display font-800 text-5xl sm:text-6xl tracking-tight leading-[1.05] mb-5">
            Decode Competitor
            <br />
            <span className="text-gradient">Ad Hooks</span>
            <span className="text-pulse-text"> Instantly</span>
          </h1>
          <p className="text-pulse-muted text-lg font-body max-w-2xl mx-auto leading-relaxed">
            Analyze competitor marketing angles across Meta, Google, LinkedIn & YouTube.
            Powered by local intelligence — no subscriptions, no APIs.
          </p>
        </div>

        {/* CTA Form */}
        <CompetitorInput onAnalyze={handleAnalyze} />

        {/* Checklist */}
        <div className="flex justify-center gap-6 flex-wrap mt-6">
          {['No signup required', 'Instant results', '100% free forever'].map(item => (
            <div key={item} className="flex items-center gap-1.5 text-xs text-pulse-muted font-mono">
              <Check size={11} className="text-pulse-accent" />
              {item}
            </div>
          ))}
        </div>

        {/* ── RESULTS SECTION ── */}
        {results && (
          <div id="results" className="mt-16 space-y-8 animate-in" style={{ opacity: 0 }}>

            {/* Results header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-xs font-mono text-pulse-muted uppercase tracking-widest mb-1">Intelligence Report</p>
                <h2 className="font-display font-700 text-xl text-pulse-text">
                  <span className="text-gradient">{results.domain}</span>
                  <span className="text-pulse-muted text-base ml-2 font-400">· {PLATFORMS[results.platform]?.label}</span>
                </h2>
              </div>
              <ExportBar
                domain={results.domain}
                platform={results.platform}
                hooks={results.hooks}
                scores={results.scores}
                recommendations={results.recommendations}
              />
            </div>

            {/* Score cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {SCORE_CARDS.map((card, i) => (
                <ScoreCard
                  key={card.key}
                  label={card.label}
                  value={results.scores[card.key]}
                  icon={card.icon}
                  inverted={card.inverted}
                  description={card.description}
                  delay={i * 80}
                />
              ))}
            </div>

            {/* Dominant framework bar */}
            <div className="glass-card p-4 flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono text-pulse-muted">Dominant Framework:</span>
              <span className="tag-pill"
                style={{
                  background: HOOK_FRAMEWORKS[results.scores.dominantFramework]?.bgColor,
                  color: HOOK_FRAMEWORKS[results.scores.dominantFramework]?.color,
                  border: `1px solid ${HOOK_FRAMEWORKS[results.scores.dominantFramework]?.color}30`
                }}>
                {HOOK_FRAMEWORKS[results.scores.dominantFramework]?.label}
              </span>
              <span className="text-xs text-pulse-muted font-mono">
                {results.scores.frameworkDiversity} frameworks active ·
                <span className="text-pulse-accent ml-1">{results.hooks.length} hooks generated</span>
              </span>
            </div>

            {/* Tabs */}
            <div>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div className="flex gap-1 p-1 glass rounded-xl">
                  {[
                    { id: 'hooks', label: 'Hooks', icon: Zap, count: results.hooks.length },
                    { id: 'recs', label: 'Recommendations', icon: Brain, count: results.recommendations.length },
                    { id: 'chart', label: 'Distribution', icon: TrendingUp, count: null },
                  ].map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        activeTab === tab.id
                          ? 'bg-pulse-accent/10 text-pulse-accent'
                          : 'text-pulse-muted hover:text-pulse-text'
                      }`}>
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

                {activeTab === 'hooks' && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Filter size={11} className="text-pulse-muted" />
                    <button onClick={() => setActiveFilter('all')}
                      className={`tag-pill transition-all ${activeFilter === 'all'
                        ? 'bg-pulse-accent/15 text-pulse-accent'
                        : 'bg-pulse-surface text-pulse-muted hover:text-pulse-text'}`}
                      style={{ border: '1px solid', borderColor: activeFilter === 'all' ? 'rgba(0,245,196,0.3)' : 'rgba(30,42,58,1)' }}>
                      All
                    </button>
                    {Object.entries(HOOK_FRAMEWORKS).map(([key, fw]) => (
                      <button key={key} onClick={() => setActiveFilter(key)}
                        className="tag-pill transition-all"
                        style={{
                          background: activeFilter === key ? fw.bgColor : 'rgba(30,42,58,0.4)',
                          color: activeFilter === key ? fw.color : '#64748B',
                          border: `1px solid ${activeFilter === key ? fw.color + '40' : 'transparent'}`
                        }}>
                        {fw.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {activeTab === 'hooks' && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredHooks.map((hook, i) => (
                    <HookCard key={hook.id} hook={hook} index={i} />
                  ))}
                </div>
              )}

              {activeTab === 'recs' && (
                <div className="grid sm:grid-cols-2 gap-3">
                  {results.recommendations.map((rec, i) => (
                    <RecommendationCard key={rec.id} rec={rec} index={i} />
                  ))}
                </div>
              )}

              {activeTab === 'chart' && (
                <div className="max-w-lg">
                  <FrameworkChart data={results.chartData} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Feature grid — only show when no results */}
        {!results && (
          <div className="mt-24">
            <div className="text-center mb-10">
              <h2 className="font-display font-700 text-2xl text-pulse-text">Everything you need. Nothing you don't.</h2>
              <p className="text-pulse-muted text-sm mt-2 font-body">Professional-grade intelligence, zero infrastructure cost.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.map((f, i) => (
                <div key={i} className="glass-card p-5 hover:border-white/10 transition-all">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: 'linear-gradient(135deg, rgba(0,245,196,0.15), rgba(59,130,246,0.15))' }}>
                    <f.icon size={16} className="text-pulse-accent" />
                  </div>
                  <h3 className="font-display font-600 text-sm text-pulse-text mb-1.5">{f.title}</h3>
                  <p className="text-xs text-pulse-muted leading-relaxed font-body">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 text-center text-xs font-mono text-pulse-dim">
          Built with React + Vite + TailwindCSS · 100% Free · No API
        </div>
      </div>
    </Layout>
  )
}
