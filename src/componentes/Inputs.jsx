import '../hojasEstilos/Inputs.css';
import { useState } from 'react';

const Inputs = ({ tipo, texto, error, expresionRegular, cambiarEstado, estado, funcion }) => {
    const [valido, setValido] = useState(null); // Inicialmente no se muestra ningún estado

    const validarCampo = () => {
        if (expresionRegular) {
            if (expresionRegular.test(estado.campo)) {
                cambiarEstado({...estado, valido: 'true'})
                setValido(true);
            } else {
                cambiarEstado({...estado, valido: 'false'}) 
                setValido(false);
            }
        }
        if(funcion){
            setValido(funcion())
        }
    }

    const onChange = (e) => {
        cambiarEstado({...estado, campo: e.target.value});
    }

    return (
        <div id='formulario'>
            <p id='texto-input' className={valido === false ? 'error' : ''}>{texto}</p>
            <input id='input'
                    type={tipo}
                    value={estado.campo}
                    onChange={onChange}
                    onBlur={() => validarCampo()}
                    onKeyUp={() => validarCampo()}
                    className={valido === false ? 'error' : ''}
                />
            <p id='leyendaError' className={valido === false ? 'error' : ''}><b>{error}</b></p>
        </div>
    );
}

export default Inputs;