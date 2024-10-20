import { PropsWithChildren, useEffect } from 'react';

export default function ButtonHandler({ children }: PropsWithChildren) {
  useEffect(() => {
    (window as any).Telegram.WebApp.expand();
  }, []);

  return <>{children}</>;
}
