import Inputs from '../componentes/Inputs.jsx';
import '../hojasEstilos/Editarperfil.css';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function Editarperfil() {
    // Para editar tu perfil
    const [nombre, setNombre] = useState({campo: '', valido: null});
    const [contraseña, setContraseña] = useState({campo: '', valido: null});
    const [contraseña2, setContraseña2] = useState({campo: '', valido: null});
    const [correo, setCorreo] = useState({campo: '', valido: null});
    const [telefono, setTelefono] = useState({campo: '', valido: null});
    const [usuario, setUsuario] = useState('');

    const expresiones = {
      credenciales: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // letras mayus y minus
      correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      telefono: /^\d{10,10}$/, // si o si 10 numeros
      contraseña: /^.{4,12}$/, // de 4 a 12 caracteres
    };

    
  const validarContraseña = () => {
    if(contraseña.campo.length > 0){
      if(contraseña.campo !== contraseña2.campo){
          return false;
      } else {
          return true;
      }
    }
  };

  useEffect(() => {
    // Aquí obtén tu token JWT de alguna manera (por ejemplo, desde localStorage)
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // Divide el token en sus partes: encabezado, carga útil y firma
        const [encabezadoBase64, cargaUtilBase64, firma] = token.split('.');
        console.log(encabezadoBase64, firma);

        // Decodifica la carga útil (segunda parte del token)
        const cargaUtilDecodificada = atob(cargaUtilBase64);

        // Convierte la carga útil decodificada a un objeto JavaScript
        const usuario = JSON.parse(cargaUtilDecodificada);
            
        // Puedes establecer el usuario en el estado
        console.log(usuario);
        setUsuario(usuario.userId.username); 
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
  }, []);
    
  const editarDatos = (e) => {
    e.preventDefault();
    
    if(nombre.valido === 'true' && contraseña.valido === 'true' && validarContraseña() === true && 
        correo.valido === 'true' && telefono.valido === 'true'){
          Swal.fire({
            icon: "success",
            title: "Perfil editada con exito",
            showConfirmButton: false,
            allowOutsideClick: true,
            allowEnterKey: true,
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
    <div className='paginaEditarPerfil'>
      
      <form className='contenedoEditarPerfil'>

        <h1 className='tituloEditarPerfil'>Editar Perfil</h1>
        <div className='contenedorInputs' onSubmit={editarDatos}>
          
          <div>
            <p className='labelUsuario'>Usuario</p>
            <input className='inputUsuario' value={usuario} readOnly/>
          </div>

          <Inputs
            estado={nombre}
            cambiarEstado={setNombre}
            tipo='text'
            texto='Cambiar Nombre'
            error='campo invalido.'
            expresionRegular={expresiones.credenciales}
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

      </form>
    </div>
  );
}

export default Editarperfil;