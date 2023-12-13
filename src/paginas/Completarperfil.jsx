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
  const [usuario, setUsuario] = useState('');
  const addNewPhoto = useRef(null);
  const [formularioValido, setFormularioValido] = useState(null);
  
  // Expresiones para formularios
  const expresiones = {
    credenciales: /^[a-zA-Z0-9À-ÿ\s]{1,100}$/, // letras mayus y minus
    numeros: /^\d{1,4}$/, // de 1 a 4 digitos
  };

  // Obtiene el token
  useEffect(() => {
    // Aquí obtén tu token JWT de alguna manera (por ejemplo, desde localStorage)
    const token = localStorage.getItem('token');
  
    if (token) {
      try {
        // Divide el token en sus partes: encabezado, carga útil y firma
        const [, cargaUtilBase64,] = token.split('.');

        // Decodifica la carga útil (segunda parte del token)
        const cargaUtilDecodificada = atob(cargaUtilBase64);

        // Convierte la carga útil decodificada a un objeto JavaScript
        const user = JSON.parse(cargaUtilDecodificada);
            
        // Puedes establecer el usuario en el estado
        setUsuario(user);
        console.log(user);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
  }, []);

  // Mostrar imagenes en un contenedor
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Puedes mostrar la imagen seleccionada en el elemento 'texto-add-photo'
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
    }
  };

  // Envia la peticion al backend
  const completarDatos = async (e) => {
    e.preventDefault();

    if(descripcion.valido === 'true' && experiencia.valido === 'true' && realizados.valido === 'true'){
      if(selectedImage){

        const formData = new FormData();
        formData.append('file', addNewPhoto.current.files[0]);
        formData.append("upload_preset", "HomeHub");
        formData.append("api_key", "453363773865368");
        formData.append("timestamp", (Date.now() / 1000) | 0);

        const response = await fetch('https://api.cloudinary.com/v1_1/dyydtpzbg/image/upload', {
          method: "POST",
          body: formData,
        });

        if(response.ok) {
          const data = await response.json();
          
          fetch(`http://localhost:8000/completar-perfil/${usuario.id}`, {
            method: 'PUT',
            body: JSON.stringify({descripcion: descripcion.campo,
                                  experiencia: experiencia.campo,
                                  proyectosrealizados: realizados.campo,
                                  fotoperfil: data.secure_url}),
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
            setRealizados({campo: '', valido: null});
            setDescripcion({campo: '', valido: null});
            setExperiencia({campo: '', valido: null});
            setFormularioValido(null);
            Swal.fire({
              icon: "success",
              title: "Se completaron tus datos Exitosamente",
            });
          })
          .catch(error => {
            // Manejar errores de la solicitud aquí
            console.error('Error en la solicitud:', error);
          });
        } else {
          console.error('Error en la solicitud:', response.status, response.statusText);
        }

      } else {
        fetch(`http://localhost:8000/completar-perfil/${usuario.id}`, {
          method: 'PUT',
          body: JSON.stringify({descripcion: descripcion.campo,
                                experiencia: experiencia.campo,
                                proyectosrealizados: realizados.campo }),
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
          setRealizados({campo: '', valido: null});
          setDescripcion({campo: '', valido: null});
          setExperiencia({campo: '', valido: null});
          setFormularioValido(null);
          Swal.fire({
            icon: "success",
            title: "Se completaron tus datos Exitosamente",
          });
        })
        .catch(error => {
          // Manejar errores de la solicitud aquí
          console.error('Error en la solicitud:', error);
        });
      }
      
    } else {
      setFormularioValido(false);
    }
  };

  return (
    <div className='paginaCompletarperfil'>

      <section className='contenedorCompletarPerfil'>
        
        <h1 className='textoCompletar'>Completar mi Perfil</h1>

        <button className='fotoPerfil' onClick={() => addNewPhoto.current.click()} >
          {usuario.fotoperfil ? <img src={usuario.fotoperfil} alt='Imagen de Perfil' className='fotoperfil'/> : 
          (selectedImage ? <img src={selectedImage} alt='Imagen de Perfil' className='fotoperfil'/> : <p>Añade una Foto de Perfil</p>)}
        </button>

        <form onSubmit={completarDatos}>
          <Inputs
            estado={descripcion}
            cambiarEstado={setDescripcion}
            tipo='text'
            texto='Descripción de la empresa'
            error='Campo invalido'
            expresionRegular={expresiones.credenciales}
            valido={descripcion.valido}
          />
          <Inputs
            estado={experiencia}
            cambiarEstado={setExperiencia}
            tipo='text'
            texto='Años de experiencia'
            error='Solo deben ser numeros'
            expresionRegular={expresiones.numeros}
            valido={experiencia.valido}
            />
          <Inputs
            estado={realizados}
            cambiarEstado={setRealizados}
            tipo='text'
            texto='Número de proyectos realizados'
            error='Solo deben ser numeros'
            expresionRegular={expresiones.numeros}
            valido={realizados.valido}
            />

          <input
            type='file'
            accept='image/*'
            ref={addNewPhoto}
            style={{display: 'none'}}
            onChange={handleFileChange} />

          <input className='btn-completar' type='submit' value='Confirmar'/>
            
        </form>

        {formularioValido === false && <div id='mensajeError'><p>Debes llenar todos los campos</p></div>}

      </section>

    </div>
  );
}

export default Completarperfil;