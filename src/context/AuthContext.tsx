import { createContext, useState } from "react";

type AuthContextType = {
    token: string;
    isAuthenticated: boolean;
    authenticate: (token: string) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
    token: '',
    isAuthenticated: false,
    authenticate: () => {},
    logout: () => {},
});

export default function AuthContextProvider({
    children,
}: {
    children: React.ReactNode;
}): React.JSX.Element {
    const [authToken, setAuthToken] = useState('');

    function authenticate(token: string) {
        setAuthToken(token);
    }

    function logout() {
        setAuthToken('');
    }

    const value: AuthContextType = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}