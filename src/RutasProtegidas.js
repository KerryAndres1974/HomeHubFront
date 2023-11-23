import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./Auth/AuthProvider.jsx";

function RutaProtegida(){
    const Auth = useAuth();

    return Auth.login() ? <Outlet /> : <Navigate to='/' />;
}

export default RutaProtegida;