import React, { Suspense } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import { Spinner } from '@chakra-ui/react';

import { Navbar } from './components/Navbar';
import { PrivateRoute } from './components/PrivateRoute';
import { baseUrl } from './util/baseUrl';
import { lazyNC } from './util/lazyNamedComponent';

const LoginForm = lazyNC(() => import('./components/LoginForm'));
const Home = lazyNC(() => import('./pages/Home'));
const Chat = lazyNC(() => import('./pages/Chat'));
const ProfilePage = lazyNC(() => import('./pages/ProfilePage'));

export const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path={`${baseUrl}login`} element={<LoginForm />} />
          <Route element={<PrivateRoute />}>
            <Route path={baseUrl} element={<Home />} />
            <Route path={`${baseUrl}chat`} element={<Chat />} />
            <Route path={`${baseUrl}chat/:channelId`} element={<Chat />} />
            <Route path={`${baseUrl}profile`} element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<Navigate to={baseUrl} replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
