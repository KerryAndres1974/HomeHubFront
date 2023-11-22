import { useAuth } from '../Auth/AuthProvider.jsx';
import Inputs from '../componentes/Inputs.jsx';
import { Navigate, useNavigate } from 'react-router-dom';
import '../hojasEstilos/Recuperar.css';
import { useState } from 'react';

function Recuperar() {
    const [usuario, cambiarUsuario] = useState({campo: '', valido: null});
    const [contras, cambiarContras] = useState({campo: '', valido: null});
    const [rcontra, cambiarRcontra] = useState({campo: '', valido: null});

    // Para mostrar errores y avanzar en los formularios
    const [formularioValido, cambiarFormulario] = useState(null);
    const [correoValido, cambiarCorreo] = useState(null);
    const [codigoValido, cambiarCodigo] = useState(null);
    const [fase, setFase] = useState(1);

    // Para verificar si los campos de correo y codigo estan vacios o no
    const [correo, setCorreo] = useState("");
    const [codigo, setCodigo] = useState("");
    const goTo = useNavigate();
    const auth = useAuth();

    if(auth.Estalogeado){
        return <Navigate to='/Miperfil' />
    }

    const expresiones = { //letras, numeros, guion, guion bajo, @ y punto
        usuario: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$|^[a-zA-Z0-9_.-]+$|^[0-9]+$/,
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
            fetch('http://localhost:8000/forgot-password', {
                method: 'POST',
                body: JSON.stringify({correo: correo}),
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
                console.log("Envio correo exitoso");
                cambiarCorreo(true);
                setFase(2);
            })
            .catch(error => {
                // Manejar errores de la solicitud aquí
                console.error('Error en la solicitud:', error);
                cambiarCorreo(false);
            });

        } else if (fase === 1 && correo === ''){

            console.log("correo no aceptado");
            cambiarCorreo(false);

        } else if (fase === 2 && codigo !== ''){
            fetch('http://localhost:8000/verify-code', {
                method: 'POST',
                body: JSON.stringify({correo: correo, codigo: codigo}),
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
                console.log("Envio codigo exitoso");
                cambiarCodigo(true);
                setFase(3);
            })
            .catch(error => {
                // Manejar errores de la solicitud aquí
                console.error('Error en la solicitud:', error);
                cambiarCodigo(false);
                cambiarCorreo(null);
            });

        } else if (fase === 2 && codigo === ''){

            console.log("codigo no aceptado");
            cambiarCodigo(false);
            cambiarCorreo(null);

        } else if (fase === 3 &&
                usuario.valido === 'true' &&
                contras.valido === 'true' &&
                validarContraseña() === true){

            let datos = {email: usuario.campo, password: contras.campo, correo: correo};
            let datosJSON = JSON.stringify(datos);
            console.log(datosJSON);

            fetch('http://localhost:8000/reset-password', {
                method: 'POST',
                body: datosJSON,
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la solicitude: ${response.status} ${response.statusText}`);
                }
                return response.json(); // Suponiendo que el servidor responde con JSON
            })
            .then(data => {
                // Manejar la respuesta exitosa aquí
                console.log('Respuesta exitosa:', data);
                cambiarFormulario(true);
                cambiarCodigo(null);
                goTo('/Ingreso');
            })
            .catch(error => {
                // Manejar errores de la solicitud aquí
                console.error('Error en la solicitud:', error);
                cambiarCorreo(false);
                cambiarCodigo(null);
            });

        } else {
            cambiarFormulario(false);
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
                        texto='Telefono, e-mail o usuario'
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
                
                <input id='btn-recup' type='submit' value='Ingresar' />

                {codigoValido === true && <div id='mensaje-Exito'>
                    <p>El codigo de verificacion fue aceptado</p>
                </div>}

                {correoValido === false && <div id='mensajeError'>
                    <p>Usuario invalido</p>
                </div>}

                {formularioValido === false && <div id='mensajeError'>
                    <p><b>Error: </b>Completa el formulario</p>
                </div>}

                {formularioValido === true && <div id='mensaje-Exito' >
                    <p>contraseña cambiada exitosamente</p>
                </div>}

            </form>)}

        </div>
    );
}

export default Recuperar;