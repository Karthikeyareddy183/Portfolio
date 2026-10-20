import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import App from './App.jsx';
import './styles/global.css';
import './styles/portfolio.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* reducedMotion="user" → Motion honours the OS "reduce motion" setting everywhere */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
);
