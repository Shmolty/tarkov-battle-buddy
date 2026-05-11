import { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

type AuthContextType = {
    token: string;
    isAuthenticated: boolean;
    isRestoring: boolean;
    authenticate: (token: string) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
    token: '',
    isAuthenticated: false,
    isRestoring: true,
    authenticate: () => {},
    logout: () => {},
});

export default function AuthContextProvider({
    children,
}: {
    children: React.ReactNode;
}): React.JSX.Element {
    const [authToken, setAuthToken] = useState('');
    const [isRestoring, setIsRestoring] = useState(true);

    useEffect(() => {
        const restoreToken = async () => {
            try {
                const token = await SecureStore.getItemAsync('auth_token');
                if (token) {
                    setAuthToken(token);
                }
            } catch (e) {
                console.log('Failed to restore token:', e);
            } finally {
                setIsRestoring(false);
            }
        };
        restoreToken();
    }, []);

    async function authenticate(token: string) {
        try {
            await SecureStore.setItemAsync('auth_token', token);
            setAuthToken(token);
            console.log('auth token set in context and secure store');
        } catch (e) {
            console.log('Failed to save token to secure store:', e);
            setAuthToken(token);
        }
    }

    async function logout() {
        try {
            await SecureStore.deleteItemAsync('auth_token');
        } catch (e) {
            console.log('Failed to delete token from secure store:', e);
        } finally {
            setAuthToken('');
        }
    }

    const value: AuthContextType = {
        token: authToken,
        isAuthenticated: !!authToken,
        isRestoring,
        authenticate,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}