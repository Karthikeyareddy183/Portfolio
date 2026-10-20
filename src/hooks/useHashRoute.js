/**
 * useHashRoute — tiny hash router.
 *
 * Hash routing means every view has a shareable deep link that works on any
 * static host (GitHub Pages, Vercel, Netlify) without server rewrites:
 *   #/                         → portfolio
 *   #/systems                  → systems hub
 *   #/voice-agent              → project overview
 *   #/doc-agent/flow           → project tab
 */
import { useCallback, useEffect, useState } from 'react';

function parse(hash) {
  const [project = null, tab = 'overview'] = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  return { project, tab };
}

export function useHashRoute() {
  const [route, setRoute] = useState(() => parse(window.location.hash));

  useEffect(() => {
    const onChange = () => setRoute(parse(window.location.hash));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = useCallback((project, tab) => {
    const next = project ? `#/${project}${tab && tab !== 'overview' ? `/${tab}` : ''}` : '#/';
    if (window.location.hash !== next) window.location.hash = next;
  }, []);

  return [route, navigate];
}
