import Inputs from '../componentes/Inputs.jsx';
import '../hojasEstilos/Miperfil.css';
import { useState, useRef } from 'react';

function Miperfil() {
  // Para publicar tu inmueble - agregar correo
  const [descripcionI, setDescripcionI] = useState({campo: '', valido: null});
  const [direccionI, setDireccionI] = useState({campo: '', valido: null});
  const [nombreI, setNombreI] = useState({campo: '', valido: null});
  const [ciudad, setCiudad] = useState({campo: '', valido: null});
  const [precio, setPrecio] = useState({campo: '', valido: null});
  const [tipo, setTipo] = useState({campo: '', valido: null});
  
  // Para completar tu perfil
  const [realizados, setRealizados] = useState({campo: '', valido: null});
  const [descripcion, setDescripcion] = useState({campo: '', valido: null});
  const [experiencia, setExperiencia] = useState({campo: '', valido: null});
  
  // Nuevos
  const [formularioValido2, cambiarFormulario2] = useState(null);
  const [formularioValido, cambiarFormulario] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const addNewPhoto = useRef(null);

  /*const validarContraseña = () => {
    if(contraseña.campo.length > 0){
      if(contraseña.campo !== contraseña2.campo){
          return false;
      } else {
          return true;
      }
    }
  }*/

  const expresiones = {
    precio: /^[0-9]+$/, //precios monetarios
    direccion: /^[a-zA-ZÀ-ÿ0-9\s#-]{1,40}$/, //letras, numeros, # y -
    credenciales: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // letras mayus y minus
    //correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    //telefono: /^\d{10,10}$/ // si o si 10 numeros
    //contraseña: /^.{4,12}$/, // de 4 a 12 caracteres
  }

  // De aqui
  const añadirFoto = (e) => {
    e.preventDefault();
    addNewPhoto.current.click();
  }

  const handleFileChange = (e, claseContenedor) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Puedes mostrar la imagen seleccionada en el elemento 'texto-add-photo'
      const imageUrl = URL.createObjectURL(selectedFile);
      const contenedor = document.getElementsByClassName(claseContenedor);
      if(contenedor){
        contenedor.src = imageUrl
      }
      setSelectedImage(imageUrl);
    }
  }
  // Hasta aqui

  const publicarInmueble = (e) => {
    e.preventDefault();
    //let imagen = document.querySelector('.imagenS').src

    console.log(direccionI.valido, descripcion.valido, ciudad.valido, tipo.valido, precio.valido)

    if(direccionI.valido === 'true' && descripcion.valido === 'true' && ciudad.valido === 'true' && 
    tipo.valido === 'true' && precio.valido === 'true' && nombreI.valido === 'true'){
          
    let datos = { nombre: nombreI.campo,
    descripcion: descripcion.campo,
    ciudad: ciudad.campo,
    tipo: tipo.campo,
    precio: precio.campo,
    direccion: direccionI.campo, }

    let datosJSON = JSON.stringify(datos);

    fetch('http://localhost:8000/crear-proyecto', {
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
      setNombreI({campo: '', valido: null});
      setDireccionI({campo: '', valido: null});
      setDescripcion({campo: '', valido: null});
      setCiudad({campo: '', valido: null});
      setTipo({campo: '', valido: null});
      setPrecio({campo: '', valido: null});
      document.querySelector('.imagenS').src = '';
      document.querySelector('.imagenS').alt = '';
      document.querySelector('.imagenS').className = '';
      cambiarFormulario(true);
    })
    .catch(error => {
      // Manejar errores de la solicitud aquí
      console.error('Errores en la solicitud:', error);
      cambiarFormulario(false);
    });
    } else {
      console.error('Error en la solicitud:');
      cambiarFormulario(false);
    }
  }

  const cambiarDatos = (e) => {
    e.preventDefault();
    console.log(descripcion.valido, experiencia.valido, realizados.valido)
    if(descripcion.valido === 'true' && experiencia.valido === 'true' && realizados.valido === 'true'){

    let imagens = document.querySelector('.imagenS').src;

    fetch('http://localhost:8000/actualiza', {
      method: 'PUT',
      body: JSON.stringify({descripcion: descripcion.campo, experiencia: experiencia.campo, proyectosrealizados: realizados.campo, imagen: imagens}),
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
      cambiarFormulario2(true);
    })
    .catch(error => {
      // Manejar errores de la solicitud aquí
      console.error('Errores en la solicitud:', error);
      cambiarFormulario2(false);
    });
      
    } else {
      cambiarFormulario2(false);
    }
  }

  return (
    <div className='paginaMiperfil'>
      
      <section className='contenedorSubirPublicacion'>

        <h1 className='textoPublicacion'>Publica tu propiedad en HomeHub</h1>
        <div className='contenedorPublicacion'>

          <div className='contenedorImagenesPublicacion'>
            {selectedImage ? (<img src={selectedImage} alt='imagenS' className='imagenS' />) : (<p className='imagenV'></p>)}
          </div>
          
          <form className='contenedorFormularioPublicacion' onSubmit={publicarInmueble}>
            <div className='contendedor-inputs'>
              <Inputs
                estado={nombreI}
                cambiarEstado={setNombreI}
                tipo='text'
                texto='Nombre'
                error='Campo invalido'
                expresionRegular={expresiones.credenciales}
                valido={nombreI.valido}
              />
              <Inputs
                estado={direccionI}
                cambiarEstado={setDireccionI}
                tipo='text'
                texto='Barrio/direccion'
                error='Campo invalido'
                expresionRegular={expresiones.direccion}
                valido={direccionI.valido}
              />
              <Inputs
                estado={descripcionI}
                cambiarEstado={setDescripcionI}
                tipo='text'
                texto='Descripción'
                error='Campo invalido'
                expresionRegular={expresiones.direccion}
                valido={descripcionI.valido}
              />
              <Inputs
                estado={ciudad}
                cambiarEstado={setCiudad}
                tipo='text'
                texto='Ciudad'
                error='Campo invalido'
                expresionRegular={expresiones.credenciales}
                valido={ciudad.valido}
              />
              <Inputs
                estado={tipo}
                cambiarEstado={setTipo}
                tipo='text'
                texto='Tipo'
                error='Campo invalido'
                expresionRegular={expresiones.credenciales}
                valido={tipo.valido}
              />
              <Inputs
                estado={precio}
                cambiarEstado={setPrecio}
                tipo='text'
                texto='Precio'
                error='Campo invalido'
                expresionRegular={expresiones.precio}
                valido={precio.valido}
              />
            </div>

            <p className='texto-add-photo'>Click para añadir una foto de tu propiedad</p>
            <div className='add-photo' onClick={añadirFoto}>
              <span><img src={require('../multimedia/photo.png')} alt='icono'/></span>
            </div>

            <input
              type='file'
              className='add-photo-container'
              ref={addNewPhoto}
              style={{display: 'none'}}
              onChange={(e) => handleFileChange(e, 'contenedor-imagenes-publicacion')} />

            <input className='btn-publicar' type='submit' value='Publicar' />

            {formularioValido === false && 
              <p id='mensajeError'>Debes llenar todos los campos</p>}

            {formularioValido === true && <div id='mensaje-Exito' >
                <p>Se publico exitosamente</p>
            </div>}

          </form>

        </div>
        
      </section>

      <p className='lineaH1'></p>

      <section className='contenedorCompletarPerfil'>

        <form className='contenedor-perfil' onSubmit={cambiarDatos}>
          <p className='textoPublicacion'>Completar mi Perfil</p>
          <button className='fotoPerfil' onClick={añadirFoto} >
            {selectedImage ? (<img src={selectedImage} alt='imagenP' className='imagenP' />) : 'Cambiar Foto de Perfil'}
          </button>
          <div>
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
          </div>

          <input
            type='file'
            className='add-photo-container'
            ref={addNewPhoto}
            style={{display: 'none'}}
            onChange={(e) => handleFileChange(e, 'fotoPerfil')} />

          <input className='btn-editar' type='submit' value='Confirmar'/>

          {formularioValido2 === false && <div id='mensajeError'>
              <p><b>Error: </b>Por favor completa el formulario correctamente</p>
          </div>}

          {formularioValido === true && <div id='mensaje-Exito' >
              <p>Se guardaron los cambios exitosamente</p>
          </div>}

        </form>

      </section>

    </div>
  );
}

export default Miperfil;