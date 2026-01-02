---
layout: archive
title: "Research"
permalink: /research/
author_profile: true
---


<!-- Interactive Research Dashboard -->
<div id="research-dash-wrapper">
  <div class="dashboard-header">
    <h2>Interactive Market Analytics</h2>
    <p>Explore real-time data visualizations of the Indian REIT/InvIT market.</p>
  </div>
  
  <div class="dashboard-controls">
    <button class="dashboard-btn active" data-view="performance">Performance</button>
    <button class="dashboard-btn" data-view="map">Regional Map</button>
    <button class="dashboard-btn" data-view="investor">Investor Network</button>
  </div>

  <div id="research-dashboard-canvas"></div>
</div>

<style>
#research-dash-wrapper {
  margin: 2rem 0;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  border: 1px solid #e2e8f0;
}
.dashboard-header { margin-bottom: 1rem; text-align: center; }
.dashboard-header h2 { margin-bottom: 0.5rem; color: #2d3748; }
.dashboard-header p { color: #718096; font-size: 0.9rem; }

.dashboard-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.dashboard-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #cbd5e0;
  background: #f7fafc;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  color: #4a5568;
}

.dashboard-btn:hover { background: #edf2f7; }
.dashboard-btn.active {
  background: #3182ce;
  color: white;
  border-color: #3182ce;
}

#research-dashboard-canvas {
  width: 100%;
  height: 500px;
  background: #fcfcfc;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.dashboard-tooltip {
  position: absolute;
  background: rgba(0,0,0,0.8);
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
  white-space: pre-line;
  z-index: 10;
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  #research-dash-wrapper {
    background: #1a202c;
    border-color: #2d3748;
  }
  .dashboard-header h2 { color: #f7fafc; }
  .dashboard-btn {
    background: #2d3748;
    border-color: #4a5568;
    color: #e2e8f0;
  }
  .dashboard-btn:hover { background: #4a5568; }
  .dashboard-btn.active { background: #3182ce; }
  #research-dashboard-canvas { background: #171923; }
}
</style>

## Current Research Focus

My PhD research investigates the **Real Estate Investment Trusts (REITs) and Infrastructure Investment Trusts (InvITs)** market in India, with particular emphasis on the **Bengaluru metropolitan region**.

### Research Questions

1. **Market Performance Analysis**: How do Indian REITs and InvITs perform compared to traditional real estate investments and other asset classes?

2. **Regional Focus - Bengaluru**: What are the specific characteristics and performance drivers of real estate and infrastructure investments in Bengaluru?

3. **Investor Behavior**: What factors influence retail and institutional investor decisions in the Indian REIT/InvIT market?

4. **Regulatory Impact**: How do regulatory changes and policy frameworks affect the growth and performance of REITs and InvITs in India?

### Research Methodology

- **Quantitative Analysis**: Statistical analysis of REIT/InvIT performance data, market trends, and financial metrics
- **Comparative Studies**: Benchmarking against international REIT markets (US, Singapore, Japan)
- **Case Studies**: In-depth analysis of specific REITs/InvITs with Bengaluru exposure
- **Survey Research**: Primary data collection from investors and market participants

### Key Areas of Investigation

#### REITs in India
- Performance analysis of listed REITs (Embassy Office Parks, Mindspace Business Parks, Brookfield India Real Estate Trust)
- Yield analysis and dividend sustainability
- Portfolio composition and geographic diversification

#### InvITs in India
- Infrastructure sector performance and investment patterns
- Risk-return profiles across different infrastructure segments
- Regulatory framework impact on InvIT performance

#### Bengaluru Market Dynamics
- Commercial real estate trends in Bengaluru
- Infrastructure development and investment opportunities
- Comparative analysis with other major Indian cities (Mumbai, Delhi NCR, Pune)

### Expected Contributions

1. **Academic Contribution**: Comprehensive analysis of the Indian REIT/InvIT market with regional focus
2. **Policy Implications**: Recommendations for regulatory improvements and market development
3. **Investor Insights**: Practical guidance for investment decision-making in Indian REITs/InvITs
4. **Regional Development**: Understanding of Bengaluru's position in India's real estate investment landscape

### Research Timeline

- **Phase 1** (Completed): Literature review and theoretical framework development
- **Phase 2** (In Progress): Data collection and preliminary analysis
- **Phase 3** (Upcoming): Primary research and survey implementation
- **Phase 4** (Future): Final analysis and thesis writing