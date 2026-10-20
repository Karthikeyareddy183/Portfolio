/**
 * ArchitectureView.jsx — the full system graph plus a component inspector.
 * Clicking (or pressing Enter on) a node shows what it does, which source
 * file implements it, and what it connects to.
 */
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ExternalLink, FileCode } from 'lucide-react';
import { SystemDiagram } from './SystemDiagram.jsx';
import { Icon } from './Icon.jsx';

export function ArchitectureView({ project, compact }) {
  const { diagram } = project;
  const [selected, setSelected] = useState(diagram.nodes[0].id);
  const node = diagram.nodes.find((n) => n.id === selected);
  const byId = (id) => diagram.nodes.find((n) => n.id === id);
  const inbound = diagram.edges.filter((e) => e.to === selected).map((e) => byId(e.from));
  const outbound = diagram.edges.filter((e) => e.from === selected).map((e) => byId(e.to));

  const fileUrl = node.file && project.repo && `${project.repo}/${node.file.endsWith('/') ? 'tree' : 'blob'}/main/${node.file}`;

  return (
    <div className="arch-grid">
      <div className="card diagram-card">
        <div className="diagram-hint mono muted">Select any component to inspect it</div>
        <SystemDiagram diagram={diagram} accent={project.accent} mode="architecture"
          compact={compact} selected={selected} onSelect={setSelected} />
      </div>

      <aside className="card inspector" aria-live="polite">
        <span className="eyebrow">Component inspector</span>
        <AnimatePresence mode="wait">
          <motion.div key={selected} className="inspector-body" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
            <div className="inspector-head">
              <span className="inspector-icon"><Icon name={node.icon} size={20} /></span>
              <div>
                <h3>{node.label}</h3>
                <span className="mono muted">{node.sub}</span>
              </div>
            </div>
            <p className="inspector-detail">{node.detail}</p>
            {fileUrl ? (
              <a className="file-chip" href={fileUrl} target="_blank" rel="noreferrer">
                <FileCode size={14} /> <span className="mono">{node.file}</span> <ExternalLink size={12} />
              </a>
            ) : node.file && (
              <span className="file-chip"><FileCode size={14} /> <span className="mono">{node.file}</span></span>
            )}
            <div className="inspector-conns">
            {inbound.length > 0 && (
              <div className="conn">
                <span className="conn-label"><ArrowRight size={13} /> Receives from</span>
                <div className="chips">
                  {inbound.map((n) => <button key={n.id} className="chip" onClick={() => setSelected(n.id)}>{n.label}</button>)}
                </div>
              </div>
            )}
            {outbound.length > 0 && (
              <div className="conn">
                <span className="conn-label"><ArrowLeft size={13} /> Sends to</span>
                <div className="chips">
                  {outbound.map((n) => <button key={n.id} className="chip" onClick={() => setSelected(n.id)}>{n.label}</button>)}
                </div>
              </div>
            )}
            </div>
          </motion.div>
        </AnimatePresence>
      </aside>
    </div>
  );
}
