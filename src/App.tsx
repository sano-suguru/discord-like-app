import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import LoginForm from './components/LoginForm';
import PrivateRoute from './components/PrivateRoute';
import ProfilePage from './pages/ProfilePage';
import { Navbar } from './components/Navbar';
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
