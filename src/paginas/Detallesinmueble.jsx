import '../hojasEstilos/Detallesinmueble.css';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Inputs from '../componentes/Inputs';

function Detallesinmueble() {
    const { idProyecto } = useParams();
    const [proyecto, setProyecto] = useState([])
    const [usuario, setUsuario] = useState([])
    const [asesoria, setAsesoria] = useState('En que podemos ayudarte?')
    const [nombre, setNombre] = useState({campo: '', valido: null});
    const [correo, setCorreo] = useState({campo: '', valido: null});
    const [telefono, setTelefono] = useState({campo: '', valido: null});
    const [terminos, cambiarTerminos] = useState(false);

    const expresiones = {
        credenciales: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // letras mayus y minus
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{10,10}$/, // si o si 10 numeros
      };

    useEffect(() => {
        const cargarProyectos = async () => {
            try {
                const response = await fetch(`http://localhost:8000/mostrar-proyecto/${idProyecto}`);
    
                if(response.ok){
                    const data = await response.json();
                    setProyecto(data[0]);
                } else {
                    console.error('Error al obtener los proyectos:', response.statusText);
                }
            } catch (error) {
                console.error('Error al realizar la petición:', error);
            }
        };
    
        cargarProyectos(); // Llama a la función aquí
    
    }, [idProyecto]);

    useEffect(() => {
        const cargarUsuario = async () => {
            try {
                const response = await fetch(`http://localhost:8000/cargar-usuario/${proyecto.idusuario}`);
    
                if(response.ok){
                    const data = await response.json();
                    setUsuario(data[0]);
                } else {
                    console.error('Error al obtener al usuario:', response.statusText);
                }
            } catch (error) {
                console.error('Error al realizar la petición:', error);
            }
        };

        cargarUsuario();

    }, [proyecto.idusuario]);

    const onChangeTerminos = (e) => {
        cambiarTerminos(e.target.checked);
    }

    const enviarDatos = (e) => {
        e.preventDefault();
    }

    return (
        <div className="paginaDetalles">

            <section className="parte1">
                <div className="detalles">
                    <h1 className='precioInmuebles'>Precio desde: ${proyecto.precio}</h1>

                    <div className='contenidoAdd'>
                        <div className='addI'>
                            <p><b>Ubicado en:</b></p>
                            <p><b>Contacto:</b></p>
                            <p><b>Email:</b></p>
                        </div>
                        <div className='addD'>
                            <p>{proyecto.direccion}, {proyecto.ciudad}, Valle del Cauca</p>
                            <p>{usuario.phone}</p>
                            <p>{usuario.email}</p>
                        </div>
                    </div>
                </div>

                <div className="caracteristicas">
                    <h1 className='textoZonas'>Zonas Comunes</h1>
                    <div className='zonasComunes'>
                        
                        <div>
                            <li>Ciudad ordenada</li>
                            <li>Acueducto</li>
                            <li>Espacios para educacion</li>
                        </div>
                        <div>
                            <li>Desarrollo planificado</li>
                            <li>Espacios deportivos</li>
                            <li>Corredores ambientales</li>
                        </div>
                        <div>
                            <li>Zonas comerciales</li>
                            <li>Espacios para la salud</li>
                            <li>Espacios para la seguridad</li>
                        </div>
                        
                    </div>
                </div>
            </section>

            <section className="parte2">

                <div className='galeria'>
                    <h1 className='tituloGaleria'>Galería</h1>
                    <h2>Haz click para ver la imagen completa</h2>
                </div>

                <form className='datosInteresado' onSubmit={enviarDatos}>
                    <h1 className='tituloInteresado'>Dejanos tus datos</h1>

                    <div className='contenedorInputs'>
                        <select className='formularioDinamico'
                            value={asesoria}
                            onChange={(e) => setAsesoria(e.target.value)}
                            style={{margin: '0'}}>
                            <option disabled >En que podemos ayudarte?</option>
                            <option>Quiero recibir una llamada</option>
                            <option>Quiero recibir una cotizacion</option>
                            <option>Quiero informacion general</option>
                        </select>

                        <div>
                            <label className="input-text" style={{margin: '0 0 0 29px', fontSize: '13px'}}>Mensaje</label>
                            <input type="text" className='input' style={{margin: '0 0 0 25px'}}/>
                        </div>

                        <Inputs
                            estado={correo}
                            cambiarEstado={setCorreo}
                            tipo='email'
                            texto='Correo'
                            error='Campo invalido'
                            expresionRegular={expresiones.correo}
                            valido={correo.valido}
                        />

                        <Inputs
                            estado={telefono}
                            cambiarEstado={setTelefono}
                            tipo='tel'
                            texto='Telefono'
                            error='Campo invalido'
                            expresionRegular={expresiones.telefono}
                            valido={telefono.valido}
                        />

                        <Inputs
                            estado={nombre}
                            cambiarEstado={setNombre}
                            tipo='text'
                            texto='Nombre'
                            error='Campo invalido'
                            expresionRegular={expresiones.credenciales}
                            valido={nombre.valido}
                        />

                        <label className='terminos'>
                            <input type='checkbox'
                                checked={terminos}
                                onChange={onChangeTerminos}
                            />
                            Acepto los Terminos y Condiciones
                        </label>
                    </div>

                    <input type='submit' value='Enviar' className='btn-enviar' />

                </form>

            </section>

        </div>
    );
}

export default Detallesinmueble