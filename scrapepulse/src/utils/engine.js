// src/utils/engine.js
// The ScrapePulse Intelligence Engine
// All logic is deterministic and local. No API calls.
// Scores are generated using domain string hashing + platform weights + seeded randomness.

import { HOOK_FRAMEWORKS, PLATFORMS, INDUSTRY_ROLES, METRICS } from '../data/hooks.js'
import { RECOMMENDATION_RULES } from '../data/recommendations.js'

// ─── Seeded Pseudo-Random (deterministic per domain) ───────────────────────
function hashString(str) {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i)
    hash = hash & hash
  }
  return Math.abs(hash)
}

function seededRandom(seed, min = 0, max = 100) {
  const x = Math.sin(seed + 1) * 10000
  const r = x - Math.floor(x)
  return Math.floor(r * (max - min) + min)
}

// ─── Hook Generator ────────────────────────────────────────────────────────
function fillTemplate(template, domain, platform, seed) {
  const role = INDUSTRY_ROLES[seededRandom(seed + 1, 0, INDUSTRY_ROLES.length)]
  const metric = METRICS[seededRandom(seed + 2, 0, METRICS.length)]
  const year = new Date().getFullYear()
  const quarter = Math.ceil((new Date().getMonth() + 1) / 3)
  const platformLabel = PLATFORMS[platform]?.label || 'this platform'

  return template
    .replace(/{domain}/g, domain)
    .replace(/{platform}/g, platformLabel)
    .replace(/{metric}/g, metric)
    .replace(/{role}/g, role)
    .replace(/{year}/g, year)
    .replace(/{quarter}/g, quarter)
}

export function generateHooks(domain, platform) {
  const baseSeed = hashString(domain + platform)
  const frameworks = Object.entries(HOOK_FRAMEWORKS)
  const result = []

  frameworks.forEach(([key, fw], fi) => {
    // Pick 1–2 templates per framework
    const count = seededRandom(baseSeed + fi * 7, 1, 3)
    const shuffled = [...fw.templates].sort(() =>
      seededRandom(baseSeed + fi * 13 + result.length, 0, 2) - 1
    )
    shuffled.slice(0, count).forEach((template, ti) => {
      const seed = baseSeed + fi * 100 + ti
      const strength = computeHookStrength(key, domain, platform, seed)
      result.push({
        id: `${key}-${fi}-${ti}`,
        framework: key,
        frameworkLabel: fw.label,
        frameworkColor: fw.color,
        frameworkBg: fw.bgColor,
        text: fillTemplate(template, domain, platform, seed),
        strength,
        ctr: computeCTR(strength, key, platform, seed),
        engagement: computeEngagement(key, platform, seed),
      })
    })
  })

  // Sort by strength descending
  return result.sort((a, b) => b.strength - a.strength)
}

// ─── Score Calculators ─────────────────────────────────────────────────────
function computeHookStrength(framework, domain, platform, seed) {
  const platformWeights = {
    meta: { PAS: 1.1, AIDA: 1.0, CURIOSITY: 1.2, SOCIAL_PROOF: 1.1, FOMO: 1.15, AUTHORITY: 0.9, PROBLEM_AGITATION: 1.05 },
    google: { PAS: 1.0, AIDA: 1.2, CURIOSITY: 0.9, SOCIAL_PROOF: 1.1, FOMO: 1.0, AUTHORITY: 1.2, PROBLEM_AGITATION: 0.95 },
    linkedin: { PAS: 0.95, AIDA: 1.1, CURIOSITY: 1.0, SOCIAL_PROOF: 1.2, FOMO: 0.8, AUTHORITY: 1.3, PROBLEM_AGITATION: 0.9 },
    youtube: { PAS: 1.05, AIDA: 1.0, CURIOSITY: 1.3, SOCIAL_PROOF: 1.0, FOMO: 1.1, AUTHORITY: 1.0, PROBLEM_AGITATION: 1.1 },
  }
  const weights = platformWeights[platform] || platformWeights.meta
  const base = seededRandom(seed + 3, 45, 90)
  const multiplier = weights[framework] || 1
  return Math.min(99, Math.round(base * multiplier))
}

function computeCTR(hookStrength, framework, platform, seed) {
  const bench = PLATFORMS[platform]?.benchmark?.ctr || 1.2
  const variance = seededRandom(seed + 5, -10, 25)
  const base = (hookStrength / 100) * 80 + variance
  return Math.max(10, Math.min(99, Math.round(base)))
}

function computeEngagement(framework, platform, seed) {
  const bench = PLATFORMS[platform]?.benchmark?.engagement || 60
  const base = seededRandom(seed + 6, bench - 20, bench + 30)
  return Math.max(10, Math.min(99, Math.round(base)))
}

// ─── Dashboard Scores ──────────────────────────────────────────────────────
export function computeDashboardScores(hooks, domain, platform) {
  if (!hooks.length) return null

  const avgStrength = Math.round(hooks.reduce((s, h) => s + h.strength, 0) / hooks.length)
  const avgEngagement = Math.round(hooks.reduce((s, h) => s + h.engagement, 0) / hooks.length)
  const avgCTR = Math.round(hooks.reduce((s, h) => s + h.ctr, 0) / hooks.length)

  const seed = hashString(domain + platform)
  const creativeFatigue = seededRandom(seed + 20, 20, 90)
  const funnelEfficiency = seededRandom(seed + 30, 30, 90)

  // Count frameworks used
  const frameworkCounts = {}
  hooks.forEach(h => {
    frameworkCounts[h.framework] = (frameworkCounts[h.framework] || 0) + 1
  })
  const frameworkDiversity = Object.keys(frameworkCounts).length

  // Find dominant framework
  const dominantFramework = Object.entries(frameworkCounts)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'AIDA'

  return {
    hookStrength: avgStrength,
    engagement: avgEngagement,
    ctrPrediction: avgCTR,
    creativeFatigue,
    funnelEfficiency,
    frameworkDiversity,
    dominantFramework,
    frameworkCounts,
  }
}

// ─── Recommendation Engine ─────────────────────────────────────────────────
export function generateRecommendations(scores) {
  if (!scores) return []
  return RECOMMENDATION_RULES
    .filter(rule => rule.condition(scores))
    .sort((a, b) => {
      const order = { high: 0, medium: 1, low: 2 }
      return order[a.priority] - order[b.priority]
    })
}

// ─── Framework Distribution Chart Data ────────────────────────────────────
export function buildChartData(hooks) {
  const counts = {}
  hooks.forEach(h => {
    counts[h.frameworkLabel] = (counts[h.frameworkLabel] || 0) + 1
  })
  return Object.entries(counts).map(([name, value]) => ({ name, value }))
}

// ─── CSV/JSON Export ───────────────────────────────────────────────────────
export function exportCSV(domain, platform, hooks, scores) {
  const header = 'Framework,Hook Text,Strength,CTR Score,Engagement Score\n'
  const rows = hooks.map(h =>
    `"${h.frameworkLabel}","${h.text.replace(/"/g, '""')}",${h.strength},${h.ctr},${h.engagement}`
  ).join('\n')
  const summary = `\n\nDASHBOARD SUMMARY\nDomain,${domain}\nPlatform,${platform}\nHook Strength,${scores.hookStrength}\nEngagement Score,${scores.engagement}\nCTR Prediction,${scores.ctrPrediction}\nCreative Fatigue Risk,${scores.creativeFatigue}\nFunnel Efficiency,${scores.funnelEfficiency}\n`
  return header + rows + summary
}

export function exportJSON(domain, platform, hooks, scores, recommendations) {
  return JSON.stringify({
    meta: {
      domain,
      platform,
      generatedAt: new Date().toISOString(),
      tool: 'ScrapePulse v1.0',
    },
    scores,
    hooks: hooks.map(({ id, frameworkLabel, text, strength, ctr, engagement }) => ({
      id, framework: frameworkLabel, text, strength, ctr, engagement
    })),
    recommendations: recommendations.map(r => ({
      id: r.id,
      priority: r.priority,
      category: r.category,
      title: r.title,
      message: r.message,
      action: r.action,
    }))
  }, null, 2)
}

export function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
