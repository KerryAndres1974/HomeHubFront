import Inputs from '../componentes/Inputs.jsx';
import '../hojasEstilos/Completarperfil.css';
import { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';

function Completarperfil() {
  // Para completar tu perfil
  const [realizados, setRealizados] = useState({campo: '', valido: null});
  const [descripcion, setDescripcion] = useState({campo: '', valido: null});
  const [experiencia, setExperiencia] = useState({campo: '', valido: null});
  
  // Para validar Formularios
  const [selectedImage, setSelectedImage] = useState(null);
  const [fotoPerfil, setFotosPerfil] = useState(null);
  const [usuario, setUsuario] = useState('');
  const addNewPhoto = useRef(null);

  useEffect(() => {
    // Aquí obtén tu token JWT de alguna manera (por ejemplo, desde localStorage)
    const token = localStorage.getItem('token');
  
    if (token) {
      try {
        // Divide el token en sus partes: encabezado, carga útil y firma
        const [, cargaUtilBase64, ] = token.split('.');
  
        // Decodifica la carga útil (segunda parte del token)
        const cargaUtilDecodificada = typeof window !== 'undefined'
          ? window.atob(cargaUtilBase64)
          : Buffer.from(cargaUtilBase64, 'base64').toString('binary');
  
        // Convierte la carga útil decodificada a un objeto JavaScript
        const usuario = JSON.parse(cargaUtilDecodificada);
  
        // Puedes establecer el usuario en el estado
        setUsuario(usuario.userId.username);
  
        /*try {
          const arrayBufferView = new Uint8Array(usuario.userId.fotoperfil.data);
          const blob = new Blob([arrayBufferView], { type: 'image/jpg' });
          const base64String = URL.createObjectURL(blob);

          const file = new File([blob], 'image', { type: blob.type });
          const fr = new FileReader();
          fr.readAsDataURL(file);
          fr.addEventListener('load', () => {
            const res = fr.result;
            console.log(res);
          });

          console.log(blob);
          setFotosPerfil(base64String);

          console.log(`${usuario.userId.username} tiene foto de perfil`);
        } catch (error) {
          console.error('Error al crear la URL de Blob:', error);
        }*/

        if (usuario.userId.fotoperfil) {
          const arrayBufferView = new Uint8Array(usuario.userId.fotoperfil.data);
          const base64String = btoa(String.fromCharCode(...arrayBufferView));
          setFotosPerfil(`data:image/jpeg;base64,${base64String}`);
        }
  
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
  }, []);
  

  const expresiones = {
    precio: /^[0-9]+$/, //precios monetarios
    direccion: /^[a-zA-ZÀ-ÿ0-9\s#-]{1,40}$/, //letras, numeros, # y -
    credenciales: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // letras mayus y minus
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{10,10}$/, // si o si 10 numeros
    contraseña: /^.{4,12}$/, // de 4 a 12 caracteres
  };

  const añadirFoto = (e) => {
    e.preventDefault();
    addNewPhoto.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Puedes mostrar la imagen seleccionada en el elemento 'texto-add-photo'
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
    }
  };

  const completarDatos = (e) => {
    e.preventDefault();
    
    console.log(usuario);
    console.log(descripcion.valido, experiencia.valido, realizados.valido);

    if(descripcion.valido === 'true' && experiencia.valido === 'true' && realizados.valido === 'true'){

      fetch(`http://localhost:8000/actualiza/${usuario}`, {
        method: 'PUT',
        body: JSON.stringify({descripcion: descripcion.campo,
                              experiencia: experiencia.campo,
                              proyectosrealizados: realizados.campo,
                              fotoperfil: selectedImage }),
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
          title: "Se actualizaron tus datos Exitosamente",
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
      Swal.fire({
        icon: "error",
        title: "Algo salio mal...",
        text: "Debes completar todos los campos",
        showConfirmButton: false,
        allowOutsideClick: true,
        allowEnterKey: true,
      });
    }
  };

  return (
    <div className='paginaCompletarperfil'>

      <section className='contenedorCompletarPerfil'>
        
        <h1 className='textoCompletar'>Completar mi Perfil</h1>

        <button className='fotoPerfil' onClick={añadirFoto} >
          {selectedImage || fotoPerfil ? (<img src={selectedImage || fotoPerfil} alt='imagenV' className='fotoPerfil'/>) : 
          <p className='imagenV'>Añade una Foto de Perfil</p>}
        </button>

        <form onSubmit={completarDatos}>
          <Inputs
            estado={descripcion}
            cambiarEstado={setDescripcion}
            tipo='text'
            texto='Descripción de la empresa'
            error='Campo invalido'
            expresionRegular={expresiones.direccion}
            valido={descripcion.valido}
          />
          <Inputs
            estado={experiencia}
            cambiarEstado={setExperiencia}
            tipo='text'
            texto='Años de experiencia'
            error='Campo invalido'
            expresionRegular={expresiones.direccion}
            valido={experiencia.valido}
            />
          <Inputs
            estado={realizados}
            cambiarEstado={setRealizados}
            tipo='text'
            texto='Número de proyectos realizados'
            error='Campo invalido'
            expresionRegular={expresiones.direccion}
            valido={realizados.valido}
            />

          <input
            type='file'
            className='add-photo-container'
            ref={addNewPhoto}
            style={{display: 'none'}}
            onChange={handleFileChange} />

          <input className='btn-completar' type='submit' value='Confirmar'/>
          
        </form>

      </section>

    </div>
  );
}

export default Completarperfil;