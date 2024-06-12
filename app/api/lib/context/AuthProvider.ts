import { createContext, useContext, useState, ReactNode, FC } from 'react';
import axios from 'axios';

// Define the type for the user object. Update this according to your actual user object structure
interface User {
    id: string;
    email: string;
    type: string;
}

// Define the type for the context
interface AuthContextType {
    user: User | null;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => void;
    getMe: () => Promise<void>;
}

// Create the context with a default value and type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component with TypeScript
export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    async function getMe() {
        const token = localStorage.getItem('token');
        if (token) {
            const res = await axios.get('https://bootcamp-api.codeit.kr/api/5-7/the-julge/users/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const nextUser = res.data;
            setUser(nextUser);
        }
    }

    async function login({ email, password }: { email: string; password: string }) {
        const response = await axios.post('https://bootcamp-api.codeit.kr/api/5-7/the-julge/token', { email, password });
        localStorage.setItem('token', response.data.item.token);
        await getMe();
    }

    async function logout() {
        localStorage.removeItem('token');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, getMe }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
