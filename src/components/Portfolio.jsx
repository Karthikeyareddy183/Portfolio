/**
 * Portfolio.jsx — the home page (#/). Two columns on desktop: a sticky intro
 * (who, what, section nav, contact) on the left and the scrolling story on
 * the right: About → Experience → Projects → Skills → Education → Contact.
 * Stacks into one column on small screens.
 *
 * Section links scroll with buttons rather than #anchors, because the hash
 * is the app's router. Project cards reuse each system's signature graphic
 * and open its interactive walkthrough.
 */
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Check, Command, Copy, Mail, MapPin } from 'lucide-react';
import { PORTFOLIO } from '../data/portfolio.js';
import { PROFILE } from '../data/profile.js';
import { getProject } from '../data/projects.js';
import { KineticText } from './Home.jsx';
import { Icon, GithubMark, LinkedinMark } from './Icon.jsx';
import { Signature } from './Signature.jsx';

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

/** Which section is in the reading zone (a band near the top of the viewport). */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-30% 0px -60% 0px' },
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/** Cursor-following glow on cards (desktop pointers only, via CSS). */
const spotlight = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

function Section({ id, title, children }) {
  const reduce = useReducedMotion();
  return (
    <motion.section id={id} className="pf-section" aria-labelledby={`${id}-title`}
      initial={reduce ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5, ease: 'easeOut' }}>
      <h2 id={`${id}-title`} className="pf-section-title mono">{title}</h2>
      {children}
    </motion.section>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(PORTFOLIO.email); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    catch { window.location.href = `mailto:${PORTFOLIO.email}`; }
  };
  return (
    <button className="btn" onClick={copy} aria-live="polite">
      {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? 'Copied' : 'Copy email'}
    </button>
  );
}

export function Portfolio({ navigate, openPalette }) {
  const active = useActiveSection(SECTIONS.map((s) => s.id));
  const reduce = useReducedMotion();

  return (
    <div className="pf">
      {/* ── Left: sticky intro ─────────────────────────────────────────── */}
      <header className="pf-intro">
        <div>
          <div className="hero-kicker mono">
            <span className="live-dot" /> {PORTFOLIO.headline} · <MapPin size={12} /> {PROFILE.location}
          </div>
          <KineticText text={PROFILE.name} />
          <p className="pf-focus">{PORTFOLIO.focus}</p>
          <motion.p className="pf-tagline" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
            {PORTFOLIO.tagline}
          </motion.p>

          <nav className="pf-nav" aria-label="Sections">
            {SECTIONS.map((s) => (
              <button key={s.id} className={`pf-nav-item${active === s.id ? ' is-on' : ''}`}
                onClick={() => scrollToSection(s.id)} aria-current={active === s.id ? 'true' : undefined}>
                <span className="pf-nav-line" /> <span className="mono">{s.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="pf-intro-foot">
          <div className="pf-actions">
            <button className="btn is-primary" onClick={() => navigate('systems')}>
              Explore my systems <ArrowRight size={15} />
            </button>
            <a className="btn" href={`mailto:${PORTFOLIO.email}`}><Mail size={15} /> Email me</a>
          </div>
          <div className="pf-socials">
            <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><GithubMark size={19} /></a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><LinkedinMark size={19} /></a>
            <a href={`mailto:${PORTFOLIO.email}`} aria-label="Email"><Mail size={19} /></a>
            <button className="pf-kbd mono muted" onClick={openPalette}><Command size={13} /> <kbd>Ctrl</kbd><kbd>K</kbd></button>
          </div>
        </div>
      </header>

      {/* ── Right: the story ───────────────────────────────────────────── */}
      <div className="pf-main">
        <Section id="about" title="About">
          <div className="pf-prose">
            {PORTFOLIO.about.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
          <div className="pf-stats">
            {PORTFOLIO.stats.map((s) => (
              <div key={s.label} className="pf-stat">
                <span className="metric-value">{s.value}</span>
                <span className="muted">{s.label}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <ol className="pf-list">
            {PORTFOLIO.experience.map((job) => (
              <li key={`${job.company}-${job.role}`} className="pf-item" onPointerMove={spotlight}>
                <span className="pf-period mono muted">{job.period}</span>
                <div>
                  <h3 className="pf-item-title">{job.role} <span className="pf-at">· {job.company}</span></h3>
                  <ul className="pf-points">
                    {job.points.map((pt) => <li key={pt.slice(0, 24)}>{pt}</li>)}
                  </ul>
                  <div className="chips">
                    {job.tags.map((t) => <span key={t} className="chip is-static pf-tag">{t}</span>)}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="projects" title="Projects">
          <div className="pf-projects">
            {PORTFOLIO.projects.map((item) => {
              const system = getProject(item.id);
              return (
                <article key={item.id} className="card pf-project" style={{ '--accent': system.accent }} onPointerMove={spotlight}>
                  <div className="system-sig pf-sig"><Signature project={system} /></div>
                  <div className="pf-project-head">
                    <span className="system-icon"><Icon name={system.icon} size={18} /></span>
                    <h3>{item.name}</h3>
                  </div>
                  <p className="pf-one-liner">{item.oneLiner}</p>
                  <ul className="pf-points">
                    {item.points.map((pt) => <li key={pt.slice(0, 24)}>{pt}</li>)}
                  </ul>
                  <div className="pf-project-foot">
                    <div className="system-metric">
                      <span className="metric-value">{item.metric.value}</span>
                      <span className="muted">{item.metric.label}</span>
                    </div>
                    <div className="chips">
                      {item.tags.map((t) => <span key={t} className="chip is-static pf-tag">{t}</span>)}
                    </div>
                    <div className="pf-project-actions">
                      <button className="btn is-primary" onClick={() => navigate(item.id, 'flow')}>
                        See it run <ArrowRight size={15} />
                      </button>
                      {system.repo ? (
                        <a className="btn" href={system.repo} target="_blank" rel="noreferrer">
                          <GithubMark size={15} /> Code <ArrowUpRight size={13} />
                        </a>
                      ) : (
                        <span className="pf-private mono muted">Runs locally · private config</span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="pf-skills">
            {PORTFOLIO.skills.map((g) => (
              <div key={g.group} className="pf-skill-group">
                <h3 className="pf-skill-title">{g.group}</h3>
                <div className="chips">
                  {g.items.map((s) => <span key={s} className="chip is-static pf-tag">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div className="pf-edu card">
            <span className="eyebrow">Education</span>
            <h3>{PORTFOLIO.education.degree}</h3>
            <p className="muted">{PORTFOLIO.education.school} · {PORTFOLIO.education.period} · {PORTFOLIO.education.note}</p>
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <div className="pf-contact card">
            <h3 className="pf-contact-title">Let&apos;s build voice and agentic AI that holds up in production.</h3>
            <p className="muted">The fastest way to reach me is email. I&apos;m also on LinkedIn and GitHub.</p>
            <div className="pf-actions">
              <a className="btn is-primary" href={`mailto:${PORTFOLIO.email}`}><Mail size={15} /> {PORTFOLIO.email}</a>
              <CopyEmail />
              <a className="btn" href={PROFILE.linkedin} target="_blank" rel="noreferrer"><LinkedinMark size={15} /> LinkedIn</a>
            </div>
          </div>
        </Section>

        <footer className="pf-footer mono muted">
          Built with <span role="img" aria-label="love">❤️</span> by Karthikeya Reddy
        </footer>
      </div>
    </div>
  );
}
