# ⚡ ScrapePulse — Competitor Ad & Hook Intelligence Dashboard

> API-free. Zero cost. Production-grade.

ScrapePulse analyzes competitor marketing angles across Meta, Google, LinkedIn, and YouTube using local intelligence — no API keys, no subscriptions, no backend.

---

## 🚀 Quick Start (Local Dev)

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
# http://localhost:5173
```

---

## 📁 File Structure

```
scrapepulse/
├── public/
│   └── favicon.svg              # App favicon
├── src/
│   ├── components/
│   │   ├── Layout.jsx           # Nav + ambient background shell
│   │   ├── CompetitorInput.jsx  # Domain + platform form
│   │   ├── ScoreCard.jsx        # Animated metric card
│   │   ├── HookCard.jsx         # Single hook display with copy
│   │   ├── RecommendationCard.jsx # Priority-coded insight card
│   │   ├── FrameworkChart.jsx   # Recharts donut distribution chart
│   │   └── ExportBar.jsx        # CSV + JSON download buttons
│   ├── pages/
│   │   ├── LandingPage.jsx      # Hero + feature showcase
│   │   └── DashboardPage.jsx    # Full intelligence command center
│   ├── utils/
│   │   └── engine.js            # Core scoring + hook generation engine
│   ├── data/
│   │   ├── hooks.js             # Hook templates + platform configs
│   │   └── recommendations.js  # Rule-based recommendation system
│   ├── App.jsx                  # Router
│   ├── main.jsx                 # React entry point
│   └── index.css                # Tailwind + custom styles
├── index.html                   # HTML shell + Google Fonts
├── vite.config.js               # Vite config
├── tailwind.config.js           # Tailwind + custom tokens
├── postcss.config.js            # PostCSS
├── netlify.toml                 # Netlify SPA routing
└── package.json                 # Dependencies
```

---

## 📤 GitHub Upload

```bash
# Inside the scrapepulse/ folder:

git init
git add .
git commit -m "feat: initial ScrapePulse v1.0"

# Create repo on github.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/scrapepulse.git
git branch -M main
git push -u origin main
```

---

## 🌐 Netlify Deployment

1. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
2. Connect your GitHub account
3. Select the `scrapepulse` repository
4. Set build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy site**

The `netlify.toml` already handles SPA routing (React Router works without 404s).

---

## ⚙️ Build Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start local dev server at localhost:5173 |
| `npm run build` | Build for production → `/dist` folder |
| `npm run preview` | Preview production build locally |

---

## 🧠 How the Engine Works

**Zero APIs.** Everything is deterministic and seeded from the domain name:

1. `hashString(domain)` → unique integer seed
2. Seed drives `seededRandom()` → consistent scores per domain
3. Hook templates are filled with platform/domain context
4. Scores weighted by platform (e.g. Authority works better on LinkedIn)
5. Rules engine fires recommendations based on score thresholds

Same domain + platform = same results every time. Different domains = different intelligence profiles.

---

## 🛠 Tech Stack (All Free)

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool |
| TailwindCSS | Styling |
| Recharts | Charts |
| Lucide React | Icons |
| React Router | Navigation |
| GitHub | Version control |
| Netlify | Free hosting |

---

Built by [Your Name] · Powered by Arketra Intelligence
