import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppStackRoutes } from './app.stack.routes';
import { AuthRoutes } from './auth.routes';

import { useAuth } from '../hook/auth';

export function Routes() {
    const { access } = useAuth();

    return (
        <NavigationContainer>
            { access !== undefined  ? <AppStackRoutes /> : <AuthRoutes /> }
        </NavigationContainer>
    );
}