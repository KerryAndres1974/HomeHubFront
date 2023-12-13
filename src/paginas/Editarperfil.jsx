import Inputs from '../componentes/Inputs.jsx';
import '../hojasEstilos/Editarperfil.css';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function Editarperfil() {
  // Para editar tu perfil
  const [usuario, setUsuario] = useState('');
  const [formularioValido, setFormularioValido] = useState(null);
  const [nombre, setNombre] = useState({campo: '', valido: null});
  const [correo, setCorreo] = useState({campo: '', valido: null});
  const [telefono, setTelefono] = useState({campo: '', valido: null});
  const [contraseña, setContraseña] = useState({campo: '', valido: null});
  const [contraseña2, setContraseña2] = useState({campo: '', valido: null});

  // Expresiones para formularios
  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // letras mayus y minus
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{10,10}$/, // si o si 10 numeros
    contraseña: /^.{4,12}$/, // de 4 a 12 caracteres
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
  
  // Envia la peticion al backend para editar los datos
  const editarDatos = (e) => {
    e.preventDefault();
    
    if(nombre.valido === 'true' || (contraseña.valido === 'true' && validarContraseña() === true) || 
        correo.valido === 'true' || telefono.valido === 'true'){

          fetch(`http://localhost:8000/editar-perfil/${usuario.id}`, {
              method: 'PUT',
              body: JSON.stringify({name: nombre.campo,
                password: contraseña.campo,
                email: correo.campo,
                phone: telefono.campo}),
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
              setTelefono({campo: '', valido: null});
              setContraseña({campo: '', valido: null});
              setContraseña2({campo: '', valido: null});
              Swal.fire({
                icon: "success",
                title: "Los datos fueron editados exitosamente",
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
      
      <form className='contenedoEditarPerfil' onSubmit={editarDatos}>

        <h1 className='tituloEditarPerfil'>Editar Perfil</h1>
        <div className='contenedorInputs'>
          
          <div>
            <p className='labelUsuario'>Usuario</p>
            <input type='text' className='inputUsuario' value={usuario ? usuario.username : ''} readOnly/>
          </div>

          <Inputs
            estado={nombre}
            cambiarEstado={setNombre}
            tipo='text'
            texto='Cambiar Nombre'
            error='campo invalido.'
            expresionRegular={expresiones.nombre}
            valido={nombre.valido}
          />
          <Inputs
            estado={contraseña}
            cambiarEstado={setContraseña}
            tipo='password'
            texto='Cambiar contraseña'
            error='la contraseña debe ser de 4 a 12 digitos'
            expresionRegular={expresiones.contraseña}
            valido={contraseña.valido}
          />
          <Inputs
            estado={contraseña2}
            cambiarEstado={setContraseña2}
            tipo='password'
            texto='Confirmar contraseña'
            error='Campo invalido'
            funcion={validarContraseña}
            valido={contraseña2.valido}
          />
          <Inputs
            estado={correo}
            cambiarEstado={setCorreo}
            tipo='email'
            texto='Cambiar correo'
            error='Campo invalido'
            expresionRegular={expresiones.correo}
            valido={correo.valido}
          />
          <Inputs
            estado={telefono}
            cambiarEstado={setTelefono}
            tipo='tel'
            texto='Cambiar telefono'
            error='Campo invalido'
            expresionRegular={expresiones.telefono}
            valido={telefono.valido}
          />
        </div>
        
        <input className='btn-editar' type='submit' value='Confirmar'/>

        {formularioValido === false && <div id='mensajeError'><p>Debes llenar algun campo para editar</p></div>}

      </form>
    </div>
  );
}

export default Editarperfil;