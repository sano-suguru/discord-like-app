import React, { useMemo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '../stores/authStore';
import { baseUrl } from '../util/baseUrl';

export const PrivateRoute: React.FC = React.memo(() => {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    const redirectComponent = useMemo(() => <Navigate to={`${baseUrl}login`} replace />, []);

    return isAuthenticated ? <Outlet /> : redirectComponent;
});

PrivateRoute.displayName = 'PrivateRoute';
