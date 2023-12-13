import '../hojasEstilos/Detallesinmueble.css';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Inputs from '../componentes/Inputs';
import Swal from 'sweetalert2';

function Detallesinmueble() {
    const { idProyecto } = useParams();
    const [proyecto, setProyecto] = useState([]);
    const [propietario, setPropietario] = useState([]);
    const [usuario, setUsuario] = useState({});
    const [asesoria, setAsesoria] = useState('En que podemos ayudarte?');
    const [nombre, setNombre] = useState({campo: '', valido: null});
    const [correo, setCorreo] = useState({campo: '', valido: null});
    const [telefono, setTelefono] = useState({campo: '', valido: null});
    const [terminos, cambiarTerminos] = useState(false);
    const [formularioValido, setFormularioValido] = useState(null);

    // Expresiones para formularios
    const expresiones = {
        credenciales: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // letras mayus y minus
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{10,10}$/, // si o si 10 numeros
    };    

    // Muestra los datos del vendedor
    const handleClick = () => {
        console.log(propietario);
        window.open(`https://wa.me/${propietario.phone}?text=${asesoria}`);
    }

    // Obtiene el token
    useEffect(() => {
        // Aquí obtén tu token JWT de alguna manera (por ejemplo, desde localStorage)
        const token = localStorage.getItem('token');

    if (token) {
        try {
            // Divide el token en sus partes: encabezado, carga útil y firma
            const [, cargaUtilBase64, ] = token.split('.');

            // Decodifica la carga útil (segunda parte del token)
            const cargaUtilDecodificada = atob(cargaUtilBase64);

            // Convierte la carga útil decodificada a un objeto JavaScript
            const usuario = JSON.parse(cargaUtilDecodificada);

            // Puedes establecer el usuario en el estado
            setUsuario(usuario);
        } catch (error) {
            console.error('Error al decodificar el token:', error);
        }
    }
}, []);

    // Obtiene el proyecto y despues info del propietario
    useEffect(() => {
        const cargarProyectos = async () => {
            try {
                const response = await fetch(`http://localhost:8000/mostrar-proyecto/${idProyecto}`);
    
                if(response.ok){
                    const data = await response.json();

                    try {
                        const response = await fetch(`http://localhost:8000/cargar-usuario/${data[0].idusuario}`);
            
                        if(response.ok){
                            const dato = await response.json();
                            setPropietario(dato[0]);
                        } else {
                            console.error('Error al obtener al usuario:', response.statusText);
                        }

                    } catch (error) {
                        console.error('Error al realizar la petición:', error);
                    }

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

    // Envia la petición al backend para guardar una asesoria
    const enviarDatos = (e) => {
        e.preventDefault();

        if (correo.valido === 'true' && telefono.valido === 'true' && terminos && 
            nombre.valido === 'true' && asesoria !== 'En que podemos ayudarte?'){
            let datos = {mensaje: asesoria,
                        destinatario: propietario.id,
                        remitente: (usuario ? usuario.id : null),
                        correo: correo.campo,
                        telefono: telefono.campo,
                        nombre: nombre.campo}
            let datosJSON = JSON.stringify(datos);

            fetch('http://localhost:8000/asignar-asesoria', {
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
                Swal.fire({
                    icon: "success",
                    title: "Datos enviados con exito",
                });
                setAsesoria('En que podemos ayudarte?');
                setCorreo({campo: '', valido: null});
                setTelefono({campo: '', valido: null});
                setNombre({campo: '', valido: null});
                cambiarTerminos(false);
            })
            .catch(error => {
                // Manejar errores de la solicitud aquí
                console.error('Error en la solicitud:', error);
                setFormularioValido(false);
            });
        } else {
            setFormularioValido(false);
        }
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
                            <p>{propietario.phone}</p>
                            <p>{propietario.email}</p>
                        </div>
                    </div>
                </div>

                <div className="caracteristicas">
                    <h1 className='textoZonas'>Zonas Comunes
                        <button className='btn-vendedor' onClick={handleClick}>Ver datos del vendedor</button>
                    </h1>
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
                                onChange={(e) => {cambiarTerminos(e.target.checked);}}/>
                            Acepto los Terminos y Condiciones
                        </label>
                    </div>

                    <input type='submit' value='Enviar' className='btn-enviar' />

                    {formularioValido === false && <div id='mensajeError'><p>Debes llenar todos los campos</p></div>}

                </form>

            </section>

        </div>
    );
}

export default Detallesinmueble