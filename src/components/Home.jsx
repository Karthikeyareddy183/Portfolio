/**
 * Home.jsx — the hub: who I am, and one card per system. Each card shows the
 * project's signature motion graphic and jumps straight into its workspace.
 */
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Command, MapPin } from 'lucide-react';
import { PROJECTS } from '../data/projects.js';
import { PROFILE } from '../data/profile.js';
import { Icon, GithubMark, LinkedinMark } from './Icon.jsx';
import { Signature } from './Signature.jsx';

/** Kinetic headline: words rise in one after another. */
export function KineticText({ text }) {
  const reduce = useReducedMotion();
  return (
    <h1 className="hero-title" aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="word-mask" aria-hidden="true">
          <motion.span className="word"
            initial={reduce ? false : { y: '110%' }} animate={{ y: 0 }}
            transition={{ delay: 0.08 * i, duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}>
            {w}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export function Home({ navigate, openPalette }) {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-kicker mono">
          <span className="live-dot" /> {PROFILE.role} · <MapPin size={12} /> {PROFILE.location}
        </div>
        <KineticText text={PROFILE.name} />
        <div className="hero-focus">
          {PROFILE.focus.map((f) => <span key={f} className="chip is-static">{f}</span>)}
        </div>
        <motion.p className="hero-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          {PROFILE.intro}
        </motion.p>
        <div className="hero-actions">
          <button className="btn" onClick={() => navigate(null)}>
            <ArrowLeft size={15} /> Portfolio
          </button>
          <button className="btn" onClick={openPalette}>
            <Command size={15} /> Jump anywhere <kbd>Ctrl</kbd><kbd>K</kbd>
          </button>
          <a className="btn" href={PROFILE.github} target="_blank" rel="noreferrer"><GithubMark size={15} /> GitHub</a>
          <a className="btn" href={PROFILE.linkedin} target="_blank" rel="noreferrer"><LinkedinMark size={15} /> LinkedIn</a>
        </div>
      </section>

      <section aria-label="Systems">
        <div className="section-head">
          <span className="eyebrow">Systems · {PROJECTS.length}</span>
          <span className="mono muted kbd-hint">Press <kbd>1</kbd>–<kbd>{PROJECTS.length}</kbd> to open</span>
        </div>
        <div className="system-grid">
          {PROJECTS.map((p, i) => (
            <motion.button key={p.id} className="card system-card" style={{ '--accent': p.accent }}
              onClick={() => navigate(p.id)}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.45, ease: 'easeOut' }}>
              <div className="system-card-top">
                <span className="system-index mono">{p.index}</span>
                <span className="system-icon"><Icon name={p.icon} size={20} /></span>
              </div>
              <div className="system-sig"><Signature project={p} /></div>
              <h2>{p.title}</h2>
              <p className="muted">{p.tagline}</p>
              <div className="system-metric">
                <span className="metric-value">{p.metrics[0].value}</span>
                <span className="muted">{p.metrics[0].label}</span>
              </div>
              <span className="system-open">Open system <ArrowRight size={15} /></span>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}
