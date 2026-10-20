/**
 * OverviewView.jsx — project summary: signature motion graphic, key metrics,
 * engineering highlights, stack, and shortcuts into the deeper tabs.
 */
import { motion } from 'motion/react';
import { ArrowRight, Network, Waypoints } from 'lucide-react';

const rise = (i) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.05 * i, duration: 0.35, ease: 'easeOut' },
});

export function OverviewView({ project, onTab }) {
  return (
    <div className="overview">
      <section className="metrics" aria-label="Key results">
        {project.metrics.map((m, i) => (
          <motion.div key={m.label} className="card metric" {...rise(i)}>
            <span className="metric-value">{m.value}</span>
            <span className="metric-label">{m.label}</span>
            <span className="metric-note mono muted">{m.note}</span>
          </motion.div>
        ))}
      </section>

      <div className="overview-grid">
        <motion.section className="card" {...rise(4)}>
          <span className="eyebrow">What it is</span>
          <p className="lead">{project.summary}</p>
          <div className="chips stack">
            {project.stack.map((s) => <span key={s} className="chip is-static">{s}</span>)}
          </div>
          <div className="cta-row">
            <button className="btn is-primary" onClick={() => onTab('flow')}>
              <Waypoints size={16} /> Play the data flow <ArrowRight size={14} />
            </button>
            <button className="btn" onClick={() => onTab('architecture')}>
              <Network size={16} /> Explore architecture
            </button>
          </div>
        </motion.section>

        <motion.section className="card" {...rise(5)}>
          <span className="eyebrow">Engineering highlights</span>
          <ul className="highlights">
            {project.highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </motion.section>
      </div>
    </div>
  );
}
