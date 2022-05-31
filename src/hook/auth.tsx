import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { UserDTO } from '../dtos/UserDTO';
import { AccessDTO } from '../dtos/AccessDTO';

import api from '../services/api';

interface AuthContextData {
    user: UserDTO;
    access: AccessDTO;
    signIn: (credentials: SignInCredentialsDTO) => Promise<void>;
    signOut: () => Promise<void>;
    loading: boolean;
};

interface AuthProviderProps {
    children: ReactNode;
}

interface IData {
    access: AccessDTO;
    user: UserDTO;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<IData>({} as IData);
    const [loading, setLoading] = useState(true);


    async function signIn({ username, password }: SignInCredentialsDTO) {
        try {
            const response = await api.post('/auth/signin', {
                username,
                password,
            });

            const { access, user } = response.data;

            api.defaults.headers.common['Authorization'] = `Bearer ${access.token}`;

            setData({ user, access });
        } catch (error) {
            throw new Error(error as any);
        }
    }

    async function signOut() {
        setData({} as IData);
    }

    useEffect(() => {
        async function loadUserData() {
            setLoading(false);
        }

        loadUserData();
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user: data.user,
                access: data.access,
                signIn,
                signOut,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    )

};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    return context;
};

export { AuthProvider, useAuth };