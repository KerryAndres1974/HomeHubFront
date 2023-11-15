import Inputs from '../componentes/Inputs.jsx';
import { useAuth } from '../Auth/AuthProvider.jsx';
import { Link, Navigate } from 'react-router-dom';
import '../hojasEstilos/Registro.css';
import { useState } from 'react';

function Registro() {      
    const [usuario, cambiarUsuario] = useState({campo: '', valido: null});
    const [nombre, cambiarNombre] = useState({campo: '', valido: null});
    const [contraseña, cambiarContraseña] = useState({campo: '', valido: null});
    const [contraseña2, cambiarContraseña2] = useState({campo: '', valido: null});
    const [correo, cambiarCorreo] = useState({campo: '', valido: null});
    const [telefono, cambiarTelefono] = useState({campo: '', valido: null});
    const [terminos, cambiarTerminos] = useState(false);
    const [formularioValido, cambiarFormulario] = useState(null);
    const [variable, cambiarVariable] = useState(null);
    const auth = useAuth();

    if(auth.Estalogeado){
        return <Navigate to='/Miperfil' />
    }

    const expresiones = {
        usuario: /^[a-zA-Z0-9_-]{4,16}$/, //letras, numeros, guion y guion bajo
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, //letras y espacios. Pueden llevar acentos
        contraseña: /^.{4,12}$/, // de 4 a 12 digitos
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{10,10}$/ // si o si 10 numeros
    }

    const validarContraseña = () => {
        if(contraseña.campo.length > 0){
            if(contraseña.campo !== contraseña2.campo){
                return false;
            } else {
                return true;
            }
        }
    }

    const onChangeTerminos = (e) => {
        cambiarTerminos(e.target.checked);
    }

    const onSubmits = (e) => {
        e.preventDefault();
        
        if(usuario.valido === 'true' &&
        nombre.valido === 'true' &&
        contraseña.valido === 'true' &&
        validarContraseña() === true &&
        correo.valido === 'true' &&
        telefono.valido === 'true' &&
        terminos){
            let datos = {user: usuario.campo,
                        name: nombre.campo,
                        password: contraseña.campo,
                        password2: contraseña2.campo,
                        email: correo.campo,
                        phone: telefono.campo};
                
            let datosJSON = JSON.stringify(datos);
            fetch('http://localhost:5000/transaccion', {
                method: 'Post',
                body: datosJSON,
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
                }
                return response.json(); // Suponiendo que el servidor responde con JSON
            })
            .then(data => {
                // Manejar la respuesta exitosa aquí
                //recojo todos los datos y los mando al backend
                cambiarFormulario(true);
                console.log('Respuesta exitosa:', data);
                cambiarUsuario({campo:'',valido: 'null'})
                cambiarContraseña({campo:'',valido: 'null'})
                cambiarContraseña2({campo:'',valido: 'null'})
                cambiarCorreo({campo:'',valido: 'null'})
                cambiarTelefono({campo:'',valido: 'null'})
                cambiarNombre({campo:'',valido: 'null'})
            })
            .catch(error => {
                // Manejar errores de la solicitud aquí
                console.error('Error en la solicitud:', error);
                cambiarFormulario(true)
                cambiarVariable(false)
            });

        } else {
            cambiarFormulario(false);
        }
    }

    return(
        <div id='principal-registro'>
            <form id='contenedor-registro' action='' onSubmit={onSubmits}>
                
                <p id='titulo-registro'>Registrate</p>
                <div id='contenedor-inputs'>
                    <Inputs
                        estado={usuario}
                        cambiarEstado={cambiarUsuario}
                        tipo='text'
                        texto='Usuario'
                        error='El usuario debe tener mas de 4 letras, numeros y/o guion bajo.'
                        expresionRegular={expresiones.usuario}
                        valido={usuario.valido}
                    />
                    <Inputs
                        tipo='text'
                        texto='Nombre'
                        estado={nombre}
                        error='El nombre solo debe contener letras y espacios'
                        expresionRegular={expresiones.nombre}
                        cambiarEstado={cambiarNombre}
                        valido={nombre.valido}
                    />
                    <Inputs
                        tipo='password'
                        texto='Contraseña'
                        estado={contraseña}
                        error='la contraseña debe ser de 4 a 12 digitos'
                        expresionRegular={expresiones.contraseña}
                        cambiarEstado={cambiarContraseña}
                        valido={contraseña.valido}
                    />
                    <Inputs
                        tipo='password'
                        texto='Confirmar contraseña'
                        estado={contraseña2}
                        error='Ambas contraseñas deben ser iguales'
                        funcion={validarContraseña}
                        cambiarEstado={cambiarContraseña2}
                        valido={contraseña2.valido}
                    />
                    <Inputs
                        tipo='email'
                        texto='Correo electronico'
                        estado={correo}
                        error='Debe ser un correo valido'
                        expresionRegular={expresiones.correo}
                        cambiarEstado={cambiarCorreo}
                        valido={correo.valido}
                    />
                    <Inputs
                        tipo='tel'
                        texto='Telefono'
                        estado={telefono}
                        error='Debe ser un telefono valido'
                        expresionRegular={expresiones.telefono}
                        cambiarEstado={cambiarTelefono}
                        valido={telefono.valido}
                    />
                </div>
                
                <label id='terminos'>
                    <input id='terminos'
                        type='checkbox'
                        checked={terminos}
                        onChange={onChangeTerminos}
                    />
                    Acepto los Terminos y Condiciones
                </label>

                <div>

                    <Link to="ConRegistro"><button id='btn-registro' type='submit'>Continuar</button></Link>
                    
                    {/* */}
                    
                            {/* Esto hace de el botón un enlace pero no lo valida, está así mientras pruebo la página del perfil*/}

                    </div>
                
                {formularioValido === false && <div id='mensajeError'>
                    <p><b>Error: </b>Por favor completa el formulario correctamente</p>
                </div>}

                {variable === false && <div id='mensajeError'>
                    <p><b>Error: </b>Esta dirección de correo electrónico ya está en uso</p>
                </div>}

                <div id='contenedor-final2'>
                    <nav>
                    <div id='pregunta-login'>Ya tienes cuenta?</div>
                        <ul>
                            <li><Link to="/Ingreso" id='pestaña2' >Iniciar Sesión</Link></li>
                        </ul>
                    </nav>
                </div>

            </form>
        </div>
    );
}

export default Registro;