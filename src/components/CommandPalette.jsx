/**
 * CommandPalette.jsx — Ctrl/⌘+K launcher. Fuzzy-ish search over every
 * system, every view of every system, and external links. Fully keyboard
 * driven: ↑/↓ to move, Enter to open, Esc to close.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CornerDownLeft, ExternalLink, House, Search, UserRound } from 'lucide-react';
import { PROJECTS, TABS } from '../data/projects.js';
import { PROFILE } from '../data/profile.js';
import { Icon, GithubMark, LinkedinMark } from './Icon.jsx';

function buildCommands(navigate) {
  const cmds = [
    { id: 'portfolio', group: 'Go to', label: 'Portfolio', hint: 'Home', keywords: 'about experience resume contact skills',
      icon: <UserRound size={16} />, run: () => navigate(null) },
    { id: 'systems', group: 'Go to', label: 'All systems', hint: 'Overview', icon: <House size={16} />, run: () => navigate('systems') },
  ];
  for (const p of PROJECTS) {
    for (const t of TABS) {
      cmds.push({
        id: `${p.id}-${t.id}`,
        group: `${p.index} · ${p.title}`,
        label: t.id === 'overview' ? p.title : `${p.short} — ${t.label}`,
        hint: t.label,
        keywords: `${p.stack.join(' ')} ${p.tagline}`,
        icon: <Icon name={t.id === 'overview' ? p.icon : t.icon} size={16} style={{ color: p.accent }} />,
        run: () => navigate(p.id, t.id),
      });
    }
  }
  for (const p of PROJECTS.filter((x) => x.repo)) {
    cmds.push({ id: `${p.id}-repo`, group: 'Links', label: `${p.short} repository`, hint: 'GitHub',
      icon: <GithubMark size={15} />, run: () => window.open(p.repo, '_blank', 'noopener') });
  }
  cmds.push(
    { id: 'gh', group: 'Links', label: 'GitHub profile', hint: 'External', icon: <GithubMark size={15} />, run: () => window.open(PROFILE.github, '_blank', 'noopener') },
    { id: 'li', group: 'Links', label: 'LinkedIn profile', hint: 'External', icon: <LinkedinMark size={15} />, run: () => window.open(PROFILE.linkedin, '_blank', 'noopener') },
  );
  return cmds;
}

/** Every query word must appear somewhere in label/group/keywords. */
const matches = (c, q) => {
  const hay = `${c.label} ${c.group} ${c.hint} ${c.keywords ?? ''}`.toLowerCase();
  return q.toLowerCase().split(/\s+/).filter(Boolean).every((w) => hay.includes(w));
};

export function CommandPalette({ open, onClose, navigate }) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const all = useMemo(() => buildCommands(navigate), [navigate]);
  const results = useMemo(() => all.filter((c) => matches(c, q)), [all, q]);

  useEffect(() => {
    if (open) { setQ(''); setActive(0); setTimeout(() => inputRef.current?.focus(), 10); }
  }, [open]);
  useEffect(() => setActive(0), [q]);
  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const run = (c) => { onClose(); c.run(); };
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(results.length - 1, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === 'Enter' && results[active]) { e.preventDefault(); run(results[active]); }
    else if (e.key === 'Escape') onClose();
  };

  let lastGroup = null;
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="palette-backdrop" onMouseDown={onClose}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
          <motion.div className="palette" role="dialog" aria-modal="true" aria-label="Command palette"
            onMouseDown={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: -12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }} transition={{ duration: 0.18, ease: 'easeOut' }}>
            <div className="palette-input">
              <Search size={17} className="muted" />
              <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKey}
                placeholder="Search systems, views, tech… (try “pgvector” or “flow”)"
                aria-label="Search commands" aria-controls="palette-list"
                aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined} />
              <kbd>Esc</kbd>
            </div>
            <ul className="palette-list" id="palette-list" role="listbox" ref={listRef}>
              {results.length === 0 && <li className="palette-empty muted">No matches for “{q}”</li>}
              {results.map((c, i) => {
                const header = c.group !== lastGroup ? c.group : null;
                lastGroup = c.group;
                return (
                  <li key={c.id} role="presentation">
                    {header && <div className="palette-group mono">{header}</div>}
                    <div id={`cmd-${c.id}`} role="option" aria-selected={i === active} data-active={i === active}
                      className={`palette-item${i === active ? ' is-on' : ''}`}
                      onMouseMove={() => setActive(i)} onClick={() => run(c)}>
                      <span className="palette-icon">{c.icon}</span>
                      <span className="palette-label">{c.label}</span>
                      <span className="palette-hint muted">
                        {c.group === 'Links' ? <ExternalLink size={13} /> : c.hint}
                      </span>
                      {i === active && <CornerDownLeft size={14} className="muted" />}
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="palette-foot mono muted">
              <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
              <span><kbd>Enter</kbd> open</span>
              <span><kbd>1</kbd>–<kbd>{PROJECTS.length}</kbd> systems · <kbd>0</kbd> portfolio</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
