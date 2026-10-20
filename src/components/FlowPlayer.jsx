/**
 * FlowPlayer.jsx — step-through player for a project's data flows.
 *
 * Drives SystemDiagram in "flow" mode. Autoplays (unless the user prefers
 * reduced motion), can be paused, scrubbed via the timeline, or stepped with
 * ← / → and Space.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Pause, Play, RotateCcw, SkipBack, SkipForward } from 'lucide-react';
import { SystemDiagram } from './SystemDiagram.jsx';

const STEP_MS = 3400;

export function FlowPlayer({ project, compact }) {
  const reduce = useReducedMotion();
  const [flowIdx, setFlowIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(!reduce);

  const flow = project.flows[flowIdx];
  const steps = flow.steps;
  const current = steps[step];
  const last = steps.length - 1;

  // Every node touched so far stays lit, giving a visible "trail".
  const visited = useMemo(() => new Set(steps.slice(0, step + 1).map((s) => s.node)), [steps, step]);

  const go = useCallback((i) => setStep(Math.max(0, Math.min(last, i))), [last]);

  // Autoplay: advance every STEP_MS, then pause briefly and loop.
  useEffect(() => {
    if (!playing) return undefined;
    const t = setTimeout(() => setStep((s) => (s >= last ? 0 : s + 1)), step >= last ? STEP_MS * 1.5 : STEP_MS);
    return () => clearTimeout(t);
  }, [playing, step, last]);

  // Keyboard controls (ignored while typing in an input, e.g. the palette).
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.('input, textarea, [role="dialog"]')) return;
      if (e.key === 'ArrowRight') { setPlaying(false); go(step + 1); }
      else if (e.key === 'ArrowLeft') { setPlaying(false); go(step - 1); }
      else if (e.key === ' ' && !e.target.closest?.('button')) { e.preventDefault(); setPlaying((p) => !p); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, step]);

  const switchFlow = (i) => { setFlowIdx(i); setStep(0); setPlaying(!reduce); };

  return (
    <div className="flow">
      <div className="flow-head">
        {project.flows.length > 1 && (
          <div className="segmented" role="tablist" aria-label="Choose a flow">
            {project.flows.map((f, i) => (
              <button key={f.id} role="tab" aria-selected={i === flowIdx}
                className={i === flowIdx ? 'is-on' : ''} onClick={() => switchFlow(i)}>
                {i === flowIdx && <motion.span layoutId={`${project.id}-flowpill`} className="segmented-pill" />}
                <span>{f.name}</span>
              </button>
            ))}
          </div>
        )}
        <p className="muted">{flow.description}</p>
      </div>

      <div className="card diagram-card">
        <SystemDiagram diagram={project.diagram} accent={project.accent} mode="flow"
          compact={compact} activeStep={current} visited={visited} />

        {/* Caption bar: step, title and transport controls stay attached to the diagram */}
        <div className="flow-bar">
          <div className="flow-bar-text" aria-live="polite">
            <span className="mono step-meta">STEP {String(step + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}</span>
            <AnimatePresence mode="wait">
              <motion.strong key={`${flow.id}-${step}`} className="flow-bar-title"
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}>
                {current.title}
              </motion.strong>
            </AnimatePresence>
          </div>
          <div className="controls">
            <button className="icon-btn" onClick={() => { go(0); setPlaying(false); }} aria-label="Restart flow"><RotateCcw size={16} /></button>
            <button className="icon-btn" onClick={() => { setPlaying(false); go(step - 1); }} disabled={step === 0} aria-label="Previous step"><SkipBack size={16} /></button>
            <button className="icon-btn is-primary" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause' : 'Play'}>
              {playing ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button className="icon-btn" onClick={() => { setPlaying(false); go(step + 1); }} disabled={step === last} aria-label="Next step"><SkipForward size={16} /></button>
          </div>

          {/* Timeline: one segment per step, current segment fills while playing */}
          <div className="timeline" role="tablist" aria-label="Flow steps">
            {steps.map((s, i) => (
              <button key={s.title} role="tab" aria-selected={i === step} aria-label={`Step ${i + 1}: ${s.title}`}
                className={`tl-seg${i < step ? ' is-done' : ''}${i === step ? ' is-now' : ''}`}
                onClick={() => { setPlaying(false); go(i); }}>
                {i === step && (
                  <motion.span key={`${flow.id}-${step}-${playing}`} className="tl-fill"
                    initial={{ scaleX: playing ? 0 : 1 }} animate={{ scaleX: 1 }}
                    transition={{ duration: playing ? STEP_MS / 1000 : 0, ease: 'linear' }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* What is happening + the actual data at this stage */}
      <AnimatePresence mode="wait">
        <motion.div key={`${flow.id}-${step}`} className="card step-card"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}>
          <div>
            <span className="eyebrow">What happens</span>
            <p className="step-detail">{current.detail}</p>
            <span className="kbd-hint muted"><kbd>←</kbd><kbd>→</kbd> step · <kbd>Space</kbd> play / pause</span>
          </div>
          <div>
            <span className="eyebrow">Data at this stage</span>
            <pre className="payload"><code>{current.payload}</code></pre>
          </div>
        </motion.div>
      </AnimatePresence>

      <ol className="step-list">
        {steps.map((s, i) => (
          <li key={s.title}>
            <button className={`step-item${i === step ? ' is-now' : ''}${i < step ? ' is-done' : ''}`}
              onClick={() => { setPlaying(false); go(i); }}>
              <span className="mono step-num">{String(i + 1).padStart(2, '0')}</span>
              <span>{s.title}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
