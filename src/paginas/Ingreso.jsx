import { useAuth } from '../Auth/AuthProvider.jsx';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import '../hojasEstilos/Ingreso.css';
import { useState } from 'react';

function Ingreso() {
    const [formularioValido, cambiarFormulario] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth();
    const goTo = useNavigate();

    if(auth.Estalogeado){
        return <Navigate to='/Miperfil' />
    }
 
    const onSubmits = (e) => {
        e.preventDefault();

        if(username !== '' && password !== ''){
            let datos = {user: username, pass: password};     
            let datosJSON = JSON.stringify(datos);
            
            fetch('http://localhost:8000/login', {
                method: 'POST',
                body: datosJSON,
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
                }
                return response.json(); // Suponiendo que el servidor responde con JSON
            })
            .then(data => {
                // Manejar la respuesta exitosa aquí
                goTo('/');
            })
            .catch(error => {
                // Manejar errores de la solicitud aquí
                console.error('Error en la solicitud:', error);
                cambiarFormulario(true);
            });
        } else {
            console.log("los campos estan vacios")
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