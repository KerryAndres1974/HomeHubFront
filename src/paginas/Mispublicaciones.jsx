import React, { useEffect, useState } from 'react';
import Proyecto from '../componentes/Proyectos.jsx';
import '../hojasEstilos/Mispublicaciones.css';
import { useNavigate } from 'react-router-dom';

function Mispublicaciones() {
    const [usuario, setUsuario] = useState(null);
    const [nombre, setNombre] = useState(null);
    const [id, setId] = useState(null);
    const [proyecto, setProyecto] = useState([]);
    const goTo = useNavigate();

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
            setNombre(usuario.userId.name);
            setId(usuario.userId.id);

          } catch (error) {
            console.error('Error al decodificar el token:', error);
          }
        }
    }, []);

    const proyectosUsuario = async () => {
        try {
            const response = await fetch(`http://localhost:8000/proyectos/${id}/usuario`);

            if(response.ok){
                const data = await response.json();
                console.log(`Proyectos de ${usuario.userId.name}:`, data);
                setProyecto(data);
                console.log(proyecto);
            } else {
                console.error('Error al obtener los proyectos:', response.statusText);
            }
        } catch (error) {
            console.error('Error al realizar la petición:', error);
        }
    }

    const handleClick = (idProyecto) => {
        goTo(`/Mis-publicaciones/Editar-inmueble/${idProyecto}`);
        console.log(proyecto.id);
    };

    return (
        <div className='paginaMisPublicaciones'>
            <h2>Proyectos publicados de {nombre}</h2>
            <button onClick={proyectosUsuario}>Mostras mis publicaciones</button>

            <div className='contenedorPublicaciones'>
                {proyecto.map((proyecto) => (
                    <div className='contenedorXPropiedad'
                        key={proyecto.id}
                        onClick={() => handleClick(proyecto.id)}>
                        <Proyecto
                            nombre={proyecto.nombre}
                            tipo={proyecto.tipo}
                            ciudad={proyecto.ciudad}
                            precio={proyecto.precio}
                            imagen='casa1'
                            direccion={proyecto.direccion}
                            descripcion={proyecto.descripcion}
                            coincide={usuario.userId.id === proyecto.idusuario ? true : false}
                        />
                    </div>
                ))}
            </div>
            
        </div>
    );
}

export default Mispublicaciones;