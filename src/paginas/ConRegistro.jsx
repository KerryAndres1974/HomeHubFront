import '../hojasEstilos/ConRegistro.css';
import Inputs from '../componentes/Inputs.jsx';


function ConRegistro(){
    return(
        <div id='principal'>
            <form id="contenedor">
                <p id= 'titulo'>
                    Formulario de registro
                </p>
                <p id= 'Desc'>
                    Por favor complete los siguientes campos de información para terminar 
                    de configurar el perfil inmobiliario.
                </p>
                <div id='contenedor-campos'>
                    <Inputs>
                    
                    </Inputs>

                </div>
            </form>
            
        </div>

    );
}
export default ConRegistro;