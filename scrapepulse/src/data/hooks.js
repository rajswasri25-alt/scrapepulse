// src/data/hooks.js
// Local hook intelligence dataset — no API required.
// These are archetypal hook structures mapped to each framework.
// The engine combines these with domain/platform context to simulate real competitor hooks.

export const HOOK_FRAMEWORKS = {
  PAS: {
    label: 'PAS',
    fullName: 'Problem → Agitate → Solve',
    color: '#EF4444',
    bgColor: 'rgba(239,68,68,0.1)',
    description: 'Identifies pain, twists the knife, then offers relief.',
    templates: [
      "Still losing {metric} to competitors? Most {role}s make this one mistake.",
      "Why does {domain} keep underperforming? The answer will surprise you.",
      "You're spending budget on ads that don't convert — and you don't even know why.",
      "The problem with {domain}'s current strategy isn't effort. It's direction.",
      "Tired of {metric} staying flat no matter what you try?",
      "Every day you delay costs you {metric}. Here's how to fix it.",
      "Your competitors have already solved this. Why haven't you?",
      "{domain} is losing ground. Here's the brutal truth about why.",
    ]
  },
  AIDA: {
    label: 'AIDA',
    fullName: 'Attention → Interest → Desire → Action',
    color: '#3B82F6',
    bgColor: 'rgba(59,130,246,0.1)',
    description: 'Classic funnel-driven persuasion arc.',
    templates: [
      "We analyzed 1,000 {platform} ads. Here's what actually works in {year}.",
      "Introducing the growth system that {metric} in 30 days — without extra budget.",
      "{domain}-level results are now possible for any brand. See how.",
      "What if you could double your {metric} using assets you already have?",
      "The {platform} playbook top brands don't want you to know.",
      "Stop guessing. Start scaling. The framework is finally here.",
      "From zero to {metric}: the exact steps we used for clients like you.",
      "This is what a winning {platform} ad strategy looks like in {year}.",
    ]
  },
  CURIOSITY: {
    label: 'Curiosity Gap',
    fullName: 'Curiosity Gap',
    color: '#8B5CF6',
    bgColor: 'rgba(139,92,246,0.1)',
    description: 'Opens a loop the brain desperately wants to close.',
    templates: [
      "We found something strange in {domain}'s ad data. Look at this.",
      "The metric everyone ignores is the one that's killing your {platform} ROI.",
      "Nobody talks about this {platform} feature. It changed everything for us.",
      "What happens when you run the same ad for 90 days? (We tried it.)",
      "There's a reason {domain}'s CTR is 3x the industry average. Here it is.",
      "Most marketers skip step 3. That's exactly why they stay stuck.",
      "This dashboard shouldn't exist. But it does — and it's free.",
      "We broke the rules on {platform} and {metric} went through the roof.",
    ]
  },
  SOCIAL_PROOF: {
    label: 'Social Proof',
    fullName: 'Social Proof',
    color: '#00F5C4',
    bgColor: 'rgba(0,245,196,0.1)',
    description: 'Leverages crowd wisdom and real-world validation.',
    templates: [
      "Over 2,400 marketers use this exact {platform} framework every week.",
      "{domain} grew {metric} using a strategy we're now sharing publicly.",
      "Case study: how a small brand outspent the competition by 0% and still won.",
      "Join 10,000+ agencies who stopped guessing and started growing.",
      "Rated #1 by freelancers for competitive ad intelligence in {year}.",
      "What 500 winning {platform} ads have in common — a breakdown.",
      "Our users averaged {metric} improvement in the first 60 days.",
      "'This is the only tool that actually changed how we run campaigns.' — Agency of the Year",
    ]
  },
  FOMO: {
    label: 'FOMO',
    fullName: 'Fear Of Missing Out',
    color: '#F59E0B',
    bgColor: 'rgba(245,158,11,0.1)',
    description: 'Creates urgency through scarcity and exclusion.',
    templates: [
      "Your competitors discovered this {platform} strategy 6 months ago.",
      "The brands winning on {platform} right now are doing one thing differently.",
      "This window is closing. Early movers on {platform} will own Q{quarter}.",
      "While you're reading this, someone else is stealing your audience.",
      "Last chance to get ahead before {platform}'s algorithm shift.",
      "The market leaders already have this. Do you?",
      "Q{quarter} ad season is here. Are you running the right angles yet?",
      "Every day without this data is a day your competitors are winning.",
    ]
  },
  AUTHORITY: {
    label: 'Authority',
    fullName: 'Authority',
    color: '#6366F1',
    bgColor: 'rgba(99,102,241,0.1)',
    description: 'Establishes credibility through expertise signals.',
    templates: [
      "After managing $4M+ in ad spend, here's what we know for sure.",
      "We've audited 300 {platform} campaigns. The pattern is undeniable.",
      "Industry data confirms: {domain}-style hooks outperform generic CTAs by 2.8x.",
      "The framework used by the top 1% of {platform} advertisers — explained.",
      "Backed by 5 years of competitor intelligence across 40 niches.",
      "This isn't theory. It's what works across every {platform} vertical.",
      "From the team that built campaigns for 200+ brands: the truth about {metric}.",
      "Award-winning strategy. Open-source knowledge. No gatekeeping.",
    ]
  },
  PROBLEM_AGITATION: {
    label: 'Problem Agitation',
    fullName: 'Problem Agitation',
    color: '#EC4899',
    bgColor: 'rgba(236,72,153,0.1)',
    description: 'Amplifies existing pain to drive urgency.',
    templates: [
      "You already know your ads aren't performing. But do you know WHY?",
      "The longer you wait, the more budget you're wasting on dead angles.",
      "Bad hooks don't just hurt CTR — they poison your entire brand perception.",
      "You hired the agency. You bought the tools. Why is {metric} still flat?",
      "Every weak headline is a sale that went to your competitor instead.",
      "Your audience has seen your ad 7 times. They're not clicking. Here's why.",
      "Burning budget on {platform} without intelligence is just expensive guessing.",
      "One bad creative decision can tank a quarter. Are you flying blind?",
    ]
  }
}

export const PLATFORMS = {
  meta: { label: 'Meta Ads', icon: '📘', color: '#1877F2', metric: 'ROAS', benchmark: { ctr: 1.2, engagement: 65 } },
  google: { label: 'Google Ads', icon: '🔍', color: '#4285F4', metric: 'Quality Score', benchmark: { ctr: 3.5, engagement: 55 } },
  linkedin: { label: 'LinkedIn Ads', icon: '💼', color: '#0A66C2', metric: 'Lead Quality', benchmark: { ctr: 0.6, engagement: 45 } },
  youtube: { label: 'YouTube Ads', icon: '▶️', color: '#FF0000', metric: 'View-Through Rate', benchmark: { ctr: 0.5, engagement: 70 } },
}

export const INDUSTRY_ROLES = [
  'marketer', 'founder', 'agency owner', 'freelancer', 'brand manager',
  'growth hacker', 'CMO', 'media buyer', 'content strategist'
]

export const METRICS = [
  'ROAS by 3x', 'CTR by 40%', 'conversion rate', 'cost per lead',
  'ad spend efficiency', 'organic reach', 'engagement rate', 'revenue'
]
