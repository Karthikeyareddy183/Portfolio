/**
 * ProjectView.jsx — one project "workspace": header, tab bar and the active
 * tab's content, plus a hand-off card to the next system.
 */
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Calendar, ExternalLink, Lock } from 'lucide-react';
import { PROJECTS, TABS } from '../data/projects.js';
import { Icon, GithubMark } from './Icon.jsx';
import { Signature } from './Signature.jsx';
import { OverviewView } from './OverviewView.jsx';
import { ArchitectureView } from './ArchitectureView.jsx';
import { FlowPlayer } from './FlowPlayer.jsx';
import { CodeView } from './CodeView.jsx';

export function ProjectView({ project, tab, navigate, compact }) {
  const idx = PROJECTS.indexOf(project);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const onTab = (t) => navigate(project.id, t);

  return (
    <article className="project" style={{ '--accent': project.accent }}>
      <header className="project-head">
        <div className="project-head-text">
          <div className="project-kicker mono">
            <span className="accent-dot" />
            SYSTEM {project.index} / {String(PROJECTS.length).padStart(2, '0')}
            <span className="muted"><Calendar size={12} /> {project.period}</span>
          </div>
          <motion.h1 key={project.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}>
            {project.title}
          </motion.h1>
          <p className="project-tagline">{project.tagline}</p>
          {project.repo ? (
            <a className="link mono" href={project.repo} target="_blank" rel="noreferrer">
              <GithubMark size={14} /> {project.repo.replace('https://github.com/', '')} <ExternalLink size={12} />
            </a>
          ) : (
            <span className="link mono"><Lock size={13} /> Runs locally · source not public</span>
          )}
        </div>
        <div className="project-sig card">
          <Signature project={project} />
        </div>
      </header>

      {/* Tabs: the same four views exist for every system, in the same order */}
      <nav className="tabs" role="tablist" aria-label={`${project.short} views`}>
        {TABS.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id}
            className={`tab${tab === t.id ? ' is-on' : ''}`} onClick={() => onTab(t.id)}>
            {tab === t.id && (
              <motion.span layoutId="tab-pill" className="tab-pill"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
            )}
            <Icon name={t.icon} size={15} className="tab-icon" />
            <span>{t.label}</span>
          </button>
        ))}
      </nav>

      <AnimatePresence mode="wait">
        <motion.section key={`${project.id}-${tab}`} className="tab-body" role="tabpanel"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}>
          {tab === 'overview' && <OverviewView project={project} onTab={onTab} />}
          {tab === 'architecture' && <ArchitectureView project={project} compact={compact} />}
          {tab === 'flow' && <FlowPlayer key={project.id} project={project} compact={compact} />}
          {tab === 'code' && <CodeView project={project} />}
        </motion.section>
      </AnimatePresence>

      <button className="card next-card" style={{ '--next': next.accent }} onClick={() => navigate(next.id)}>
        <span className="mono muted">Next system · {next.index}</span>
        <span className="next-title"><Icon name={next.icon} size={18} /> {next.title}</span>
        <ArrowRight className="next-arrow" size={20} />
      </button>
    </article>
  );
}
