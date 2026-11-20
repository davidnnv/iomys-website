import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SiteProvider } from './SiteContext';
import App from './App';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SiteProvider>
      <App />
    </SiteProvider>
  </StrictMode>
);
