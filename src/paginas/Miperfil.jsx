import Inputs from '../componentes/Inputs.jsx';
import '../hojasEstilos/Miperfil.css';
import { useState } from 'react';
import { useRef } from 'react';

function Miperfil() {
  // Para publicar tu inmueble - agregar correo
  const [descripcion, setDescripcion] = useState({campo: '', valido: null});
  const [direccion, setDireccion] = useState({campo: '', valido: null});
  const [correo, setCorreo] = useState({campo: '', valido: null});
  const [precio, setPrecio] = useState({campo: '', valido: null});
  const [formularioValido2, cambiarFormulario2] = useState(null);
  const [formularioValido, cambiarFormulario] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const addNewPhoto = useRef(null);

  // Para editar tu perfil
  const [nombre, setNombre] = useState({campo: '', valido: null});
  const [apellido, setApellido] = useState({campo: '', valido: null});
  const [telefono, setTelefono] = useState({campo: '', valido: null});
  const [contraseña, setContraseña] = useState({campo: '', valido: null});
  const [contraseña2, setContraseña2] = useState({campo: '', valido: null});

  const validarContraseña = () => {
    if(contraseña.campo.length > 0){
      if(contraseña.campo !== contraseña2.campo){
          return false;
      } else {
          return true;
      }
    }
  }

  const expresiones = {
    precio: /^[0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{1,2})?$/, //precios monetarios
    direccion: /^[a-zA-ZÀ-ÿ0-9\s#-]{1,40}$/, //letras, numeros, # y -
    credenciales: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // letras mayus y minus
    contraseña: /^.{4,12}$/, // de 4 a 12 caracteres
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{10,10}$/ // si o si 10 numeros
  }

  const añadirFoto = (e) => {
    e.preventDefault();
    addNewPhoto.current.click();
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Puedes mostrar la imagen seleccionada en el elemento 'texto-add-photo'
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(imageUrl);
    }
  }

  const publicarInmueble = (e) => {
    e.preventDefault();
    let imagen = document.querySelector('.add-photo-container').value

    if(precio.valido === 'true' &&
        direccion.valido === 'true' &&
        descripcion.valido === 'true' && imagen !== ''){
      cambiarFormulario(true)
    } else {
      cambiarFormulario(false)
    }
  }

  const cambiarDatos = (e) => {
    e.preventDefault();

    if(nombre.valido === 'true' && contraseña.valido === 'true' && 
    validarContraseña === true && telefono.valido === 'true' &&
    correo.valido === 'true' && apellido.valido === 'true' && direccion.valido === 'true'){
      cambiarFormulario2(true);
    } else {
      cambiarFormulario2(false);
    }
  }

  return (
    <div className='pagina-miperfil'>
      
      <section className='contenedorSubirPublicacion'>

        <div className='contenedor-publicacion'>
          <p className='textoPublicacion'>Publica tu propiedad en HomeHub</p>
          <div className='contenedor-imagenes-publicacion'>
            {selectedImage ? (<img src={selectedImage} alt='imagenS' className='imagenS' />) : ''}
          </div>
        </div>
        
        <form className='contenedor-formulario-publicacion' onSubmit={publicarInmueble}>
          <Inputs
            estado={direccion}
            cambiarEstado={setDireccion}
            tipo='text'
            texto='Barrio/Direccion'
            error='Campo invalido'
            expresionRegular={expresiones.direccion}
            valido={direccion.valido}
          />
          <Inputs
            estado={descripcion}
            cambiarEstado={setDescripcion}
            tipo='text'
            texto='Descripcion de tu propiedad'
            error='Campo invalido'
            expresionRegular={expresiones.credenciales}
            valido={descripcion.valido}
          />
          <Inputs
            estado={precio}
            cambiarEstado={setPrecio}
            tipo='text'
            texto='Precio de tu propiedad'
            error='Campo invalido'
            expresionRegular={expresiones.precio}
            valido={precio.valido}
          />
          <Inputs
            estado={correo}
            cambiarEstado={setCorreo}
            tipo='email'
            texto='Correo de contacto'
            error='Campo invalido'
            expresionRegular={expresiones.correo}
            valido={correo.valido}
          />

          <p className='texto-add-photo'>Click para añadir una foto de tu propiedad</p>
          <div className='add-photo' onClick={añadirFoto}>
            <span><img src={require('../multimedia/photo.png')} alt='icono'/></span>
          </div>

          <input
            type='file'
            className='add-photo-container'
            ref={addNewPhoto}
            style={{display: 'none'}}
            onChange={handleFileChange} />

          <input className='btn-publicar' type='submit' value='Publicar' />

          {formularioValido === false && 
            <p id='mensajeError'>Debes llenar todos los campos</p>}
        </form>
        
      </section>

      <p className='lineaH1'></p>

      <section className='contenedorCompletarPerfil'>

        <p className='textoPublicacion'>Completar mi Perfil</p>

        <form className='contenedor-perfil' onSubmit={cambiarDatos}>
          <div className='contenedor-inputs'>
            <Inputs
              estado={nombre}
              cambiarEstado={setNombre}
              tipo='text'
              texto='Cambiar Nombre'
              error='Campo invalido'
              expresionRegular={expresiones.credenciales}
              valido={nombre.valido}
            />
            <Inputs
              estado={contraseña}
              cambiarEstado={setContraseña}
              tipo='password'
              texto='Cambiar Contraseña'
              error='Campo invalido'
              expresionRegular={expresiones.contraseña}
              valido={contraseña.valido}
            />
            <Inputs
              estado={contraseña2}
              cambiarEstado={setContraseña2}
              tipo='password'
              texto='Confirmar Contraseña'
              error='Campo invalido'
              funcion={validarContraseña}
              valido={contraseña.valido}
            />
            <Inputs
              estado={telefono}
              cambiarEstado={setTelefono}
              tipo='tel'
              texto='Cambiar Telefono'
              error='Campo invalido'
              expresionRegular={expresiones.telefono}
              valido={telefono.valido}
            />
            <Inputs
              estado={correo}
              cambiarEstado={setCorreo}
              tipo='email'
              texto='Cambiar Correo'
              error='Campo invalido'
              expresionRegular={expresiones.correo}
              valido={correo.valido}
            />
            <Inputs
              estado={apellido}
              cambiarEstado={setApellido}
              tipo='text'
              texto='Apellido'
              error='Campo invalido'
              expresionRegular={expresiones.credenciales}
              valido={apellido.valido}
            />
            <Inputs
              estado={direccion}
              cambiarEstado={setDireccion}
              tipo='text'
              texto='Direccion'
              error='Campo invalido'
              expresionRegular={expresiones.direccion}
              valido={direccion.valido}
            />

            <button className='btn-editar' onClick={añadirFoto} >
              Cambiar Foto de Perfil
            </button>

            <input
              type='file'
              className='add-photo-container'
              ref={addNewPhoto}
              style={{display: 'none'}}
              onChange={handleFileChange} />

            <input className='btn-editar' type='submit' value='Confirmar'/>

          </div>

          {formularioValido2 === false && <div id='mensajeError'>
              <p><b>Error: </b>Por favor completa el formulario correctamente</p>
          </div>}

        </form>

      </section>

    </div>
  );
}

export default Miperfil;