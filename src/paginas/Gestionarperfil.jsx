import Inputs from '../componentes/Inputs.jsx';
import '../hojasEstilos/Gestionarperfil.css';
import { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';

function Gestionarperfil() {
  // Para editar tu perfil
  const [formularioValido, setFormularioValido] = useState(null);
  const [usuario, setUsuario] = useState('');
  const [nombre, setNombre] = useState({campo: '', valido: null});
  const [correo, setCorreo] = useState({campo: '', valido: null});
  const [telefono, setTelefono] = useState({campo: '', valido: null});
  const [contraseña, setContraseña] = useState({campo: '', valido: null});
  const [contraseña2, setContraseña2] = useState({campo: '', valido: null});
  
  // Para completar tu perfil
  const [realizados, setRealizados] = useState({campo: '', valido: null});
  const [descripcion, setDescripcion] = useState({campo: '', valido: null});
  const [experiencia, setExperiencia] = useState({campo: '', valido: null});
  const [selectedImage, setSelectedImage] = useState(null);
  const añadeFoto = useRef(null);

  // Expresiones para formularios
  const expresiones = {
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    numeros: /^\d{1,4}$/, // de 1 a 4 digitos
    telefono: /^\d{10,10}$/, // si o si 10 numeros
    contraseña: /^.{4,12}$/, // de 4 a 12 caracteres
    credenciales: /^[a-zA-Z0-9À-ÿ\s]{1,100}$/, // letras mayus y minus
  };
  
  // Mostrar imagenes en un contenedor
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Puedes mostrar la imagen seleccionada en el elemento 'texto-add-photo'
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
    }
  };
  
  // Validar contraseña
  const validarContraseña = () => {
    if(contraseña.campo.length > 0){
      if(contraseña.campo !== contraseña2.campo){
          return false;
      } else {
          return true;
      }
    }
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
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
  }, []);
  
  // Envia la peticion al backend para guardar los datos
  const enviarDatos = async (e) => {
    e.preventDefault();
    
    if(nombre.valido === 'true' || (contraseña.valido === 'true' && validarContraseña() === true) || 
      correo.valido === 'true' || telefono.valido === 'true' || realizados.valido === 'true' || 
      descripcion.valido === 'true' || experiencia.valido === 'true' || selectedImage){
      let imagen = '';

      if(selectedImage){
        const formData = new FormData();
        formData.append('file', añadeFoto.current.files[0]);
        formData.append("upload_preset", "HomeHub");
        formData.append("api_key", "453363773865368");
        formData.append("timestamp", (Date.now() / 1000) | 0);

        const response = await fetch('https://api.cloudinary.com/v1_1/dyydtpzbg/image/upload', {
          method: "POST",
          body: formData,
        });

        if(response.ok){
          const data = await response.json();
          imagen = data.secure_url;
        } else {
          throw new Error(`Error en guardar imagen: ${response.status} ${response.statusText}`);
        }
      }

      fetch(`http://localhost:8000/gestionar-perfil/${usuario.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: nombre.campo,
          password: contraseña.campo,
          email: correo.campo,
          phone: telefono.campo,
          descripcion: descripcion.campo,
          aniosexp: experiencia.campo,
          proyectosrea: realizados.campo,
          fotoperfil: imagen }),
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
        setNombre({campo: '', valido: null});
        setCorreo({campo: '', valido: null});
        setContraseña({campo: '', valido: null});
        setContraseña2({campo: '', valido: null});
        setTelefono({campo: '', valido: null});
        setRealizados({campo: '', valido: null});
        setDescripcion({campo: '', valido: null});
        setExperiencia({campo: '', valido: null});
        setFormularioValido(null);
        Swal.fire({
          icon: "success",
          title: "Se gestionó tu perfil Exitosamente",
        });
      })
      .catch(error => {
        // Manejar errores de la solicitud aquí
        console.error('Error en la solicitud:', error);
      });
          
    } else {
      setFormularioValido(false);
    }
  };

  return(
    <div className='paginaEditarPerfil'>

      <form className='contenedoEditarPerfil' onSubmit={enviarDatos}>
        <div className='encabezado'>
          <input
            type='file'
            accept='image/*'
            ref={añadeFoto}
            placeholder='h1'
            title='h1'
            style={{display: 'none'}}
            onChange={handleFileChange} 
          />

          <div className='contenedorFt' title='Cambiar foto de perfil' onClick={() => {añadeFoto.current.click()}}>
            {usuario.fotoperfil ? (<img src={usuario.fotoperfil} alt='' className='foto'/>) : 
            (selectedImage ? <img src={selectedImage} alt='' className='foto'/> : <div className='fotoperfil'>Foto de Perfil</div>)}
          </div>

          <h1 className='tituloEditarPerfil'>Gestionar Perfil</h1>
        </div>

        <div className='contenedorFormulario'>

          <fieldset className='DatosPersonales'> <legend>Datos Personales</legend>

            <div>
              <p className='labelUsuario'>Usuario</p>
              <input 
                id='i1'
                type='text' 
                className='inputUsuario' 
                title='usuario' 
                placeholder={usuario ? usuario.username : ''} 
                readOnly
              />
            </div>
            <Inputs
              id='i2'
              place={usuario.name}
              estado={nombre}
              autocom='username'
              cambiarEstado={setNombre}
              tipo='text'
              texto='Cambiar Nombre'
              error='campo invalido.'
              expresionRegular={expresiones.credenciales}
              valido={nombre.valido}
            />
            <Inputs
              id='i3'
              place='********'
              autocom='new-password'
              estado={contraseña}
              cambiarEstado={setContraseña}
              tipo='password'
              texto='Cambiar contraseña'
              error='la contraseña debe ser de 4 a 12 digitos'
              expresionRegular={expresiones.contraseña}
              valido={contraseña.valido}
            />
            <Inputs
              id='i4'
              place='********'
              autocom='new-password'
              estado={contraseña2}
              cambiarEstado={setContraseña2}
              tipo='password'
              texto='Confirmar contraseña'
              error='Campo invalido'
              funcion={validarContraseña}
              valido={contraseña2.valido}
            />
            <Inputs
              id='i5'
              place={usuario.email}
              estado={correo}
              cambiarEstado={setCorreo}
              tipo='email'
              texto='Cambiar correo'
              error='Campo invalido'
              expresionRegular={expresiones.correo}
              valido={correo.valido}
            />
            <Inputs
              id='i6'
              place={usuario.phone}
              estado={telefono}
              cambiarEstado={setTelefono}
              tipo='tel'
              texto='Cambiar telefono'
              error='Campo invalido'
              expresionRegular={expresiones.telefono}
              valido={telefono.valido}
            />

          </fieldset>

          <fieldset className='DatosLaborales'> <legend>Datos Laborales</legend>

            <Inputs
              id='i7'
              place={usuario.descripcionemp}
              estado={descripcion}
              cambiarEstado={setDescripcion}
              tipo='text'
              texto='Descripción de la empresa'
              error='Campo invalido'
              expresionRegular={expresiones.credenciales}
              valido={descripcion.valido}
            />
            <Inputs
              id='i8'
              place={usuario.aniosexp}
              estado={experiencia}
              cambiarEstado={setExperiencia}
              tipo='text'
              texto='Años de experiencia'
              error='Solo deben ser numeros'
              expresionRegular={expresiones.numeros}
              valido={experiencia.valido}
            />
            <Inputs
              id='i9'
              place={usuario.proyectosrea}
              estado={realizados}
              cambiarEstado={setRealizados}
              tipo='text'
              texto='Número de proyectos realizados'
              error='Solo deben ser numeros'
              expresionRegular={expresiones.numeros}
              valido={realizados.valido}
            />
          </fieldset>
        </div>
        
        <input className='btn-editar' type='submit' value='Confirmar'/>

        {formularioValido === false && <div id='mensajeError'><p>Debes llenar algun campo para editar</p></div>}

      </form>
    </div>
  );
}

export default Gestionarperfil;