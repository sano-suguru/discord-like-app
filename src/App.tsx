import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import { ChakraProvider, Spinner } from '@chakra-ui/react';

import { Navbar } from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import { baseUrl } from './util/baseUrl';

const LoginForm = lazy(() => import('./components/LoginForm'));
const Home = lazy(() => import('./pages/Home'));
const Chat = lazy(() => import('./pages/Chat'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

const App: React.FC = () => {
  return (
    <ChakraProvider>
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
    </ChakraProvider>
  );
};

export default App;
