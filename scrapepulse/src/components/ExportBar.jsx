import React from 'react'
import { Download, FileJson, FileText } from 'lucide-react'
import { exportCSV, exportJSON, downloadFile } from '../utils/engine.js'

export default function ExportBar({ domain, platform, hooks, scores, recommendations }) {
  function handleCSV() {
    const csv = exportCSV(domain, platform, hooks, scores)
    downloadFile(csv, `scrapepulse-${domain}-${platform}.csv`, 'text/csv')
  }

  function handleJSON() {
    const json = exportJSON(domain, platform, hooks, scores, recommendations)
    downloadFile(json, `scrapepulse-${domain}-${platform}.json`, 'application/json')
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-mono text-pulse-muted uppercase tracking-widest hidden sm:block">Export</span>
      <button
        onClick={handleCSV}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass border border-pulse-border text-pulse-muted hover:text-pulse-text hover:border-pulse-accent/30 transition-all text-xs font-mono group"
      >
        <FileText size={12} className="group-hover:text-pulse-accent transition-colors" />
        CSV
      </button>
      <button
        onClick={handleJSON}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass border border-pulse-border text-pulse-muted hover:text-pulse-text hover:border-pulse-blue/30 transition-all text-xs font-mono group"
      >
        <FileJson size={12} className="group-hover:text-blue-400 transition-colors" />
        JSON
      </button>
    </div>
  )
}
