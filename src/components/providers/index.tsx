import AuthProvider from '@/components/providers/AuthProvider';
import GameProvider from '@/components/providers/GameProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SDKProvider } from '@telegram-apps/sdk-react';
import { PropsWithChildren, useEffect, useMemo } from 'react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { postEvent } from '@telegram-apps/sdk';
import TagManager from 'react-gtm-module';

postEvent('web_app_setup_swipe_behavior', { allow_vertical_swipe: false });
// postEvent('web_', { allow_vertical_swipe: false });

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

const Providers = ({ children }: PropsWithChildren) => {
  const manifestUrl = useMemo(() => {
    return new URL('tonconnect-manifest.json', window.location.href).toString();
  }, []);

  useEffect(() => {
    const tagManagerArgs = {
        gtmId: 'GTM-MMGWSQFF'
    };
    TagManager.initialize(tagManagerArgs);
}, []);

  return (
    <SDKProvider acceptCustomStyles debug>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <GameProvider>{children}</GameProvider>
          </AuthProvider>
        </QueryClientProvider>
      </TonConnectUIProvider>
    </SDKProvider>
  );
};

export default Providers;
