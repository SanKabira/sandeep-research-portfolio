# Deployment & Optimization Checklist

## 1. Pre-Deployment Optimization
- [ ] **Image Compression**: Ensure all JPG/PNG fallbacks in `assets/images/` are compressed (use TinyPNG or similar).
- [ ] **Minification**: Jekyll automatically minifies SCSS. Ensure JS files are clean.
- [ ] **Verify Fallbacks**: Test the "About" page with network disabled (Offline Mode) to see if fallbacks appear after 8 seconds.

## 2. Deployment Commands
Run these commands in your terminal to deploy to GitHub Pages:

```bash
# 1. Status Check
git status

# 2. Stage Changes
git add .

# 3. Commit with Message
git commit -m "Optimize: Spline 3D lazy loading and fallback system"

# 4. Push to Repository
git push origin master  # or 'main' depending on your branch
```

## 3. Post-Deployment Verification
Visit `https://sankabira.github.io/sandeep-research-portfolio/`

1. **Console Check**: Open DevTools (F12) -> Console.
   - Look for `"Antigravity 3D System: Online"`.
   - Ensure no RED errors appear for 404s.

2. **Network Performance**:
   - Open Network Tab -> Select "Fast 3G".
   - Reload Page.
   - Verify that 3D scenes load *after* you scroll them into view (Lazy Loading).

3. **Mobile Test**:
   - Open on your phone.
   - Check if the "Who's watching?" cards represent correctly.
   - Scroll to "About" -> Ensure the DNA Helix loads or shows a loading spinner.

## 4. Analytics Configuration
To track 3D engagement, ensure you have your Google Analytics ID in `_config.yml`:

```yaml
analytics:
  provider: "google-gtag"
  google:
    tracking_id: "G-XXXXXXXXXX" # Replace with your ID
```

The system will automatically log:
- `3d_scene_loaded`: Time taken to load.
- `3d_scene_fallback`: If it failed/timed out.
- `3d_interaction`: When users hover.

## 5. Troubleshooting
- **Scene Stuck Loading?** The 8-second safety timer will auto-remove the spinner and show the fallback image (if provided) or text.
- **403 Forbidden?** This means the Spline URL is restricted. Update the `url` in `_pages/about.md` or `_includes/components/spline-scene.html`.
