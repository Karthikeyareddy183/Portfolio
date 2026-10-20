/**
 * CodeView.jsx — the key source excerpts for a project, with a lightweight
 * Python syntax highlighter (no external dependency).
 */
import { ExternalLink } from 'lucide-react';
import { GithubMark } from './Icon.jsx';

const PY_TOKENS =
  /(#.*$)|("""[\s\S]*?"""|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|\b(def|class|return|if|elif|else|for|in|not|and|or|await|async|import|from|as|with|None|True|False|self)\b|(@\w+(?:\.\w+)*)|\b(\d+(?:\.\d+)?)\b/gm;

/** Split a snippet into highlighted spans. */
function highlight(src) {
  const out = [];
  let last = 0;
  for (const m of src.matchAll(PY_TOKENS)) {
    if (m.index > last) out.push(src.slice(last, m.index));
    const cls = m[1] ? 'tk-com' : m[2] ? 'tk-str' : m[3] ? 'tk-kw' : m[4] ? 'tk-dec' : 'tk-num';
    out.push(<span key={m.index} className={cls}>{m[0]}</span>);
    last = m.index + m[0].length;
  }
  out.push(src.slice(last));
  return out;
}

export function CodeView({ project }) {
  return (
    <div className="code-view">
      {project.code.map((c) => (
        <figure key={c.caption} className="card code-card">
          <figcaption>
            <span className="mono file-name">{c.file}</span>
            <span className="muted">{c.caption}</span>
          </figcaption>
          <pre className="code"><code>{highlight(c.snippet)}</code></pre>
        </figure>
      ))}
      {project.repo && (
        <a className="btn repo-btn" href={project.repo} target="_blank" rel="noreferrer">
          <GithubMark size={16} /> Browse the full repository <ExternalLink size={14} />
        </a>
      )}
    </div>
  );
}
