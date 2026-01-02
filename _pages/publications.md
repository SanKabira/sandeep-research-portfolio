---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

<!-- 3D Citation Network Explorer -->
<div id="citation-explorer-wrapper">
    <div class="network-header">
        <h2>Interactive Citation Network</h2>
        <div class="network-controls">
            <input type="text" id="network-search" placeholder="Search papers..." />
            <div class="filter-group">
                <span class="legend-dot" style="background:#4299e1"></span> REIT
                <span class="legend-dot" style="background:#f56565"></span> InvIT
                <span class="legend-dot" style="background:#48bb78"></span> Market
            </div>
            <button id="network-export-btn" title="Save Image">📸</button>
        </div>
    </div>

    <div id="citation-network-container"></div>

    <!-- Slide-over Details Panel -->
    <div id="paper-details-panel">
        <button class="close-btn" onclick="document.getElementById('paper-details-panel').classList.remove('active')">×</button>
        <div class="content">
            <span class="theme-tag">REIT</span>
            <h3 class="title">Paper Title</h3>
            <p class="meta">Working Paper | 2024</p>
            <hr/>
            <p class="abstract">Click on a node in the 3D view to see details here. The graph represents the thematic connections between research works.</p>
        </div>
    </div>
</div>

<style>
#citation-explorer-wrapper {
    position: relative;
    margin: 2rem 0;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    background: #1a202c; /* Dark base for better 3D contrast */
    overflow: hidden;
    height: 600px;
}

.network-header {
    position: absolute;
    top: 0; left: 0; right: 0;
    padding: 1rem;
    z-index: 10;
    pointer-events: none; /* Let clicks pass to canvas */
    background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
}

.network-header h2 {
    margin: 0;
    color: white;
    font-size: 1.2rem;
    pointer-events: auto;
}

.network-controls {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-top: 0.5rem;
    pointer-events: auto;
}

#network-search {
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    color: white;
    font-size: 0.9rem;
}

.filter-group {
    display: flex;
    gap: 0.8rem;
    color: #cbd5e0;
    font-size: 0.85rem;
    align-items: center;
}

.legend-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }

#network-export-btn {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 4px;
    cursor: pointer;
    padding: 2px 6px;
    font-size: 1.2rem;
}

#citation-network-container {
    width: 100%;
    height: 100%;
}

.network-tooltip {
    position: absolute;
    background: rgba(0,0,0,0.85);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.9rem;
    z-index: 20;
    pointer-events: none;
    display: none;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255,255,255,0.1);
}

#paper-details-panel {
    position: absolute;
    top: 0; right: -320px;
    width: 300px;
    height: 100%;
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(10px);
    padding: 2rem 1.5rem;
    box-shadow: -5px 0 15px rgba(0,0,0,0.1);
    transition: right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 15;
    color: #2d3748;
}

#paper-details-panel.active { right: 0; }

.close-btn {
    position: absolute; top: 10px; right: 15px;
    background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #4a5568;
}

.theme-tag {
    background: #4a5568; color: white;
    padding: 2px 8px; border-radius: 4px;
    font-size: 0.75rem; text-transform: uppercase;
    font-weight: bold;
}

#paper-details-panel .title { margin: 0.5rem 0; line-height: 1.3; }
#paper-details-panel .meta { color: #718096; font-size: 0.9rem; margin-bottom: 1rem; }
#paper-details-panel hr { border: 0; border-top: 1px solid #e2e8f0; margin: 1rem 0; }
</style>

## Working Papers

### "Performance Analysis of Indian REITs: A Comparative Study with International Markets"
*Status: Under Review*

**Abstract**: This paper examines the performance characteristics of Indian Real Estate Investment Trusts (REITs) since their introduction in 2019. Using risk-adjusted return metrics and comparative analysis with established REIT markets in the US, Singapore, and Japan, we evaluate the efficiency and attractiveness of the Indian REIT market for both domestic and international investors.

**Keywords**: REITs, India, Performance Analysis, Real Estate Investment, Market Efficiency

---

### "Infrastructure Investment Trusts in India: An Emerging Asset Class Analysis"
*Status: In Preparation*

**Abstract**: This study provides a comprehensive analysis of Infrastructure Investment Trusts (InvITs) in India, examining their role in infrastructure financing and their performance as an investment vehicle. The paper analyzes the regulatory framework, market development, and investment characteristics of Indian InvITs.

**Keywords**: InvITs, Infrastructure Investment, India, Asset Class, Regulatory Framework

---

## Conference Presentations

### "REITs and InvITs: Transforming India's Real Estate Investment Landscape"
**Conference**: National Conference on Financial Markets and Investment Strategies  
**Date**: March 2024  
**Location**: Alliance School of Business, Bengaluru  
**Status**: Presented

### "Bengaluru Real Estate Market: Investment Opportunities through REITs"
**Conference**: South India Real Estate Investment Summit  
**Date**: January 2024  
**Location**: Bengaluru  
**Status**: Presented

---

## Research Articles (In Progress)

### "Regional Analysis of REIT Performance: The Bengaluru Advantage"
*Target Journal: Journal of Real Estate Research*  
*Expected Submission: June 2024*

### "Investor Sentiment and REIT Performance in Emerging Markets: Evidence from India"
*Target Journal: International Real Estate Review*  
*Expected Submission: September 2024*

### "Regulatory Evolution and Market Development: Indian REITs and InvITs"
*Target Journal: Journal of Property Investment & Finance*  
*Expected Submission: December 2024*

---

## Book Chapters

### "Real Estate Investment Trusts in India: Market Development and Future Prospects"
*Book: Emerging Trends in Indian Financial Markets*  
*Publisher: Springer (Proposed)*  
*Status: Chapter outline submitted*

---

## Research Reports

### "Quarterly REIT Performance Report - India"
*Frequency: Quarterly*  
*Audience: Academic and Industry Stakeholders*  
*Status: Ongoing since January 2024*

### "Bengaluru Real Estate Investment Tracker"
*Frequency: Bi-annual*  
*Focus: Commercial and residential real estate trends in Bengaluru*  
*Status: Ongoing*

---

## Peer Review Activities

- Reviewer for Journal of Real Estate Research (2024)
- Reviewer for International Journal of Strategic Property Management (2024)

---

## Media and Outreach

### Blog Posts
- "Understanding REITs: A Beginner's Guide for Indian Investors" - *Financial Express Online* (March 2024)
- "Why Bengaluru is Becoming a REIT Hotspot" - *Economic Times Real Estate* (February 2024)

### Interviews
- "The Future of REITs in India" - *CNBC-TV18* (January 2024)
- "Investment Opportunities in Indian InvITs" - *Bloomberg Quint* (December 2023)