import ErrorBoundaryError from '@/components/ErrorBoundaryError';
import Layout from '@/components/layout';
import { APP_URLS } from '@/constants';
import AboutPage from '@/pages/About';
import EarnPage from '@/pages/Earn';
import FriendPage from '@/pages/Friend';
import HomePage from '@/pages/Home';
import LeaderBoardPage from '@/pages/LeaderBoard';
import PlayGame from '@/pages/PlayGame';
import UpgradePage from '@/pages/Upgrade';
import WalletPage from '@/pages/Wallet';
import { useIntegration } from '@telegram-apps/react-router-integration';
import { initNavigator } from '@telegram-apps/sdk';
import { useMemo } from 'react';
import { Navigate, Route, Router, Routes } from 'react-router-dom';

const AppRouters = () => {
  // Create a new application navigator and attach it to the browser history, so it could modify
  // it and listen to its changes.
  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);

  // Don't forget to attach the navigator to allow it to control the BackButton state as well
  // as browser history.
  // useEffect(() => {
  //   navigator.attach();
  //   return () => navigator.detach();
  // }, [navigator]);

  return (
    <Router location={location} navigator={reactNavigator}>
      <Routes>
        <Route element={<Layout />} ErrorBoundary={ErrorBoundaryError}>
          <Route path={APP_URLS.HOME} index element={<HomePage />} />
          <Route path={APP_URLS.FRIEND_PAGE} element={<FriendPage />} />
          <Route path={APP_URLS.LEADERBOARD_PAGE} element={<LeaderBoardPage />} />
          <Route path={APP_URLS.EARN} element={<EarnPage />} />
          <Route path={APP_URLS.PLAY_GAME} element={<PlayGame />} />
          <Route path={APP_URLS.WALLET} element={<WalletPage />} />
          <Route path={APP_URLS.UPGRADE} element={<UpgradePage />} />
          <Route path={APP_URLS.ABOUT} element={<AboutPage />} />
        </Route>

        <Route path={'*'} element={<Navigate to={'/'} />} />
      </Routes>
    </Router>
  );
};

export default AppRouters;
