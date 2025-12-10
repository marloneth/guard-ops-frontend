import { createRoot } from 'react-dom/client';

import { StrictMode } from 'react';

import { AuthProvider } from '@/contexts/AuthContext';

import App from './App.tsx';
import { Providers } from './app/provider';
import './app/styles/tailwind.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Providers>
  </StrictMode>
);
