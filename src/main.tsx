import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('main.tsx is executing');

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  console.log('main.tsx finished rendering');
} catch (error) {
  console.error('Fatal error during React mounting:', error);
  document.body.innerHTML = `<div style="padding: 20px; color: red; font-family: sans-serif;">
    <h1>Error de Carga</h1>
    <p>La aplicación no pudo iniciarse. Por favor, revisa la consola del navegador para más detalles.</p>
    <pre>${error instanceof Error ? error.message : String(error)}</pre>
  </div>`;
}
