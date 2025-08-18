---
layout: single
title: "Research Progress"
permalink: /progress/
author_profile: true
---

<style>
:root {
  --brand: #2b6cb0;
  --brand-accent: #3182ce;
  --surface: #ffffff;
  --text: #1a202c;
  --muted: #4a5568;
  --bg: #f7fafc;
}

.progress-wrap {
  display: grid;
  gap: 2rem;
}

.progress-hero {
  background: linear-gradient(135deg, var(--brand), var(--brand-accent));
  color: #fff;
  border-radius: 12px;
  padding: 2rem;
}
.progress-hero h1 { margin: 0 0 .5rem 0; }
.progress-hero p { margin: 0; opacity: .95; }

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}
.project-card {
  background: var(--surface);
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0,0,0,.06);
  border: 1px solid rgba(0,0,0,.06);
  overflow: hidden;
  display: grid;
}
.project-card header { padding: 1rem 1rem .5rem; border-bottom: 1px solid #edf2f7; }
.project-card header h3 { margin: 0; color: var(--text); }
.project-card header .badge { display: inline-block; margin-top: .5rem; padding: .15rem .5rem; font-size: .75rem; border-radius: .5rem; background: #ebf8ff; color: #2a4365; }
.project-card .body { padding: 1rem; color: var(--muted); }
.project-card .meta { padding: 0 1rem 1rem; font-size: .875rem; color: var(--muted); }
.project-card .progress {
  height: 8px; background: #edf2f7; border-radius: 4px; margin: 0 1rem 1rem;
}
.project-card .progress > span { display: block; height: 100%; background: linear-gradient(90deg, var(--brand), var(--brand-accent)); border-radius: 4px; width: var(--value, 0%); }

.milestones {
  background: var(--bg);
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid #edf2f7;
}
.milestones ul { margin: 0; padding-left: 1.25rem; }
.milestones li { margin: .35rem 0; }

@media (max-width: 640px) {
  .progress-hero { padding: 1.25rem; border-radius: 10px; }
}
</style>

<div class="progress-wrap">
  <section class="progress-hero">
    <h1>Research Progress</h1>
    <p>Tracking key milestones and ongoing projects across REITs &amp; InvITs in India (Bengaluru focus).</p>
  </section>

  <section>
    <h2>Featured Research Projects</h2>
    <div class="projects-grid">
      <article class="project-card">
        <header>
          <h3>Indian REIT Performance Analytics</h3>
          <span class="badge">In Progress</span>
        </header>
        <div class="body">Risk-adjusted returns, volatility clustering, and macro sensitivity analysis for listed Indian REITs (2019–present).</div>
        <div class="meta">Methods: Time-series econometrics, GARCH, Fama–French style factor models</div>
        <div class="progress"><span style="--value: 65%"></span></div>
      </article>

      <article class="project-card">
        <header>
          <h3>InvIT Yield and Cash Flow Dynamics</h3>
          <span class="badge" style="background:#f0fff4;color:#22543d;">Data</span>
        </header>
        <div class="body">Distribution sustainability, sectoral risk profiles, and interest rate channel across transport and energy InvITs.</div>
        <div class="meta">Methods: Panel regression, regime-switching models</div>
        <div class="progress"><span style="--value: 45%"></span></div>
      </article>

      <article class="project-card">
        <header>
          <h3>Bengaluru Commercial Real Estate Pulse</h3>
          <span class="badge" style="background:#fff5f5;color:#742a2a;">Field</span>
        </header>
        <div class="body">Tenant mix, absorption trends, and rental resilience in Bengaluru’s Grade-A office submarkets.</div>
        <div class="meta">Methods: Case studies, expert interviews, spatial analysis</div>
        <div class="progress"><span style="--value: 55%"></span></div>
      </article>
    </div>
  </section>

  <section class="milestones">
    <h2>Recent Milestones</h2>
    <ul>
      <li>Q1 2024: Proposal defense completed; IRB approval granted.</li>
      <li>Q2 2024: Secondary datasets harmonized; preliminary models validated.</li>
      <li>Q3 2024: Investor survey launched; 40% responses collected.</li>
    </ul>
  </section>

  <section>
    <h2>What’s Next</h2>
    <ul>
      <li>Complete primary data collection and finalize interview coding.</li>
      <li>Submit first manuscript on Indian REIT performance drivers.</li>
      <li>Prepare conference presentation on Bengaluru CRE dynamics.</li>
    </ul>
  </section>
</div>