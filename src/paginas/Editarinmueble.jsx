import { useState, useEffect } from "react";
import Inputs from '../componentes/Inputs.jsx';
import { useParams, useNavigate } from "react-router-dom";
import '../hojasEstilos/Editarinmueble.css';
import Proyectos from '../componentes/Proyectos.jsx';
import Swal from 'sweetalert2';

export function Editarproyecto() {
    const [descripcion, setDescripcion] = useState({campo: '', valido: null});
    const [direccion, setDireccion] = useState({campo: '', valido: null});
    const [nombre, setNombre] = useState({campo: '', valido: null});
    const [precio, setPrecio] = useState({campo: '', valido: null});
    const [formularioValido, setFormularioValido] = useState(null);
    const [ciudad, setCiudad] = useState('Ciudad');
    const [tipo, setTipo] = useState('Tipo');
    const { idProyecto } = useParams();
    const [proyecto, setProyecto] = useState([])
    const goTo = useNavigate();

    const expresiones = {
        precio: /^\d{1,3}(,\d{3})/, //precios monetarios
        direccion: /^[a-zA-ZÀ-ÿ0-9\s#-]{1,40}$/, //letras, numeros, # y -
        credenciales: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // letras mayus y minus
    }

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

    const actualizaProyecto = (e) => {
        e.preventDefault();
        
        if (nombre.valido === 'true' && direccion.valido === 'true' &&
            ciudad !== 'Ciudad' && tipo !== 'Tipo' && precio.valido === 'true' && 
            descripcion.valido === 'true') {
            
            fetch(`http://localhost:8000/actualiza-proyecto/${idProyecto}`, {
                method: 'PUT',
                body: JSON.stringify({descripcion: descripcion.campo,
                                        ciudad: ciudad,
                                        tipo: tipo, 
                                        precio: precio.campo,
                                        nombre: nombre.campo,
                                        direccion: direccion.campo,
                                        idproyecto: idProyecto}),
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
                    title: "Se guardaron los cambios Exitosamente",
                    showConfirmButton: false,
                    allowOutsideClick: true,
                    allowEnterKey: true,
                });
            })
            .catch(error => {
                // Manejar errores de la solicitud aquí
                Swal.fire({
                    icon: "error",
                    title: "Algo salio mal...",
                    text: error,
                    showConfirmButton: false,
                    allowOutsideClick: true,
                    allowEnterKey: true,
                  });
            });
            
        } else {
            setFormularioValido(false);
        }
    }

    const elimiarPublicacion = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: "question",
            title: "¿Seguro que quieres eliminar tu publicaion?",
            showConfirmButton: true,
            showCancelButton: true,
            allowOutsideClick: false,
            allowEnterKey: false,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
        }).then((result) => {

            if(result.isConfirmed) {
                fetch(`http://localhost:8000/borrar-proyecto/${idProyecto}`, {
                    method: 'DELETE',
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
                        title: "Se elimino la publicacion Exitosamente",
                        showConfirmButton: false,
                        allowOutsideClick: false,
                        allowEnterKey: false,
                        timer: 3000,
                    }).then(() => {
                        goTo('/Mis-publicaciones');
                    });
                })
                .catch(error => {
                    // Manejar errores de la solicitud aquí
                    Swal.fire({
                        icon: "error",
                        title: "Algo salio mal...",
                        text: error,
                        showConfirmButton: false,
                        allowOutsideClick: true,
                        allowEnterKey: true,
                      });
                });
            }
        });
    };

    return(
        <div className='contenedorPrincipalEdicion'>

            <div className='contenedorInformacionInmueble'>

                <div className="accionProyecto">
                    <Proyectos
                        nombre={proyecto.nombre}
                        tipo={proyecto.tipo}
                        ciudad={proyecto.ciudad}
                        precio={proyecto.precio}
                        imagen='casa3'
                        direccion={proyecto.direccion}
                        descripcion={proyecto.descripcion}
                        coincide={null}
                    />
                    <button className='btn-eliminar' onClick={elimiarPublicacion}>Eliminar Publicaion</button>
                </div>

                <form className='contenedorEditar' onSubmit={actualizaProyecto}>
                    
                    <h2 className='tituloEditar'>Editar tu Inmueble ID: {idProyecto}</h2>
                    <div className='contenedor-inputs'>
                        <Inputs
                            estado={nombre}
                            cambiarEstado={setNombre}
                            tipo='text'
                            texto='Nombre'
                            error='Campo invalido'
                            expresionRegular={expresiones.credenciales}
                            valido={nombre.valido}
                        />
                        <Inputs
                            estado={direccion}
                            cambiarEstado={setDireccion}
                            tipo='text'
                            texto='Barrio/direccion'
                            error='Ingrese una direccion valida'
                            expresionRegular={expresiones.direccion}
                            valido={direccion.valido}
                        />

                        <select className='formularioDinamico'
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}>
                            <option disabled >Ciudad</option>
                            <option>Cali</option>
                            <option>Buga</option>
                            <option>Tuluá</option>
                            <option>Jamundí</option>
                        </select>
                    
                        <select className='formularioDinamico'
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}>
                            <option disabled >Tipo</option>
                            <option>Casa</option>
                            <option>Apartamento</option>
                        </select>

                        <Inputs
                            estado={descripcion}
                            cambiarEstado={setDescripcion}
                            tipo='text'
                            texto='Descripción'
                            error='Campo invalido'
                            expresionRegular={expresiones.direccion}
                            valido={descripcion.valido}
                        />
                        <Inputs
                            estado={precio}
                            cambiarEstado={setPrecio}
                            tipo='text'
                            texto='Precio'
                            error='Ingrese un valor valido, por ejemplo: 100,000'
                            expresionRegular={expresiones.precio}
                            valido={precio.valido}
                        />
                    </div>
                    
                    <input className='btn-editar' type='submit' value='Confirmar' />

                    {formularioValido === false && <div id='mensajeError'>
                        <p>Debes llenar todos los campos</p>
                    </div>}

                </form>
            </div>
        </div>

    );
}

export default Editarproyecto;