
# Academic Portfolio (Jekyll + academicpages)

This repository contains my academic website scaffolded to work with GitHub Pages using the **academicpages** remote theme.

## Quick Start

1. Create a new repo on GitHub (e.g., `sandeep-research-portfolio`).
2. Upload the contents of this folder, or unzip and push:
   ```bash
   unzip academic-portfolio.zip
   cd academic-site
   git init
   git add .
   git commit -m "Initial commit: academic portfolio"
   git branch -M main
   git remote add origin <YOUR_GITHUB_REPO_URL>
   git push -u origin main
   ```
3. In your GitHub repo, go to **Settings → Pages**, set:
   - **Source:** Deploy from a branch
   - **Branch:** `main` and `/ (root)`
4. Wait for GitHub Pages to build. Your site will be live at `https://<your-username>.github.io/<repo>/` (or on your custom domain).

## Where to edit
- `_pages/*.md` — Your main pages (Research, Progress, Proposal, Contact).
- `assets/img/profile.jpg` — Your profile image.
- `assets/files/Research_Proposal.pdf` — Your proposal.
- `_data/navigation.yml` — Top navigation.
- `_config.yml` — Site metadata.
