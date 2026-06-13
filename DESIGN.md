---
version: alpha
name: Notion Design Analysis
description: An analysis of Notion's design language - a warm, paper-calm productivity system built on an off-white canvas, near-black Inter type, and a single Notion Blue CTA. Applied to Sandeep S Research Portfolio (REITs & InvITs, Alliance University, Bengaluru).

colors:
  primary: "#0075de"
  primary-active: "#005bab"
  secondary: "#213183"
  on-primary: "#ffffff"
  canvas: "#ffffff"
  canvas-soft: "#f6f5f4"
  surface: "#ffffff"
  hairline: "#e6e6e6"
  ink: "#1a1a1a"
  charcoal: "#31302e"
  stone: "#615d59"
  ash: "#a39e98"
  danger: "#e03e3e"
  success: "#0f7b6c"
  warning: "#d9730d"

typography:
  font-family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
  display-1:
    size: "64px"
    weight: 700
    line-height: 1.1
    letter-spacing: "-2.125px"
  display-2:
    size: "48px"
    weight: 700
    line-height: 1.1
    letter-spacing: "-1.5px"
  h1:
    size: "40px"
    weight: 700
    line-height: 1.2
    letter-spacing: "-1.25px"
  h2:
    size: "32px"
    weight: 700
    line-height: 1.2
    letter-spacing: "-0.75px"
  h3:
    size: "26px"
    weight: 700
    line-height: 1.2
    letter-spacing: "-0.5px"
  h4:
    size: "22px"
    weight: 600
    line-height: 1.3
    letter-spacing: "-0.25px"
  body:
    size: "16px"
    weight: 400
    line-height: 1.5
  body-sm:
    size: "14px"
    weight: 400
    line-height: 1.5
  eyebrow:
    size: "12px"
    weight: 600
    letter-spacing: "0.08em"
    transform: uppercase

spacing:
  base: "8px"
  xxs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "28px"
  xxl: "32px"

rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"

components:
  button-cta:
    background: "#0075de"
    color: "#ffffff"
    border-radius: "9999px"
    padding: "10px 20px"
    font-weight: 600
    font-size: "15px"
  button-cta-hover:
    background: "#005bab"
  button-utility:
    border-radius: "8px"
    border: "1px solid #e6e6e6"
    background: "#ffffff"
    color: "#31302e"
  card:
    border-radius: "12px"
    padding: "24px"
    border: "1px solid #e6e6e6"
    background: "#ffffff"
    box-shadow: "0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)"
  input:
    border-radius: "4px"
    border: "1px solid #e6e6e6"
    background: "#ffffff"
    padding: "8px 12px"
  nav:
    background: "#ffffff"
    border-bottom: "1px solid #e6e6e6"
    height: "64px"
    position: sticky
  hero-band:
    background: "#213183"
    color: "#ffffff"
    min-height: "100vh"
  section-soft:
    background: "#f6f5f4"

layout:
  max-width: "1200px"
  container-padding: "0 24px"
  grid-desktop: "3-column"
  grid-tablet: "2-column"
  grid-mobile: "1-column"
  section-gap: "80px"
  card-gap: "24px"

rules:
  - Use Inter as the primary typeface throughout. Load via Google Fonts: https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap
  - Page background is warm paper (#f6f5f4), card/panel surfaces are white (#ffffff)
  - All headings use font-weight 700 with negative letter-spacing for tight, heavy, quiet-confident feel
  - CTAs use pill-shaped (border-radius 9999px) Notion Blue (#0075de) buttons only
  - Navigation is sticky white with a hairline bottom border (#e6e6e6)
  - Hero section uses deep indigo (#213183) as the inverted/dark band
  - Cards rely on hairline borders and micro-shadows, not heavy frames
  - The sticker palette (sky, purple, pink, orange, teal, green, brown) is decorative only - never use for structural fills or CTAs
  - Eyebrow labels (section kickers) are 12px, 600 weight, uppercase, 0.08em letter-spacing
  - Whitespace is the primary grouping device - section gaps are large (80px)
  - Body copy is 16px / 1.5 line-height / weight 400 for maximum readability
  - All research content sections use max-width 72ch for optimal reading line length
  - Publication cards use Notion-style bordered cards with subtle shadow
  - Research tags/badges use the decorative sticker palette as background fills
  - Footer background uses canvas-soft (#f6f5f4), not white
---
