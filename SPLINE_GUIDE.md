# Spline 3D Creation & Management Guide

This guide outlines the specifications and workflow for creating the interactive 3D scenes for your research portfolio using [Spline](https://spline.design/).

## 🎨 Global Design Standards
To maintain the "Netflix-style" premium academic aesthetic:
-   **Color Palette**:
    -   **Background**: Transparent (enable "Transparent Background" in Export).
    -   **Primary**: Gold (`#F6AD55`), Netflix Red (`#E50914`), Deep Blue (`#2C5282`).
    -   **Materials**: Glass, Matte Metal, and Emissive (Glow).
-   **Lighting**:
    -   Use **Soft Directional Light** + **Ambient Light (Blue-tinted)**.
    -   Avoid harsh shadows; use "Matcap" materials for cheaper performance on mobile if possible.

---

## 🏗 Scene Specifications

### 1. Homepage Cards (Role-Based Icons)
*Replace the current Three.js icons with high-fidelity Spline models.*

| Feature | Specification |
| :--- | :--- |
| **Concept** | 4 Separate Scenes (Recruiter, Researcher, Collaborator, Explorer). |
| **Models** | **Recruiter**: Futuristic Briefcase. **Researcher**: Holographic Scroll. **Collaborator**: Connected Nodes. **Explorer**: Spinning Globe. |
| **Animation** | **Idle**: Gentle float (Y-axis sin wave). **Hover**: Fast spin + Scale Up (1.2x). |
| **Events** | **Mouse Hover**: Triggers "Hover" state. **Mouse Down**: Triggers "Click" (Zoom out/dissolve). |
| **Camera** | **Orthographic** (for icon look) or **Perspective** (FOV 45). Fixed position. |

### 2. About Section (Market Overview)
*The replacement for the "DNA Helix" placeholder.*

| Feature | Specification |
| :--- | :--- |
| **Concept** | Abstract Architectural Growth. Representing REITs (Buildings) & InvITs (Towers/Bridges). |
| **Composition** | Central hero object (e.g., stylized skyscraper) surrounded by floating data points. |
| **Colors** | White & Blue Glass (Trust/Stability). |
| **Interaction** | **Mouse Move**: Parallax effect (Camera follows mouse slightly). |
| **File Config** | `scene.splinecode`. Max size: **1.5MB**. |

### 3. Research Dashboard
*A high-fidelity alternative to the Three.js dashboard.*

| Feature | Specification |
| :--- | :--- |
| **Concept** | 3D Topographic Map of Bengaluru. |
| **Elements** | Extruded map segments. Golden pins for key markets (Whitefield, ORR). |
| **States** | **State 1**: Flat Map. **State 2**: Extruded Data Bars (Market Performance). |
| **Interaction** | **Object Click**: Transition between State 1 and State 2. |
| **Performance** | Limit polygon count. Use "Cloner" objects for repeated city blocks. |

### 4. Publications (Citation Network)
*Visualizing the research connections.*

| Feature | Specification |
| :--- | :--- |
| **Concept** | 3D Constellation/Galaxy. |
| **Elements** | Glowing spheres (Nodes) connected by thin lines (Edges). |
| **Animation** | Continuous slow rotation of the entire group. |
| **Interaction** | **Hover**: Individual node glows brighter. |

---

## 🚀 Export & Integration Workflow

### 1. Export Settings (Critical for Performance)
In the Spline Editor toolbar, click **Export**:
1.  **Type**: Select **"Code"** -> **"Web Content"** (or just `.splinecode` link).
2.  **Settings**:
    -   [x] **Play Settings**: "Page Scroll" (No), "Hover" (Yes).
    -   [x] **Background Color**: **Transparent** (Crucial!).
    -   [x] **Logo**: **Hidden** (Professional plan) or leave as is.
    -   [x] **Script**: "Lazy Load" (Handled by our `spline-system.js`, but keeps file small).
    -   [x] **Compression**: Select **Draco Compression** (Reduces size by ~60%).

### 2. Getting the URL
Copy the URL ending in `.splinecode`.
*   Example: `https://prod.spline.design/UniqueIdHere/scene.splinecode`

### 3. Integrating into Portfolio
Use the standardized component in your Markdown files (`about.md`, etc.):

```liquid
{% include components/spline-scene.html 
   id="research-map" 
   url="INSERT_NEW_SPLINE_URL_HERE" 
   fallback="/assets/images/research-fallback.jpg" 
   height="500px" %}
```

---

## ✅ Deployment & Testing Checklist

### Pre-Export Optimization (In Spline)
- [ ] **Poly Count**: Keep entire scene under **50,000 triangles**.
- [ ] **Textures**: Resize all textures to **1024x1024** or 512x512.
- [ ] **Materials**: Remove unused materials. Avoid "Glass" with high refraction/blur on mobile scenes.

### Post-Integration Testing (Browser)
- [ ] **Load Time**: Does the spinner disappear within 3 seconds on fast wifi?
- [ ] **Mobile Touch**: Use Chrome DevTools (Device Toolbar). Verify you can tap to interact.
- [ ] **Scroll**: Ensure the 3D scene doesn't hijack scroll (two-finger drag check).
- [ ] **Fallback**: Intentionally break the URL (add a type) and check if the fallback image appears.

---

## 🏗 Spline Editor Tips
1.  **Group Hierarchy**: Name your objects clearly (e.g., "Building_A", "Pin_Whitefield"). This allows us to target them via code if we advance to the Spline API later.
2.  **States**: Use Spline "States" for hover animations. Base State = Normal. State 1 = Hover (Scale 1.1). Add an Event: "Mouse Hover" -> Transition to State 1.
3.  **Optimization**: Use **Instances** (Alt+Drag) for repeating objects like trees or chart bars. It saves file size.
