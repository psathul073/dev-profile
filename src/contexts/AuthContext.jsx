import { createContext, useContext, useEffect, useState } from "react";
import { FetchUser } from "../api/Auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getUser = async () => {

            try {
                const user = await FetchUser();
                if (user?.id) {
                    setUser(user);
                }
            } catch (error) {
                console.error('Failed to fetch user', error)
            } finally {
                setLoading(false);
            }
        }
        getUser();

    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);