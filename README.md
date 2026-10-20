# AI Systems Dashboard

Portfolio of M Karthikeya Reddy (AI Engineer) plus interactive walkthroughs of four systems, each with an animated architecture graph and a step-by-step data-flow player.

| Route | Page |
|-------|------|
| `#/` | Portfolio: about, experience, projects, skills, education, contact (content in `src/data/portfolio.js`) |
| `#/systems` | Overview of all systems |
| `#/<system>[/<view>]` | A system's workspace (below) |

| # | System | Source | Deep link |
|---|--------|--------|-----------|
| 01 | TurnLab: monitoring and safe-retry layer for LiveKit voice agents | [turnlab](https://github.com/Karthikeyareddy183/turnlab) | `#/voice-agent` |
| 02 | DocMind: agentic RAG with verifiable, cited answers (LangGraph + pgvector) | [docmind-agentic-rag](https://github.com/Karthikeyareddy183/docmind-agentic-rag) | `#/doc-agent` |
| 03 | BERT Named Entity Recognition API (Flask + Streamlit) | [BERT-based-Named-Entity-Recognition-API](https://github.com/Karthikeyareddy183/BERT-based-Named-Entity-Recognition-API) | `#/bert-ner` |
| 04 | OpenClaw personal agent fleet (six agents, runs locally) | local config, not public | `#/openclaw-agents` |

The ids `voice-agent` and `doc-agent` predate the TurnLab and DocMind renames; they are kept so existing links keep working.

Every system has the same four views, in the same order: `overview`, `architecture`, `flow` and `code`. For example, `#/doc-agent/flow` opens the Doc Agent's data flow directly.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # static output in dist/
npm run preview   # serve the production build
```

## Navigation

- **Sidebar** (desktop): Systems → views tree with a live position indicator
- **Breadcrumb top bar**: shows where you are; ‹ › moves to the previous or next system and keeps the current view
- **Bottom dock** (mobile/tablet): Home plus the four systems, within thumb reach
- **Command palette**: `Ctrl/⌘ + K` or `/`. Searches systems, views and tech (e.g. "pgvector", "deepgram")
- **Shortcuts**: `1`–`4` jump to a system, `0` goes to the portfolio; in a data flow, `←`/`→` step and `Space` plays or pauses

## Structure

```
src/
  data/projects.js        ← all content: nodes, edges, flows, metrics, code (taken from the repos and the local OpenClaw config)
  data/portfolio.js       ← portfolio page content (from the resume; no phone number)
  data/profile.js         ← name, links
  components/
    SystemDiagram.jsx     ← animated SVG graph engine (desktop + mobile layouts)
    FlowPlayer.jsx        ← step-through data-flow player
    ArchitectureView.jsx  ← graph + component inspector
    OverviewView.jsx, CodeView.jsx, Signature.jsx (per-project motion graphic)
    Navigation.jsx        ← Sidebar, TopBar, MobileDock
    Portfolio.jsx         ← portfolio home page (#/)
    CommandPalette.jsx
  hooks/                  ← hash router, media query
  styles/global.css       ← tokens + all styles
```

To add a project, append an object to `PROJECTS` in `src/data/projects.js`. The navigation, palette, shortcuts and diagrams pick it up automatically.

## Deploy

The build is fully static. `base: './'` plus hash routing means it works from any path:

- **Vercel / Netlify**: import the repo; build command `npm run build`, output dir `dist`
- **GitHub Pages**: push `dist/` to a `gh-pages` branch, or use the official Pages action

## Stack

React 19 · Vite · [Motion](https://motion.dev) (UI and packet animation) · Lucide icons · Fira Code / Fira Sans. It respects `prefers-reduced-motion`.
