import Inputs from '../componentes/Inputs.jsx';
import { Link } from 'react-router-dom';
import '../hojasEstilos/Ingreso.css';
import { useState } from 'react';

function Ingreso() {

    const [usuario, cambiarUsuario] = useState({campo: '', valido: null});
    const [contras, cambiarContras] = useState({campo: '', valido: null});

    return(
        <div id='principal-login'>
            <div id='contenedor-login'>
                <p id='texto-login'>Inicia sesión</p>

                <Inputs 
                    tipo='text'
                    texto='Telefono, e-mail o usuario'
                    estado={usuario}
                    error='Debe ser un telefono valido'
                    cambiarEstado={cambiarUsuario}
                />
                <Inputs 
                    tipo='password'
                    texto='Contraseña'
                    estado={contras}
                    error='Debe ser un telefono valido'
                    cambiarEstado={cambiarContras}
                />
                
                <form><input id='btn-login' type='submit' value='Continuar' /></form>

                <div id='contenedor-rutas'>
                    <nav>
                        <ul>
                            <li><Link to='/Recuperar' id='window1'>Olvide mi contraseña</Link></li>
                            <li><Link to='/Registro' id='window1'>Crear cuenta</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Ingreso;