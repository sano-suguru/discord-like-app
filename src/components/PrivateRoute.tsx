import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '../stores/authStore';
import { baseUrl } from '../util/baseUrl';

const PrivateRoute: React.FC = () => {
    const { isAuthenticated } = useAuthStore();

    return isAuthenticated ? <Outlet /> : <Navigate to={`${baseUrl}login`} />;
};

export default PrivateRoute;
