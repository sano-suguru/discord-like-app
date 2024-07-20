import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';

import LoginForm from './components/LoginForm';
import { Navbar } from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Chat from './pages/Chat';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import { baseUrl } from './util/baseUrl';

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
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
      </Router>
    </ChakraProvider>
  );
};

export default App;
