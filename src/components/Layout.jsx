import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Zap, LayoutDashboard, Home } from 'lucide-react'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-pulse-bg noise-bg">
      {/* Ambient background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #00F5C4 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }} />
        <div className="absolute bottom-20 left-1/4 w-72 h-72 rounded-full opacity-6"
          style={{ background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)' }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 glass border-b border-pulse-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #00F5C4, #3B82F6)' }}>
              <Zap size={14} className="text-pulse-bg" strokeWidth={2.5} />
            </div>
            <span className="font-display font-700 text-sm tracking-tight text-pulse-text">
              Scrape<span className="text-gradient">Pulse</span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <Link to="/"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-pulse-muted hover:text-pulse-text hover:bg-white/5 transition-all text-xs font-body">
              <Home size={13} /> Home
            </Link>
            <Link to="/dashboard"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-pulse-muted hover:text-pulse-text hover:bg-white/5 transition-all text-xs font-body">
              <LayoutDashboard size={13} /> Dashboard
            </Link>
            <div className="ml-2 px-2 py-0.5 rounded text-[10px] font-mono bg-pulse-accent/10 text-pulse-accent border border-pulse-accent/20">
              v1.0
            </div>
          </div>
        </div>
      </nav>

      {/* Grid background */}
      <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none z-0" />

      {/* Page content */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  )
}
