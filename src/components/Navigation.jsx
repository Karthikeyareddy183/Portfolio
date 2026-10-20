/**
 * Navigation.jsx — the three ways to move around, all reflecting the same
 * route so the user always knows where they are:
 *   Sidebar   (≥1024px) — tree: Systems → views, with active indicators
 *   TopBar    (all)     — breadcrumb, prev/next system, search trigger
 *   MobileDock(<1024px) — thumb-reachable bottom bar for the hub + each system
 * The KR brand mark always returns to the portfolio (#/).
 */
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Command, House, Search, UserRound } from 'lucide-react';
import { PROJECTS, TABS, getProject } from '../data/projects.js';
import { PROFILE } from '../data/profile.js';
import { Icon, GithubMark, LinkedinMark } from './Icon.jsx';

export function Sidebar({ route, navigate, openPalette }) {
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <button className="brand" onClick={() => navigate(null)}>
        <span className="brand-mark mono">KR</span>
        <span className="brand-text">
          <strong>{PROFILE.name}</strong>
          <span className="muted">{PROFILE.role}</span>
        </span>
      </button>

      <button className="search-trigger" onClick={openPalette}>
        <Search size={15} /> <span>Search</span> <kbd>Ctrl K</kbd>
      </button>

      <nav className="side-nav">
        <button className="side-link" onClick={() => navigate(null)}>
          <UserRound size={16} /> Portfolio
        </button>
        <button className={`side-link${route.project === 'systems' ? ' is-on' : ''}`} onClick={() => navigate('systems')}>
          <House size={16} /> Overview of systems
        </button>

        <span className="side-section mono">SYSTEMS</span>
        {PROJECTS.map((p, i) => {
          const on = route.project === p.id;
          return (
            <div key={p.id} className="side-group" style={{ '--accent': p.accent }}>
              <button className={`side-project${on ? ' is-on' : ''}`} onClick={() => navigate(p.id)}
                aria-current={on ? 'page' : undefined}>
                {on && <motion.span layoutId="side-bar" className="side-bar" />}
                <span className="side-index mono">{p.index}</span>
                <span className="side-title">{p.short}</span>
                <kbd className="side-kbd">{i + 1}</kbd>
              </button>
              {on && (
                <motion.div className="side-tabs" initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.25 }}>
                  {TABS.map((t) => (
                    <button key={t.id} className={`side-tab${route.tab === t.id ? ' is-on' : ''}`}
                      onClick={() => navigate(p.id, t.id)}>
                      <Icon name={t.icon} size={14} /> {t.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="side-foot">
        <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><GithubMark size={16} /></a>
        <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><LinkedinMark size={16} /></a>
        <span className="mono muted">v1.0</span>
      </div>
    </aside>
  );
}

export function TopBar({ route, navigate, openPalette }) {
  const project = getProject(route.project);
  const idx = project ? PROJECTS.indexOf(project) : -1;
  const tab = TABS.find((t) => t.id === route.tab);
  const prev = idx >= 0 && PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = idx >= 0 && PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <header className="topbar">
      <button className="topbar-brand mono" onClick={() => navigate(null)} aria-label="Portfolio">KR</button>
      <nav className="crumbs mono" aria-label="Breadcrumb">
        <button onClick={() => navigate('systems')}>systems</button>
        {project && (
          <>
            <ChevronRight size={13} className="muted" />
            <button style={{ color: project.accent }} onClick={() => navigate(project.id)}>
              {project.index} {project.short.toLowerCase()}
            </button>
            <ChevronRight size={13} className="muted" />
            <span aria-current="page">{tab?.label.toLowerCase()}</span>
          </>
        )}
      </nav>
      <div className="topbar-actions">
        {project && (
          <>
            <button className="icon-btn" onClick={() => navigate(prev.id, route.tab)} aria-label={`Previous system: ${prev.title}`}>
              <ChevronLeft size={16} />
            </button>
            <button className="icon-btn" onClick={() => navigate(next.id, route.tab)} aria-label={`Next system: ${next.title}`}>
              <ChevronRight size={16} />
            </button>
          </>
        )}
        <button className="icon-btn topbar-search" onClick={openPalette} aria-label="Open command palette">
          <Command size={16} />
        </button>
      </div>
    </header>
  );
}

export function MobileDock({ route, navigate }) {
  const items = [{ id: 'systems', short: 'Systems', icon: null, accent: '#3B82F6' }, ...PROJECTS];
  return (
    <nav className="dock" aria-label="Systems">
      {items.map((p) => {
        const on = route.project === p.id;
        return (
          <button key={p.id} className={`dock-item${on ? ' is-on' : ''}`}
            style={{ '--accent': p.accent }} onClick={() => navigate(p.id, p.id !== 'systems' ? route.tab : undefined)}
            aria-current={on ? 'page' : undefined}>
            {on && <motion.span layoutId="dock-pill" className="dock-pill" />}
            {p.icon ? <Icon name={p.icon} size={19} /> : <House size={19} />}
            <span>{p.short}</span>
          </button>
        );
      })}
    </nav>
  );
}
