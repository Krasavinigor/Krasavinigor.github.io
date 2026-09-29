// Pulls merged PRs authored by USER into other people's repos and writes data/contributions.json.
// If GitHub is unreachable or rate-limited, keeps the existing file and exits 0.
import { readFile, writeFile } from 'node:fs/promises';

const USER = 'Krasavinigor';
const EXCLUDE_REPOS = new Set(['akvelon/beam']); // company fork of the same Beam work
const OUT = new URL('../data/contributions.json', import.meta.url);

const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-build' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

try {
  const q = encodeURIComponent(`author:${USER} type:pr is:merged -user:${USER}`);
  const prs = [];
  for (let page = 1; page <= 10; page++) {
    const res = await fetch(`https://api.github.com/search/issues?q=${q}&per_page=100&page=${page}`, { headers });
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const json = await res.json();
    for (const it of json.items) {
      const repo = it.repository_url.replace('https://api.github.com/repos/', '');
      if (EXCLUDE_REPOS.has(repo)) continue;
      prs.push({ repo, title: it.title, url: it.html_url, mergedAt: (it.closed_at || '').slice(0, 10) });
    }
    if (json.items.length < 100) break;
  }
  if (!prs.length) throw new Error('empty result, keeping old data');
  prs.sort((a, b) => b.mergedAt.localeCompare(a.mergedAt));
  await writeFile(OUT, JSON.stringify({ generatedAt: new Date().toISOString().slice(0, 10), prs }, null, 2) + '\n');
  console.log(`Wrote ${prs.length} PRs`);
} catch (e) {
  console.warn(`fetch-contributions: ${e.message}; using existing data`);
  await readFile(OUT); // fail loudly only if there is no fallback file
}
