import { Link } from 'react-router-dom';
import '../hojasEstilos/Recuperar.css';
import { useState } from 'react';

function Recuperar() {

    const [formularioValido, cambiarFormulario] = useState(null);

    const onSubmits = (e) => {
        e.preventDefault();
        
        let correo = document.getElementById('user-input').value;

        if(correo !== ''){
            let datos = {email: correo};     
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
        <div id='principal-recup'>
            <form id='contenedor-recup' onSubmit={onSubmits}>
                <p id='texto-recup'>Recupera tu contraseña</p>

                <div>
                    <label id='input-text'>Correo asociado a tu cuenta</label>
                    <input id='user-input' type='email'></input>
                </div>
                
                <input id='btn-recup' type='submit' value='Continuar' />

                {formularioValido === false && <div id='mensaje-Error'>
                    <p><b>Error: </b>Correo no asociado</p>
                </div>}

                <div id='contenedor-rutas'>
                    <nav>
                        <ul>
                            <li><Link to='/' id='window2'>Regresar a Home</Link></li>
                        </ul>
                    </nav>
                </div>
            </form>
        </div>
    );
}

export default Recuperar;