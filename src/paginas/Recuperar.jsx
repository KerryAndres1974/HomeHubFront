import { useAuth } from '../Auth/AuthProvider.jsx';
import Inputs from '../componentes/Inputs.jsx';
import { Navigate } from 'react-router-dom';
import '../hojasEstilos/Recuperar.css';
import { useState } from 'react';

function Recuperar() {
    const [usuario, cambiarUsuario] = useState({campo: '', valido: null});
    const [contras, cambiarContras] = useState({campo: '', valido: null});
    const [rcontra, cambiarRcontra] = useState({campo: '', valido: null});

    const [formularioValido, cambiarFormulario] = useState(null);
    const [correoValido, cambiarCorreo] = useState(null);
    const [codigoValido, cambiarCodigo] = useState(null);
    const [correo, setCorreo] = useState("");
    const [codigo, setCodigo] = useState("");
    const [fase, setFase] = useState(1);
    const auth = useAuth();

    if(auth.Estalogeado){
        return <Navigate to='/Miperfil' />
    }

    const expresiones = {
        usuario: /^[a-zA-Z0-9_-]{4,16}$/, //letras, numeros, guion y guion bajo
        contraseña: /^.{4,12}$/, // de 4 a 12 digitos
    }

    const validarContraseña = () => {
        if(contras.campo.length > 0){
            if(contras.campo !== rcontra.campo){
                return false;
            } else {
                return true;
            }
        }
    }

    const onSubmits = (e) => {
        e.preventDefault();

        if(fase === 1 && correo !== ''){
            console.log("correo aceptado");
            cambiarCorreo(true);
            setFase(2);
        } else if (fase === 1 && correo === ''){
            console.log("correo no aceptado");
            cambiarCorreo(false);
        } else if (fase === 2 && codigo !== ''){
            console.log("codigo aceptado");
            cambiarCodigo(true);
            setFase(3);
        } else if (fase === 2 && codigo === ''){
            console.log("codigo no aceptado");
            cambiarCodigo(false);
            cambiarCorreo(null);
        } else if (fase === 3 &&
                usuario.valido === 'true' &&
                contras.valido === 'true' &&
                validarContraseña() === true){
            let datos = {user: usuario.campo,
                password: contras.campo,
                password2: rcontra.campo,};
        
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
                cambiarContras({campo:'',valido: 'null'})
                cambiarRcontra({campo:'',valido: 'null'})
            })
            .catch(error => {
                // Manejar errores de la solicitud aquí
                console.error('Error en la solicitud:', error);
                cambiarFormulario(true)
            });

        } else {
            cambiarFormulario(false)
        }
    }

    return(
        <div id='principal-recup'>

            {fase === 1 && (<form id='contenedor-recup' onSubmit={onSubmits}>
                <p id='texto-recup'>Recupera tu contraseña</p>

                <div>
                    <label id='input-text'>Correo asociado a tu cuenta</label>
                    <input 
                        id='correo' 
                        type='email'
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)} />
                </div>
                
                <input id='btn-recup' type='submit' value='Enviar' />

                {correoValido === false && <div id='mensaje-Error'>
                    <p><b>Error: </b>Este correo no tiene cuenta asociada</p>
                </div>}

            </form>)}

            {fase === 2 && (<form id='contenedor-recup' onSubmit={onSubmits}>
                <p id='texto-recup'>Recupera tu contraseña</p>

                <div>
                    <label id='input-text'>Codigo de verificacion</label>
                    <input 
                        id='correo' 
                        type='text'
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                    ></input>
                </div>
                
                <input id='btn-recup' type='submit' value='Enviar' />

                {correoValido === true && <div id='mensaje-Exito'>
                    <p>El codigo de verificacion fue enviado a tu correo</p>
                </div>}

                {codigoValido === false && <div id='mensaje-Error'>
                    <p>Los codigos no coinciden</p>
                </div>}

            </form>)}

            {fase === 3 && (<form id='contenedor-recup' onSubmit={onSubmits}>
                <p id='texto-recup'>Recupera tu contraseña</p>

                <div>
                    <Inputs
                        estado={usuario}
                        cambiarEstado={cambiarUsuario}
                        tipo='text'
                        texto='Usuario'
                        error='Campo invalido.'
                        expresionRegular={expresiones.usuario}
                        valido={usuario.valido}
                    />

                    <Inputs
                        estado={contras}
                        cambiarEstado={cambiarContras}
                        tipo='password'
                        texto='Nueva contraseña'
                        error='la contraseña debe ser de 4 a 12 digitos.'
                        expresionRegular={expresiones.contraseña}
                        valido={contras.valido}
                    />

                    <Inputs
                        tipo='password'
                        texto='Confirmar contraseña'
                        estado={rcontra}
                        error='Ambas contraseñas deben ser iguales'
                        funcion={validarContraseña}
                        cambiarEstado={cambiarRcontra}
                        valido={rcontra.valido}
                    />
                </div>
                
                <input id='btn-recup' type='submit' value='Enviar' />

                {formularioValido === false && <div id='mensajeError'>
                    <p><b>Error: </b>Completa el formulario</p>
                </div>}

            </form>)}

        </div>
    );
}

export default Recuperar;