/**
 * SystemDiagram.jsx — the animated architecture / data-flow canvas.
 *
 * One SVG renders a project's graph in two modes:
 *   - "architecture": every edge carries faint ambient packets; click a node
 *     to inspect it.
 *   - "flow": the active step's node glows, its edges carry bright packets in
 *     sequence, visited nodes stay lit and everything else dims.
 *
 * Desktop uses the hand-placed coordinates from projects.js; small screens
 * switch to a 2-column snake layout (`m: [col, row]`) so labels stay legible
 * without horizontal scrolling.
 */
import { useEffect, useId, useMemo, useRef } from 'react';
import { animate, motion, useReducedMotion } from 'motion/react';
import { Icon } from './Icon.jsx';

const NODE_W = 168;
const NODE_H = 68;
const HW = NODE_W / 2;
const HH = NODE_H / 2;

/* ── Layout ─────────────────────────────────────────────────────────── */

const MOBILE = { width: 440, colX: [120, 320], top: 70, rowGap: 120 };

function computeLayout(diagram, compact) {
  if (!compact) {
    const [width, height] = diagram.size;
    const pos = Object.fromEntries(diagram.nodes.map((n) => [n.id, { x: n.x, y: n.y }]));
    return { width, height, pos, groups: diagram.groups ?? [] };
  }
  const pos = {};
  let maxRow = 0;
  for (const n of diagram.nodes) {
    const [col, row] = n.m;
    pos[n.id] = { x: MOBILE.colX[col], y: MOBILE.top + row * MOBILE.rowGap };
    maxRow = Math.max(maxRow, row);
  }
  return {
    width: MOBILE.width,
    height: MOBILE.top * 2 + maxRow * MOBILE.rowGap,
    pos,
    groups: [], // group frames only make sense in the hand-placed layout
  };
}

/** Cubic bezier between two node boxes. Returns path + midpoint (for labels). */
function edgeGeometry(a, b, bend) {
  let p0, p1, p2, p3;
  const dx = b.x - a.x;
  const dy = b.y - a.y;

  if (bend && Math.abs(dx) < HW) {
    // Same column: loop out of the side facing the canvas edge.
    const s = a.x < 220 ? -1 : 1;
    const c = Math.min(Math.abs(bend), 28) * 1.4 * s;
    p0 = [a.x + s * HW, a.y]; p3 = [b.x + s * HW, b.y];
    p1 = [p0[0] + c, p0[1]]; p2 = [p3[0] + c, p3[1]];
  } else if (bend) {
    // Return edge: U-shape under (bend > 0) or over (bend < 0) the row.
    const s = Math.sign(bend);
    const c = Math.abs(bend) * 1.4 * s;
    p0 = [a.x, a.y + s * HH]; p3 = [b.x, b.y + s * HH];
    p1 = [p0[0], p0[1] + c]; p2 = [p3[0], p3[1] + c];
  } else if (Math.abs(dx) > NODE_W * 0.9) {
    // Horizontal S-curve, side to side.
    const sx = Math.sign(dx);
    p0 = [a.x + sx * HW, a.y]; p3 = [b.x - sx * HW, b.y];
    const mid = (p0[0] + p3[0]) / 2;
    p1 = [mid, p0[1]]; p2 = [mid, p3[1]];
  } else {
    // Vertical S-curve, top/bottom.
    const sy = Math.sign(dy) || 1;
    p0 = [a.x, a.y + sy * HH]; p3 = [b.x, b.y - sy * HH];
    const mid = (p0[1] + p3[1]) / 2;
    p1 = [p0[0], mid]; p2 = [p3[0], mid];
  }

  const d = `M${p0[0]},${p0[1]} C${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p3[0]},${p3[1]}`;
  const mid = [
    (p0[0] + 3 * p1[0] + 3 * p2[0] + p3[0]) / 8,
    (p0[1] + 3 * p1[1] + 3 * p2[1] + p3[1]) / 8,
  ];
  return { d, mid, p0, p3 };
}

/* ── Packets ────────────────────────────────────────────────────────── */

/** Cheap, declarative ambient packet (SMIL) for architecture mode. */
function AmbientPacket({ d, color, delay }) {
  return (
    <circle r="2.6" fill={color} opacity="0.75">
      <animateMotion dur="3.2s" begin={`-${delay}s`} repeatCount="indefinite" path={d} />
    </circle>
  );
}

/**
 * Flow packet driven by Motion: always starts at the beginning of its path,
 * so multi-edge steps play in order (edge 1, then edge 2, …) and loop in sync.
 */
function FlowPacket({ d, color, index, count }) {
  const pathRef = useRef(null);
  const dotRef = useRef(null);
  const haloRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    const len = path.getTotalLength();
    const D = 0.95;
    const controls = animate(0, 1, {
      duration: D,
      delay: index * D,
      repeat: Infinity,
      repeatDelay: (count - 1) * D + 0.45,
      ease: [0.45, 0, 0.25, 1],
      onUpdate: (v) => {
        const pt = path.getPointAtLength(v * len);
        for (const el of [dotRef.current, haloRef.current]) {
          el?.setAttribute('cx', pt.x);
          el?.setAttribute('cy', pt.y);
        }
      },
    });
    return () => controls.stop();
  }, [d, index, count]);

  const start = d.match(/M([\d.-]+),([\d.-]+)/);
  return (
    <g pointerEvents="none">
      <path ref={pathRef} d={d} fill="none" stroke="none" />
      <circle ref={haloRef} cx={start[1]} cy={start[2]} r="11" fill={color} opacity="0.18" />
      <circle ref={dotRef} cx={start[1]} cy={start[2]} r="5" fill={color} />
    </g>
  );
}

/* ── Component ──────────────────────────────────────────────────────── */

export function SystemDiagram({
  diagram,
  accent,
  mode = 'architecture',
  compact = false,
  activeStep = null,
  visited = new Set(),
  selected = null,
  onSelect,
}) {
  const uid = useId().replace(/:/g, '');
  const reduce = useReducedMotion();
  const layout = useMemo(() => computeLayout(diagram, compact), [diagram, compact]);

  const edges = useMemo(
    () =>
      diagram.edges.map((e) => ({
        ...e,
        id: `${e.from}>${e.to}`,
        ...edgeGeometry(layout.pos[e.from], layout.pos[e.to], e.bend),
      })),
    [diagram.edges, layout],
  );

  const isFlow = mode === 'flow' && activeStep;
  const activeEdges = isFlow ? activeStep.edges : [];
  const connected = selected
    ? new Set(edges.filter((e) => e.from === selected || e.to === selected).map((e) => e.id))
    : null;

  return (
    <svg
      className="diagram"
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      role="img"
      aria-label={`${mode === 'flow' ? 'Data flow' : 'Architecture'} diagram`}
      style={{ '--accent': accent }}
    >
      <defs>
        <pattern id={`${uid}-grid`} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="var(--grid-dot)" />
        </pattern>
        {['base', 'hot'].map((k) => (
          <marker key={k} id={`${uid}-arrow-${k}`} viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={k === 'hot' ? accent : 'var(--edge)'} />
          </marker>
        ))}
        <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      <rect width="100%" height="100%" fill={`url(#${uid}-grid)`} />

      {/* Group frames (e.g. "AgentSession pipeline", "CrewAI crew") */}
      {layout.groups.map((g, i) => (
        <motion.g key={g.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}>
          <rect x={g.x} y={g.y} width={g.w} height={g.h} rx="16" className="diagram-group" />
          <text x={g.x + 14} y={g.y + 20} className="diagram-group-label">{g.label}</text>
        </motion.g>
      ))}

      {/* Edges */}
      {edges.map((e, i) => {
        const hot = activeEdges.includes(e.id) || (!isFlow && connected?.has(e.id));
        const dim = isFlow && !hot;
        // Skip labels on very short edges where they would collide with nodes.
        const showLabel = e.label && Math.hypot(e.p3[0] - e.p0[0], e.p3[1] - e.p0[1]) > 70;
        return (
          <g key={e.id} className={`edge${hot ? ' is-hot' : ''}${dim ? ' is-dim' : ''}`}>
            <motion.path
              d={e.d}
              className={`edge-line${e.dashed ? ' is-dashed' : ''}`}
              markerEnd={`url(#${uid}-arrow-${hot ? 'hot' : 'base'})`}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.05, ease: 'easeOut' }}
            />
            {showLabel && (
              <text x={e.mid[0]} y={e.mid[1] - 7} className="edge-label" textAnchor="middle">
                {e.label}
              </text>
            )}
            {mode === 'architecture' && !reduce && !dim && (
              <AmbientPacket d={e.d} color={accent} delay={(i * 0.37) % 3.2} />
            )}
          </g>
        );
      })}

      {/* Bright packets for the active flow step, played in edge order */}
      {isFlow && !reduce &&
        activeEdges.map((id, i) => {
          const e = edges.find((x) => x.id === id);
          return e ? (
            <FlowPacket key={`${activeStep.title}-${id}`} d={e.d} color={accent} index={i} count={activeEdges.length} />
          ) : null;
        })}

      {/* Nodes */}
      {diagram.nodes.map((n, i) => {
        const p = layout.pos[n.id];
        const active = isFlow && activeStep.node === n.id;
        const wasVisited = isFlow && visited.has(n.id);
        const isSelected = !isFlow && selected === n.id;
        const dim = isFlow && !active && !wasVisited;

        return (
          <motion.g
            key={n.id}
            className={`node${active ? ' is-active' : ''}${wasVisited ? ' is-visited' : ''}${isSelected ? ' is-selected' : ''}${dim ? ' is-dim' : ''}`}
            initial={reduce ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.045, type: 'spring', stiffness: 260, damping: 22 }}
            style={{ x: p.x, y: p.y }}
            role={onSelect ? 'button' : undefined}
            tabIndex={onSelect ? 0 : undefined}
            aria-label={onSelect ? `${n.label}: ${n.sub}` : undefined}
            aria-pressed={onSelect ? isSelected : undefined}
            onClick={onSelect ? () => onSelect(n.id) : undefined}
            onKeyDown={
              onSelect
                ? (ev) => {
                    if (ev.key === 'Enter' || ev.key === ' ') {
                      ev.preventDefault();
                      onSelect(n.id);
                    }
                  }
                : undefined
            }
          >
            <g className="node-inner">
            {(active || isSelected) && (
              <rect x={-HW - 6} y={-HH - 6} width={NODE_W + 12} height={NODE_H + 12} rx="18"
                fill={accent} opacity="0.35" filter={`url(#${uid}-glow)`} />
            )}
            {active && !reduce && (
              <motion.rect
                x={-HW} y={-HH} width={NODE_W} height={NODE_H} rx="14"
                fill="none" stroke={accent} strokeWidth="2"
                initial={{ opacity: 0.9, scale: 1 }}
                animate={{ opacity: 0, scale: 1.18 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
            <rect x={-HW} y={-HH} width={NODE_W} height={NODE_H} rx="14" className="node-box" />
            <rect x={-HW + 12} y={-15} width="30" height="30" rx="9" className="node-icon-bg" />
            <Icon name={n.icon} size={16} x={-HW + 19} y={-8} className="node-icon" />
            <text x={-HW + 52} y={-3} className="node-label">{n.label}</text>
            <text x={-HW + 52} y={14} className="node-sub">{n.sub}</text>
            </g>
          </motion.g>
        );
      })}
    </svg>
  );
}
