/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        pulse: {
          bg: '#080B14',
          surface: '#0D1120',
          card: '#111827',
          border: '#1E2A3A',
          accent: '#00F5C4',
          accentDim: '#00C49A',
          blue: '#3B82F6',
          purple: '#8B5CF6',
          red: '#EF4444',
          amber: '#F59E0B',
          text: '#E2E8F0',
          muted: '#64748B',
          dim: '#334155',
        }
      },
      boxShadow: {
        'glow-accent': '0 0 24px rgba(0,245,196,0.15)',
        'glow-blue': '0 0 24px rgba(59,130,246,0.15)',
        'glow-purple': '0 0 24px rgba(139,92,246,0.15)',
        'glass': '0 8px 32px rgba(0,0,0,0.4)',
      },
      backgroundImage: {
        'grid': "linear-gradient(rgba(30,42,58,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(30,42,58,0.4) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-up': 'slideUp 0.4s ease forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      }
    },
  },
  plugins: [],
}
