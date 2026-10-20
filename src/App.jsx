/**
 * App.jsx — shell: routing, global shortcuts, layout and page transitions.
 *
 * Routes:
 *   #/                       → portfolio (its own two-column layout, no sidebar)
 *   #/systems                → systems hub
 *   #/<system>[/<tab>]       → a system's workspace
 */
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Analytics } from '@vercel/analytics/react';
import { useHashRoute } from './hooks/useHashRoute.js';
import { useMediaQuery } from './hooks/useMediaQuery.js';
import { PROJECTS, TABS, getProject } from './data/projects.js';
import { Sidebar, TopBar, MobileDock } from './components/Navigation.jsx';
import { CommandPalette } from './components/CommandPalette.jsx';
import { Home } from './components/Home.jsx';
import { Portfolio } from './components/Portfolio.jsx';
import { ProjectView } from './components/ProjectView.jsx';

const SYSTEMS_HUB = 'systems';

export default function App() {
  const [route, rawNavigate] = useHashRoute();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const compactDiagram = useMediaQuery('(max-width: 720px)');

  // Unknown project/tab in the URL → fall back gracefully to the systems hub.
  const isPortfolio = !route.project;
  const project = getProject(route.project);
  const tab = TABS.some((t) => t.id === route.tab) ? route.tab : 'overview';
  const navRoute = { project: project?.id ?? SYSTEMS_HUB, tab };

  const navigate = useCallback((p, t) => {
    rawNavigate(p, t);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [rawNavigate]);

  // Switching between the portfolio and the dashboard swaps the whole layout,
  // which interrupts the smooth scroll above, so jump straight to the top.
  // ('instant' also overrides the CSS scroll-behavior: smooth.)
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [isPortfolio]);

  // Keep the document title in sync with the route.
  useEffect(() => {
    document.title = isPortfolio ? 'M Karthikeya Reddy — AI Engineer'
      : project ? `${project.short} · ${TABS.find((t) => t.id === tab).label} — Karthikeya Reddy`
        : 'AI Systems — Karthikeya Reddy';
  }, [isPortfolio, project, tab]);

  // Global shortcuts: Ctrl/⌘+K or "/" → palette, 0 → portfolio, 1–9 → systems.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
        return;
      }
      if (paletteOpen || e.target.closest?.('input, textarea') || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === '/') { e.preventDefault(); setPaletteOpen(true); }
      else if (e.key === '0') navigate(null);
      else if (/^[1-9]$/.test(e.key) && PROJECTS[+e.key - 1]) navigate(PROJECTS[+e.key - 1].id, tab);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paletteOpen, navigate, tab]);

  const openPalette = () => setPaletteOpen(true);
  // The hash is the router, so the skip link moves focus instead of using #main.
  const skipToMain = (e) => { e.preventDefault(); document.getElementById('main')?.focus(); };

  // Vercel Web Analytics. Hash navigation isn't a real page load, so pass the
  // route explicitly: this disables auto-tracking and records a page view
  // whenever the hash route changes (e.g. route "/[system]/[view]", path "/doc-agent/flow").
  const analytics = (
    <Analytics
      route={isPortfolio ? '/' : project ? (tab === 'overview' ? '/[system]' : '/[system]/[view]') : '/systems'}
      path={isPortfolio ? '/' : project ? `/${project.id}${tab === 'overview' ? '' : `/${tab}`}` : '/systems'} />
  );

  const palette = (
    <>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} navigate={navigate} />
      {analytics}
    </>
  );

  if (isPortfolio) {
    return (
      <>
        <a className="skip-link" href="#main" onClick={skipToMain}>Skip to content</a>
        <motion.main id="main" tabIndex={-1} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <Portfolio navigate={navigate} openPalette={openPalette} />
        </motion.main>
        {palette}
      </>
    );
  }

  return (
    <div className="shell">
      <a className="skip-link" href="#main" onClick={skipToMain}>Skip to content</a>
      {isDesktop && <Sidebar route={navRoute} navigate={navigate} openPalette={openPalette} />}

      <div className="main-col">
        <TopBar route={navRoute} navigate={navigate} openPalette={openPalette} />
        <main id="main" className="main" tabIndex={-1}>
          <AnimatePresence mode="wait">
            <motion.div key={project?.id ?? SYSTEMS_HUB}
              initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}>
              {project
                ? <ProjectView project={project} tab={tab} navigate={navigate} compact={compactDiagram} />
                : <Home navigate={navigate} openPalette={openPalette} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {!isDesktop && <MobileDock route={navRoute} navigate={navigate} />}
      {palette}
    </div>
  );
}
