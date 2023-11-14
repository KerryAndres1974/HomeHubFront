import { Link } from 'react-router-dom';
import '../hojasEstilos/Ingreso.css';
import { useState } from 'react';

function Ingreso() {
    const [formularioValido, cambiarFormulario] = useState(null);

    const onSubmits = (e) => {
        e.preventDefault();
        
        let usuario = document.getElementById('user-input1').value;
        let contras = document.getElementById('user-input2').value;

        if(usuario !== '' && contras !== ''){
            let datos = {user: usuario, password: contras};     
            let datosJSON = JSON.stringify(datos);
            console.log(datosJSON)
            /*fetch('http://localhost:5000/transaccion', {
                method: 'Post',
                body: datosJSON
            })*/
            cambiarFormulario(true);
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
                    <input id='user-input1' type='texto'></input>

                    <label id='input-text'>Contraseña</label>
                    <input id='user-input2' type='password'></input>
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