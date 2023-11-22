import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider.jsx';
import '../hojasEstilos/Ingreso.css';
import { useState } from 'react';

function Ingreso() {
    const [formularioValido, cambiarFormulario] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const goTo = useNavigate();
    const auth = useAuth();

    if(auth.Estalogeado){
        return <Navigate to='/Miperfil' />
    }

    async function onSubmits(e) {
        e.preventDefault();
        
        try {
            if (username !== '' && password !== '') {
                const response = await fetch('http://localhost:8000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: username, password: password }),
                });

                if (!response.ok) {
                    throw new Error('Usuario y/o contraseña invalidos');
                }

                const { token } = await response.json();

                // Manejar el token, por ejemplo, almacenarlo en el contexto de autenticación
                // auth.login(token);
                console.log('Token recibido:', token);
                goTo('/')
                auth.Estalogeado = true;
            } else {
                cambiarFormulario(false);
            }
        } catch (error) {
            cambiarFormulario(false);
        }
    }

    return(
        <div id='principal-login'>
            <form id='contenedor-login' onSubmit={onSubmits}>
                <p id='texto-login'>Inicia sesión</p>

                <div>
                    <label id='input-text'>Telefono, e-mail o usuario</label>
                    <input 
                        id='usuario' 
                        type='texto'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    ></input>

                    <label id='input-text'>Contraseña</label>
                    <input 
                        id='contraseña' 
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                
                <input id='btn-login' type='submit' value='Continuar' />

                {formularioValido === false && <div id='mensaje-Error'>
                    <p><b>Error: </b>Usuario y/o contraseña invalidos</p>
                </div>}

                <div id='contenedor-rutas'>
                    <nav>
                        <ul>
                            <li><Link to='/Recuperar' id='window1'>Olvide mi contraseña</Link></li>
                            <li><Link to='/Registro' id='window1'>Crear cuenta</Link></li>
                        </ul>
                    </nav>
                </div>
            </form>
        </div>
    );
}

export default Ingreso;