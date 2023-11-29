import Inputs from '../componentes/Inputs.jsx';
import '../hojasEstilos/Publicar.css';
import { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';

function Mispublicaiones() {
  // Para publicar tu inmueble - agregar correo
  const [descripcion, setDescripcion] = useState({campo: '', valido: null});
  const [direccion, setDireccion] = useState({campo: '', valido: null});
  const [nombre, setNombre] = useState({campo: '', valido: null});
  const [precio, setPrecio] = useState({campo: '', valido: null});
  const [ciudad, setCiudad] = useState('Ciudad');
  const [tipo, setTipo] = useState('Tipo');
  const añadirFoto = useRef(null);
  const [usuario, setUsuario] = useState('');

  const [binaryImageData, setBinaryImageData] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [cuentaImagenes, setCuentaImagenes] = useState(0);
  const [mensajeError, setMensajeError] = useState(null);
  
  const expresiones = {
    precio: /^[0-9]+$/, //precios monetarios
    direccion: /^[a-zA-ZÀ-ÿ0-9\s#-]{1,40}$/, //letras, numeros, # y -
    credenciales: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // letras mayus y minus
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{10,10}$/, // si o si 10 numeros
    contraseña: /^.{4,12}$/, // de 4 a 12 caracteres
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
  
    if (selectedFile) {
      if (selectedImages.length < 5) {
        const reader = new FileReader();
  
        reader.onloadend = () => {
          // `result` contendrá los datos binarios de la imagen
          const binaryData = reader.result;
          // Aquí puedes realizar las operaciones que desees con los datos binarios
  
          // Agregar la representación de bytes a tu estado o realizar otras operaciones
          setBinaryImageData((prevData) => [...prevData, binaryData]);
  
          // Si necesitas mostrar la imagen en tu interfaz de usuario, puedes convertir los datos binarios a una URL
          const imageUrl = URL.createObjectURL(selectedFile);
          setSelectedImages((prevImages) => [...prevImages, imageUrl]);
          setCuentaImagenes(cuentaImagenes + 1);
        };
  
        // Comienza a leer el archivo como datos binarios
        reader.readAsArrayBuffer(selectedFile);
      } else {
        setMensajeError(true);
      }
    }
  };

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

  const publicarInmueble = (e) => {
    e.preventDefault();
    const propietario = usuario.userId.id;
    console.log("holaa",binaryImageData);
    console.log("adios",selectedImages);
    // let imagen = document.querySelector('.imagenS').src

    if(nombre.valido === 'true' && direccion.valido === 'true' && ciudad !== 'Ciudad' && 
    tipo !== 'Tipo' && descripcion.valido === 'true' && precio.valido === 'true' && selectedImages.length > 0){
          
      let datos = { direccion: direccion.campo,
                    descripcion: descripcion.campo,
                    ciudad: ciudad,
                    tipo: tipo,
                    precio: precio.campo,
                    nombre: nombre.campo,
                    idusuario: propietario };

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
        setNombre({campo: '', valido: null});
        setDireccion({campo: '', valido: null});
        setDescripcion({campo: '', valido: null});
        setPrecio({campo: '', valido: null});
        setCiudad('Ciudad');
        setTipo('Tipo');

        Swal.fire({
          icon: "success",
          title: "Publicado Exitosamente",
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
        text: "Debes rellenar todos los campos",
        showConfirmButton: false,
        allowOutsideClick: true,
        allowEnterKey: true,
      });
    }
  };

  return(
    <div className='paginaPublicar'>

      <section className='contenedorPublicar'>

        <div className='contenedorBotenes'>

        </div>

        <div className='contenedorImagenesPublicacion'>
          {selectedImages.map((image, index) => 
          (<img key={index} src={image} alt={`imagen-${index}`} className='imagenS' />))}

          {cuentaImagenes < 5 && <p className='imagenV'></p>}
          {mensajeError === true && <p id='mensaje-Error'>No se puede agregar más de 5 imágenes!</p>}
        </div>
        
        <form className='contenedorFormulario' onSubmit={publicarInmueble}>
          
          <p className='textoPublicar'>Publica tu propiedad en Home Hub!</p>
          <div className='contendedor-inputs'>
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
              error='Campo invalido'
              expresionRegular={expresiones.direccion}
              valido={direccion.valido}
            />

            <select className='formularioDinamico'
             value={ciudad}
             onChange={(e) => setCiudad(e.target.value)}>
              <option disabled selected=' '>Ciudad</option>
              <option>Cali</option>
              <option>Buga</option>
              <option>Tuluá</option>
              <option>Jamundí</option>
            </select>
          
          
            <select className='formularioDinamico'
             value={tipo}
             onChange={(e) => setTipo(e.target.value)}>
              <option disabled selected=' '>Tipo</option>
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
              error='Campo invalido'
              expresionRegular={expresiones.precio}
              valido={precio.valido}
            />
          </div>
          
          <div className='añadeFoto' onClick={() => añadirFoto.current.click()}>Click para añadir fotos de tu propiedad</div>

          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            style={{display: 'none'}}
            ref={(input) => (añadirFoto.current = input)} />

          <input className='btn-publicar' type='submit' value='Publicar' />

        </form>

      </section>
      
    </div>
  );
}

export default Mispublicaiones;