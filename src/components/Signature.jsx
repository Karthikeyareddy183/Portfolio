/**
 * Signature.jsx — a small looping motion graphic that captures each project
 * at a glance. Used on hub cards and project overview headers.
 *   voice-agent → live audio waveform (TurnLab)
 *   doc-agent   → page being scanned, chunks peeling off into vectors (DocMind)
 *   bert-ner    → tokens being tagged with entity labels
 *   openclaw    → orchestrator hub dispatching tasks to its agents
 */
import { motion, useReducedMotion } from 'motion/react';

function Waveform({ accent, reduce }) {
  const bars = Array.from({ length: 28 }, (_, i) => i);
  return (
    <div className="sig sig-wave" aria-hidden="true">
      {bars.map((i) => {
        const base = 0.25 + 0.75 * Math.abs(Math.sin(i * 0.55));
        return (
          <motion.span key={i} style={{ background: accent }}
            initial={{ scaleY: base }}
            animate={reduce ? { scaleY: base } : { scaleY: [base, 0.15 + 0.85 * ((Math.sin(i * 1.7) + 1) / 2), base] }}
            transition={{ duration: 0.9 + (i % 5) * 0.12, repeat: Infinity, ease: 'easeInOut', delay: i * 0.03 }} />
        );
      })}
    </div>
  );
}

function DocScan({ accent, reduce }) {
  return (
    <div className="sig sig-doc" aria-hidden="true">
      <div className="sig-page">
        {[90, 70, 84, 60, 0, 76, 88, 52].map((w, i) =>
          w ? <span key={i} className="sig-line" style={{ width: `${w}%` }} /> : <span key={i} className="sig-table" />,
        )}
        {!reduce && (
          <motion.span className="sig-scan" style={{ background: accent }}
            animate={{ top: ['6%', '90%', '6%'] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} />
        )}
      </div>
      <div className="sig-vectors">
        {[0, 1, 2, 3].map((i) => (
          <motion.span key={i} style={{ borderColor: accent }}
            initial={{ opacity: 0.3, x: -10 }}
            animate={reduce ? { opacity: 1, x: 0 } : { opacity: [0, 1, 1, 0], x: [-16, 0, 0, 8] }}
            transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.45, times: [0, 0.2, 0.8, 1] }}>
            [{(0.12 * (i + 1)).toFixed(2)}, −0.{4 + i}1, …]
          </motion.span>
        ))}
      </div>
    </div>
  );
}

const TYPE_COLOR = { PER: '#60A5FA', ORG: '#F59E0B', LOC: '#34D399', MISC: '#F87171' };

function EntityTagger({ sample, reduce }) {
  // Split the sample text into plain words and entity spans.
  const parts = [];
  let rest = sample.text;
  for (const ent of sample.entities) {
    const at = rest.indexOf(ent.word);
    if (at > 0) parts.push({ text: rest.slice(0, at) });
    parts.push({ text: ent.word, ent });
    rest = rest.slice(at + ent.word.length);
  }
  if (rest) parts.push({ text: rest });

  let entIdx = 0;
  return (
    <div className="sig sig-ner" aria-label={`Example: ${sample.text}`}>
      <p>
        {parts.map((p, i) => {
          if (!p.ent) return <span key={i}>{p.text}</span>;
          const k = entIdx++;
          const c = TYPE_COLOR[p.ent.type];
          return (
            <motion.mark key={i} style={{ '--c': c }}
              initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
              animate={reduce ? { backgroundColor: `${c}33` } : { backgroundColor: ['rgba(0,0,0,0)', `${c}33`, `${c}33`, 'rgba(0,0,0,0)'] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.4 + k * 0.5, times: [0, 0.15, 0.8, 1] }}>
              {p.text}
              <motion.sup
                initial={{ opacity: reduce ? 1 : 0, y: 4 }}
                animate={reduce ? { opacity: 1, y: 0 } : { opacity: [0, 1, 1, 0], y: [4, 0, 0, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.4 + k * 0.5, times: [0, 0.15, 0.8, 1] }}>
                {p.ent.type} {p.ent.score.toFixed(3)}
              </motion.sup>
            </motion.mark>
          );
        })}
      </p>
    </div>
  );
}

/** Hub-and-spoke: the orchestrator sends a pulse to one agent at a time. */
function AgentHub({ accent, reduce }) {
  // Solid spokes are main's delegates (allowAgents); dashed ones have their own entry point.
  const spokes = [
    { label: 'job', x: 52, y: 22, delegate: true },
    { label: 'daily', x: 248, y: 22, delegate: true },
    { label: 'science', x: 40, y: 60, delegate: true },
    { label: 'fun', x: 52, y: 98 },
    { label: 'promo', x: 248, y: 98 },
  ];
  const hub = { x: 150, y: 60 };
  const repeatDelay = (spokes.length - 1) * 1.6; // one pulse at a time, round-robin
  return (
    <svg className="sig sig-hub" viewBox="0 0 300 120" aria-hidden="true">
      {spokes.map((s, i) => (
        <g key={s.label}>
          <line x1={hub.x} y1={hub.y} x2={s.x} y2={s.y} stroke="var(--edge)" strokeWidth="1.2"
            strokeDasharray={s.delegate ? undefined : '4 4'} />
          {!reduce && (
            <motion.circle r="3.5" fill={accent}
              initial={{ cx: hub.x, cy: hub.y, opacity: 0 }}
              animate={{ cx: [hub.x, s.x, hub.x], cy: [hub.y, s.y, hub.y], opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay, delay: i * 1.6, ease: 'easeInOut' }} />
          )}
          <rect x={s.x - 26} y={s.y - 11} width="52" height="22" rx="7" fill="var(--surface-2)" stroke="var(--line-strong)" />
          <text x={s.x} y={s.y + 4} textAnchor="middle" className="sig-hub-label">{s.label}</text>
        </g>
      ))}
      {!reduce && (
        <motion.circle cx={hub.x} cy={hub.y} fill="none" stroke={accent} strokeWidth="1.5"
          initial={{ r: 22, opacity: 0.8 }} animate={{ r: 38, opacity: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }} />
      )}
      <circle cx={hub.x} cy={hub.y} r="22" fill="var(--surface)" />
      <circle cx={hub.x} cy={hub.y} r="22" fill={accent} fillOpacity="0.16" stroke={accent} />
      <text x={hub.x} y={hub.y + 4} textAnchor="middle" className="sig-hub-label is-hub" fill={accent}>main</text>
    </svg>
  );
}

export function Signature({ project }) {
  const reduce = useReducedMotion();
  if (project.id === 'voice-agent') return <Waveform accent={project.accent} reduce={reduce} />;
  if (project.id === 'doc-agent') return <DocScan accent={project.accent} reduce={reduce} />;
  if (project.id === 'openclaw-agents') return <AgentHub accent={project.accent} reduce={reduce} />;
  return <EntityTagger sample={project.sample} reduce={reduce} />;
}
