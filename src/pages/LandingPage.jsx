import React from 'react'
import { Link } from 'react-router-dom'
import { Zap, BarChart3, Brain, Download, Shield, ArrowRight, Check } from 'lucide-react'
import CompetitorInput from '../components/CompetitorInput.jsx'
import Layout from '../components/Layout.jsx'

const FEATURES = [
  { icon: Brain, title: 'Hook Intelligence Engine', desc: '7 persuasion frameworks analyzed: PAS, AIDA, Curiosity Gap, FOMO, Authority, Social Proof, Problem Agitation.' },
  { icon: BarChart3, title: 'Marketing Audit Dashboard', desc: 'Hook Strength, CTR Prediction, Engagement Score, Creative Fatigue Risk, and Funnel Efficiency — all calculated locally.' },
  { icon: Zap, title: 'AI Recommendation Engine', desc: 'Rule-based intelligence fires actionable insights based on your score profile. No AI APIs. Just smart logic.' },
  { icon: Download, title: 'One-Click Export', desc: 'Download full intelligence reports as CSV or JSON. Use in any spreadsheet or BI tool instantly.' },
  { icon: Shield, title: '100% Free, Zero APIs', desc: 'No OpenAI, no Firebase, no paid subscriptions. Everything runs in your browser. Always.' },
]

const BADGE_STATS = [
  { value: '7', label: 'Hook Frameworks' },
  { value: '5', label: 'Audit Metrics' },
  { value: '13+', label: 'Smart Rules' },
  { value: '0', label: 'API Costs' },
]

export default function LandingPage() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">

        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-pulse-accent/20 text-xs font-mono text-pulse-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-pulse-accent animate-pulse-slow" />
            Free Competitor Intelligence Tool — No API Required
          </div>
        </div>

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="font-display font-800 text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] mb-5">
            Decode Competitor
            <br />
            <span className="text-gradient">Ad Hooks</span>
            <span className="text-pulse-text"> Instantly</span>
          </h1>
          <p className="text-pulse-muted text-lg sm:text-xl font-body max-w-2xl mx-auto leading-relaxed">
            ScrapePulse analyzes competitor marketing angles across Meta, Google, LinkedIn and YouTube.
            Powered by local intelligence — no subscriptions, no APIs.
          </p>
        </div>

        {/* Stat badges */}
        <div className="flex justify-center gap-4 sm:gap-8 flex-wrap mb-12">
          {BADGE_STATS.map(s => (
            <div key={s.label} className="text-center">
              <div className="font-display font-800 text-2xl text-gradient">{s.value}</div>
              <div className="text-[10px] font-mono text-pulse-muted uppercase tracking-wider mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Form */}
        <CompetitorInput />

        {/* Checklist */}
        <div className="flex justify-center gap-6 flex-wrap mt-6">
          {['No signup required', 'Instant results', '100% free forever'].map(item => (
            <div key={item} className="flex items-center gap-1.5 text-xs text-pulse-muted font-mono">
              <Check size={11} className="text-pulse-accent" />
              {item}
            </div>
          ))}
        </div>

        {/* Feature grid */}
        <div className="mt-24">
          <div className="text-center mb-10">
            <h2 className="font-display font-700 text-2xl text-pulse-text">Everything you need. Nothing you don't.</h2>
            <p className="text-pulse-muted text-sm mt-2 font-body">Professional-grade intelligence, zero infrastructure cost.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <div key={i} className="glass-card p-5 hover:border-white/10 transition-all group">
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

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="glass-card p-8 max-w-xl mx-auto border-gradient">
            <h2 className="font-display font-700 text-xl text-pulse-text mb-2">
              Start your first intelligence scan
            </h2>
            <p className="text-sm text-pulse-muted mb-6 font-body">Enter any competitor domain above — results in under a second.</p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-600 text-sm text-pulse-bg transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #00F5C4, #3B82F6)' }}
            >
              Open Dashboard <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-xs font-mono text-pulse-dim">
          Built with React + Vite + TailwindCSS · 100% Free · Open Source
        </div>
      </div>
    </Layout>
  )
}
