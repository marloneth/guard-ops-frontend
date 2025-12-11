import { createRoot } from 'react-dom/client';

import { StrictMode } from 'react';

import { AuthProvider } from '@/contexts/AuthContext.tsx';

import App from './App.tsx';
import './index.css';
import { Providers } from './provider';
import './styles/tailwind.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Providers>
  </StrictMode>
);
