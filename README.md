# Portfolio site (GitHub Pages)

Static, dependency-free. `node build.mjs` renders `dist/` (EN at `/`, RU at `/ru/`).
`node scripts/fetch-contributions.mjs` refreshes `data/contributions.json` from the GitHub API.

## Deploy
1. Create a repo named `Krasavinigor.github.io`, push this folder to `main`.
2. Settings → Pages → Source: **GitHub Actions**.
3. The workflow deploys on every push and refreshes merged PRs daily.

## After the first deploy
- Add the site in Google Search Console and submit `/sitemap.xml`.
- Put the URL in the GitHub profile, LinkedIn, Telegram bio.
- Using a custom domain? Change `SITE` in `build.mjs`.
- Edit copy in the `T` object at the top of `build.mjs`.
