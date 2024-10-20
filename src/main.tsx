import './buffer';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './mockEnv';

import Providers from '@/components/providers';
import AppRouters from '@/components/providers/AppRouters';
import SplashScreen from '@/components/SplashScreen';
import { Toaster } from '@/components/ui/toaster';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<SplashScreen minDisplayTime={0} />}>
      <Providers>
        <AppRouters />
        <Toaster />
      </Providers>
    </Suspense>
  </React.StrictMode>,
);
