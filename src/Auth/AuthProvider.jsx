import { useContext, createContext, useState } from "react";

const AuthContext = createContext({
    Estalogeado: false,
});

export function AuthProvider({ children }) {
    const [Estalogeado, Logear] = useState(false);
    console.log(Logear)

    return(
        <AuthContext.Provider value={{ Estalogeado }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);