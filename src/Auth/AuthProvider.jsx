import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext({
    saveUser: (userData) => {},
    logout: () => {},
    login: () => {},
});

export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(() => {
        const storedToken = localStorage.getItem("token");
        return storedToken ? JSON.parse(storedToken) : "";
    });

    const [refreshToken, setRefreshToken] = useState("");
    if(refreshToken){}

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setAccessToken(JSON.parse(storedToken));
        }
    }, []);

    function login() {
        return accessToken;
    }

    function logout() {
        setAccessToken("");
        setRefreshToken("");
        localStorage.removeItem("token");
    }

    function saveUser(userData) {
        setAccessToken(userData.body.accessToken);
        setRefreshToken(userData.body.refreshToken);

        localStorage.setItem("token", JSON.stringify(userData.body.refreshToken));
    }

    return (
        <AuthContext.Provider value={{ saveUser, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
