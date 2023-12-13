import React, { useEffect, useState } from 'react';
import Proyecto from '../componentes/Proyectos.jsx';
import '../hojasEstilos/Mispublicaciones.css';
import { useNavigate } from 'react-router-dom';

function Mispublicaciones() {
    const [usuario, setUsuario] = useState(null);
    const [proyecto, setProyecto] = useState([]);
    const goTo = useNavigate();

    // Carga los datos del usuario
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

    // Carga los proyectos del usuario
    const proyectosUsuario = async () => {
        try {
            const response = await fetch(`http://localhost:8000/proyectos/${usuario.id}/usuario`);

            if(response.ok){
                const data = await response.json();
                setProyecto(data);
            } else {
                console.error('Error al obtener los proyectos:', response.statusText);
            }
        } catch (error) {
            console.error('Error al realizar la petición:', error);
        }
    }

    return (
        <div className='paginaMisPublicaciones'>
            <h1 className='tituloPropietario'>{usuario ? `Proyectos publicados por ${usuario.username}` : 
            'Cargando...'}</h1>
            <button onClick={proyectosUsuario} className='btn-proyectos'>Mostras mis publicaciones</button>

            <div className='contenedorPublicaciones'>
                {proyecto.map((proyecto) => (
                    <div className='contenedorXPropiedad'
                        key={proyecto.id}
                        onClick={() => {goTo(`/Mis-publicaciones/Editar-inmueble/${proyecto.id}`)}}>
                        <Proyecto
                            nombre={proyecto.nombre}
                            tipo={proyecto.tipo}
                            ciudad={proyecto.ciudad}
                            precio={proyecto.precio}
                            imagen={proyecto.imagen}
                            direccion={proyecto.direccion}
                            descripcion={proyecto.descripcion}
                            coincide={usuario.id === proyecto.idusuario ? true : false}
                        />
                    </div>
                ))}
            </div>
            
        </div>
    );
}

export default Mispublicaciones;