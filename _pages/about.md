---
layout: single
title: "About Me"
permalink: /about/
author_profile: true
share: true
include_3d_nav: true
---

<!-- Spline Viewer Setup -->
<script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.59/build/spline-viewer.js"></script>

<section id="hero" class="hero-section">
  <div style="position: relative; width: 100%; max-height: 500px; overflow: hidden; border-radius: 12px; margin-bottom: 2rem;">
    <img 
      src="{{ '/assets/images/hero-reit.jpg' | relative_url }}" 
      alt="Future of REITs" 
      style="width: 100%; height: 100%; object-fit: cover;"
      loading="eager"
    />
  </div>
  <div class="hero-text">
    <h1>PhD Research Portfolio</h1>
    <p>REITs & InvITs Specialization</p>
  </div>
  
  <p style="margin-top: 2rem;">I am a PhD Research Scholar at <strong>Alliance School of Business, Alliance University, Bengaluru</strong>, specializing in <strong>Real Estate Investment Trusts (REITs)</strong> and <strong>Infrastructure Investment Trusts (InvITs)</strong> in the Indian market.</p>
</section>

<!-- ===== Featured Video Section ===== -->
<section style="max-width:1100px; margin:1.5rem auto; padding:0 1rem;">
  <div style="position:relative; padding-top:56.25%; border-radius: 14px; overflow:hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.12);">
    <video
      style="position:absolute; top:0; left:0; width:100%; height:100%; border:0; object-fit:cover;"
      playsinline
      autoplay
      loop
      controls
      preload="metadata"
    >
      <source src="{{ '/Futuristic_Infrastructure_Investment_Vision.mp4' | relative_url }}" type="video/mp4" />
      Sorry, your browser doesn't support embedded videos. You can <a href="{{ '/Futuristic_Infrastructure_Investment_Vision.mp4' | relative_url }}">download the video</a> instead.
    </video>
  </div>
  <div style="text-align:center; font-size:0.95rem; color:#4b5563; margin-top:.5rem;">
    If the video doesn't load, <a href="{{ '/Futuristic_Infrastructure_Investment_Vision.mp4' | relative_url }}" target="_blank" rel="noopener">open it in a new tab</a>.
  </div>
</section>

<!-- About Section with 3D Paths -->
<section id="about" class="about-section">
  {% include components/spline-scene.html 
     id="about-main" 
     url="https://prod.spline.design/4uHFJsL4LM0yUs72/scene.splinecode" 
     caption="Loading DNA Helix..." 
     height="400px" %}
  <div class="about-content">
    <h2>Current Research Focus</h2>
    <p>My doctoral research investigates the performance characteristics, market dynamics, and investment potential of REITs and InvITs in India, with particular emphasis on the <strong>Bengaluru metropolitan region</strong>. This research aims to contribute to the understanding of these emerging asset classes in the Indian context and provide insights for investors, policymakers, and market participants.</p>
  </div>
</section>

### Research Supervision
**Primary Supervisor**: Dr. Aparna Pavani. S  
*Associate Professor, Alliance School of Business*

<!-- Interactive Research Visualizations -->
<div class="research-viz-section">
    
    <!-- 1. REIT Visualization -->
    <div class="viz-block">
        <div class="viz-text">
            <h3>REIT Performance Analysis</h3>
            <p>Evaluating the growth trajectory of Indian REITs relative to global benchmarks. Click on the 3D structures to see key performance metrics.</p>
        </div>
        <div class="research-viz-container" data-viz-type="reit-structure" style="height: 350px; width: 100%; border-radius: 12px; overflow: hidden; background: rgba(0,0,0,0.02);"></div>
    </div>

    <!-- 2. InvIT Components -->
    <div class="viz-block">
        <div class="research-viz-container" data-viz-type="invit-components" style="height: 350px; width: 100%; border-radius: 12px; overflow: hidden; background: rgba(0,0,0,0.02);"></div>
        <div class="viz-text">
            <h3>InvIT Market Development</h3>
            <p>Analyzing the infrastructure components driving InvIT adoption. Interact with the nodes to explore sector-specific data.</p>
        </div>
    </div>

    <!-- 3. Bengaluru Focus -->
    <div class="viz-block">
        <div class="viz-text">
            <h3>Bengaluru Regional Dynamics</h3>
            <p>A deep dive into the micro-markets of Bengaluru. The heatmap reflects commercial absorption rates.</p>
        </div>
        <div class="research-viz-container" data-viz-type="bengaluru-map" style="height: 350px; width: 100%; border-radius: 12px; overflow: hidden; background: rgba(0,0,0,0.02);"></div>
    </div>

</div>

<style>
.research-viz-section {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    margin: 3rem 0;
}
.viz-block {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: center;
}
.viz-text h3 { margin-top: 0; color: #2c5282; }
@media(max-width: 768px) {
    .viz-block { grid-template-columns: 1fr; }
    .viz-block > div:first-child { order: 2; } /* Image on top usually better, but alternating is fine */
}
</style>

{% include components/research-schema.html %}

---

<!-- Timeline/Milestones Section -->
<section id="milestones" class="milestones-section">
  <h2>Research Milestones</h2>
  <div style="position: relative; height: 400px; width: 100%; margin: 40px 0;">
    <spline-viewer 
      id="spline-milestones" 
      url="https://prod.spline.design/4uHFJsL4LM0yUs72/scene.splinecode" 
      loading="lazy" 
      style="width:100%; height:100%;">
    </spline-viewer>
    <div id="preloader-milestones" class="spline-preloader">Loading Ticker...</div>
  </div>
  <div class="recent-updates">
    <h3>Recent Updates</h3>
    <p><strong>March 2024</strong>: Presented research findings at the National Conference on Financial Markets and Investment Strategies</p>
    <p><strong>February 2024</strong>: Successfully defended PhD research proposal with distinction</p>
    <p><strong>January 2024</strong>: Featured in CNBC-TV18 interview discussing the future of REITs in India</p>
  </div>
</section>

<!-- Interactive Skills Section -->
<section id="skills" class="skills-section">
  <h2>Research & Technical Skills</h2>
  <div style="position: relative; height: 450px; width: 100%;">
    <spline-viewer 
      id="spline-skills" 
      url="https://prod.spline.design/4uHFJsL4LM0yUs72/scene.splinecode" 
      loading="lazy" 
      style="width:100%; height:100%;">
    </spline-viewer>
    <div id="preloader-skills" class="spline-preloader">Loading Skills...</div>
  </div>
  <div class="skills-list">
    <div class="skill">REITs Analysis</div>
    <div class="skill">Python Programming</div>
    <div class="skill">TradingView</div>
    <div class="skill">Statistical Modeling</div>
  </div>
</section>

---

## Quick Links

📊 **[Research]({{ '/research/' | relative_url }})** - Detailed overview of my PhD research on REITs and InvITs

📝 **[Publications]({{ '/publications/' | relative_url }})** - Academic papers, conference presentations, and working papers

🎓 **[Teaching]({{ '/teaching/' | relative_url }})** - Courses taught, student mentoring, and educational contributions

📈 **[Progress]({{ '/progress/' | relative_url }})** - Real-time updates on research milestones and achievements

📄 **[CV]({{ '/cv/' | relative_url }})** - Comprehensive curriculum vitae and professional background

📧 **[Contact]({{ '/contact/' | relative_url }})** - Get in touch for collaborations and academic discussions

---

<!-- ===== Featured Image Section (moved below Quick Links) ===== -->
<section style="max-width:1100px; margin:2.0rem auto; padding:0 1rem;">
  <style>
    .figure-card {
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 18px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.12);
      overflow: hidden;
    }
    .figure-card img {
      width: 100%;
      height: auto;
      display: block;
    }
    .figure-caption {
      padding: 0.875rem 1rem;
      text-align: center;
      font-size: 0.95rem;
      color: #4b5563;
    }
    @media (prefers-color-scheme: dark) {
      .figure-card { background: #0b0c0d; border-color: #202225; }
      .figure-caption { color: #c7cad1; }
    }
  </style>

  <figure class="figure-card">
    <img
      src="https://cdn.cosmos.so/142fec22-fa20-4440-b1a3-8a4bbf06844a?format=jpeg"
      alt="Spiral staircase view from above"
      loading="lazy"
    />
    <figcaption class="figure-caption">
      Spiral staircase (Vatican Museums)
    </figcaption>
  </figure>
</section>

## Recent Publications

<style>
.pub-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}
.pub-card {
  background: #fff;
  border: 1px solid #edf2f7;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0,0,0,.04);
}
.pub-card h4 { margin: 0 0 .35rem 0; font-size: 1.05rem; }
.pub-card .meta { color: #4a5568; font-size: .9rem; margin-bottom: .5rem; }
.pub-card a { color: #2b6cb0; text-decoration: none; font-weight: 600; }
.pub-card a:hover { text-decoration: underline; }
</style>

<div class="pub-grid">
  <div class="pub-card">
    <h4>Monetizing Digital Infrastructure</h4>
    <div class="meta">2024</div>
    <a href="/sandeep-research-portfolio/assets/files/Monetizing%20Digital%20Infrastructure.pdf" target="_blank" rel="noopener">Download PDF</a>
  </div>
  <div class="pub-card">
    <h4>ADRIS 2025 Revised</h4>
    <div class="meta">2025</div>
    <a href="/sandeep-research-portfolio/assets/files/ADRIS%202025%20Revised.pdf" target="_blank" rel="noopener">Download PDF</a>
  </div>
</div>

---

*"Bridging the gap between academic research and practical real estate investment insights in the Indian market."*

<script>
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('spline-viewer').forEach((viewer, index) => {
    const id = viewer.id || `spline-${index}`;
    // Extract section name if ID format is spline-{section}
    const section = id.split('-')[1]; 
    const preloaderId = `preloader-${section}`;
    const preloader = document.getElementById(preloaderId);
    
    viewer.addEventListener('load', () => {
      viewer.style.visibility = 'visible';
      viewer.style.opacity = '1';
      if (preloader) preloader.style.display = 'none';
      console.log(`Spline loaded: ${id}`);
    });
    
    // 10s fallback
    setTimeout(() => {
      if (viewer.style.visibility !== 'visible') {
        if (preloader) preloader.remove();
        viewer.style.visibility = 'visible';
        console.warn(`Spline load fallback: ${id}`);
      }
    }, 10000);
  });
});
</script>
