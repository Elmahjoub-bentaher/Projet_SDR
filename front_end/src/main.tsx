
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Redirect root to home page
if (window.location.pathname === '/') {
  window.location.pathname = '/home';
}

createRoot(document.getElementById("root")!).render(<App />);
