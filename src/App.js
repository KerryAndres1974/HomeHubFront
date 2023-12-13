import Proyecto from './componentes/Proyectos.jsx';
import { useAuth } from './Auth/AuthProvider.jsx';
import videoBg from './multimedia/videofondo.mp4';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './App.css';

export function App() {
  const auth = useAuth();
  const goTo = useNavigate();
  const logeado = () => !!auth.login();
  const [usuario, setUsuario] = useState(null);
  const [proyecto, setProyecto] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [fase, setFase] = useState(1);
  const [mensaje, setMensaje] = useState('');
  const [listaMensaje, setListaMensaje] = useState([]);
  const [listaCorreo, setListaCorreo] = useState([]);
  
  const mensajeRef = useRef(null);
  const menuRef = useRef(null);
  
  const [bandejaVisible, setBandejaVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  
  const deslogeado = () => {
    window.location.reload();
    setMenuVisible(false);
    auth.logout();
  };
  
  const handleClick = (e) => {
    e.preventDefault();

    // Obtiene el hash de la URL del enlace
    const targetId = e.currentTarget.getAttribute('href').substring(1);

    // Encuentra el elemento con el id correspondiente
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Realiza el desplazamiento suave
      targetElement.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };
  
  const editarProyecto = (Propietario, Usuario, idProyecto) => {
    
    if(Propietario === Usuario){
      goTo(`/Mis-publicaciones/Editar-inmueble/${idProyecto}`);
    } else {
      goTo(`/Detalles-inmueble/${idProyecto}`);
    }
  };
  
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const toggleMessage = () => {
    setBandejaVisible(!bandejaVisible);
    const cargarMensajes = async () => {
      try {
        const response = await fetch(`http://localhost:8000/obtener-asesorias/${usuario.id}`);

            if(response.ok){
                const data = await response.json();
                setListaCorreo(data);
            } else {
                console.error('Error al obtener los correos:', response.statusText);
            }
        } catch (error) {
            console.error('Error al realizar la petición:', error);
        }
    };
    cargarMensajes();
  }

  useEffect(() => {
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

    // Ajustes del encabezado
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 550) { // Ajusta este valor según tus necesidades
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Abre y cierra la bandeja de mensajes y opciones
    const handleClickOutside1 = (e) => {
      if(menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuVisible(false);
      }
    };

    const handleClickOutside2 = (e) => {
      if(mensajeRef.current && !mensajeRef.current.contains(e.target)) {
        setBandejaVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside1);
    document.addEventListener('mousedown', handleClickOutside2);

    return(() => {
      document.addEventListener('mousedown', handleClickOutside1);
      document.addEventListener('mousedown', handleClickOutside2);
      window.removeEventListener('scroll', handleScroll);
    });
  }, []);
  
  useEffect(() => {
    const cargarProyectos = async () => {
      try {
        const response = await fetch('http://localhost:8000/all-proyectos-activos');

            if(response.ok){
                const data = await response.json();
                setProyecto(data);
            } else {
                console.error('Error al obtener los proyectos:', response.statusText);
            }
        } catch (error) {
            console.error('Error al realizar la petición:', error);
        }
    };
    cargarProyectos();

  }, []);

  useEffect(() => {}, [proyecto]);
  
  return (
    <div className='contenedorPrincipal'>
      
      <header className={scrolled ? 'changed' : ''}>
        <div className='contenedor1'>
          <div className='titulo'>Home Hub</div>
          <ul className='menu'>
            <li className='contenidoPestaña'><a href='#seccion1' className='pestaña' onClick={handleClick}>Inicio</a></li>
            <li className='contenidoPestaña'><a href='#seccion3' className='pestaña' onClick={handleClick}>Nosotros</a></li>
            <li className='contenidoPestaña'><a href='#seccion4' className='pestaña' onClick={handleClick}>Servicios</a></li>
          </ul>
        </div>
        
        {logeado() === false && <div className='contenedor2'>
          <ul className='menu'>
            <li className='contenidoPestaña'><Link to="/Ingreso" className='pestaña' >Ingresar</Link></li>
            <li className='contenidoPestaña'><Link to="/Registro" className='pestaña' >Registrarse</Link></li>
          </ul>
        </div>}
        
        {logeado() === true && <div className='contenedorIconos'>
          <img 
            src={require('./multimedia/message.png')}
            alt='mensaje'
            className='imagenMensaje'
            onClick={toggleMessage}
          />
          <img
            src={require('./multimedia/menu.png')}
            alt='menu'
            className='imagenMenu'
            onClick={toggleMenu}
          />
          </div>}

        {menuVisible && <ul className='menuVertical' ref={menuRef}>
          <Link to="/Editar-perfil" className='pestaña' >Editar Perfil</Link>
          <Link to="/Completar-perfil" className='pestaña' >Completar Perfil</Link>
          <Link to="/Mis-publicaciones" className='pestaña' >Mis Publicaciones</Link>
          <Link to="/Publicar-inmueble" className='pestaña' >Publicar Inmueble</Link>
          <Link to="/" onClick={deslogeado} className='pestaña' >Salir</Link>
        </ul>}

        {bandejaVisible && <div className='bandejaEntrada' ref={mensajeRef}>

          {listaCorreo.map((mensaje) => (
            fase === 1 && <div className='contenedorMensaje' key={mensaje.id} onClick={() => {setFase(2)}}>
              <div className='detalleMensaje'>
                <h1 className='nombreRemitente'>{mensaje.nombreremi}</h1>
                <p className='mensajeR'>{mensaje.mensaje}</p>  
              </div>
            </div>
          ))}

          {fase === 2 && <div className='mensajeria'>

            <div className='accionRemitente'>
              <img
                src={require('./multimedia/regresar.png')}
                alt='regresar'
                className='imagenRegresar'
                onClick={() => {setFase(1)}} />
                
              <p className='fotoRemitente'>image</p>
              <h1 className='nombreRemitente'>Remitente</h1>
            </div>

            <div className='Todosmensajes'>

              <div className='elMensaje'>Estos son solo algunos ejemplos. Puedes encontrar varias 
                herramientas en línea y comandos que generan automáticamente texto de "Lorem Ipsum" con 
                diferentes opciones de personalización. Ajusta según tus necesidades y preferencias.
              </div>

              {listaMensaje.map((lstring, linumber) => 
                <div className='elMensaje' key={`li_${linumber}`}>
                  {lstring}
                </div>)}
              
            </div>
            <form className='contenedorEnvio' onSubmit={(e) => {e.preventDefault()}}>
              <textarea
                className='inputMensaje'
                placeholder='Escribe un mensaje...'
                value={mensaje}
                onChange={(e) => {setMensaje(e.target.value)}} />
              <input
                type='submit'
                value='Enviar'
                className='btn-enviarMensaje' 
                onClick={() => {setListaMensaje([...listaMensaje, mensaje]); setMensaje('')}}/>
            </form>

          </div>}
        </div>}
      </header>

      <section className='SeccionHome' id='seccion1'>
        
        <section className='contenedorBienvenida'>
          <video src={videoBg} autoPlay loop muted className='videoHome'/>
          <div className='contenedorApertura'> 
            <h1 className='tituloBienvenida'>{usuario ? `¡Bienvenido a Home Hub ${usuario.username}!` : 
            '¡Bienvenido a Home Hub!'}</h1>
            <p className='textoBienvenida'>Hacemos realidad tus metas inmobiliarias con profesionalismo 
              y dedicación.<br/>¡Encuentra propiedades que se adaptan a tu estilo de vida!
            </p>
          </div>

          {/*<div className='btn-botones'>
            <input type='text' placeholder='Buscar x Nombre'/>

            <select value='Ciudad'>
              <option disabled >Ciudad</option>
              <option>Cali</option>
              <option>Buga</option>
              <option>Tuluá</option>
              <option>Jamundí</option>
            </select>

            <select value='Tipo'>
              <option disabled >Tipo</option>
              <option>Casa</option>
              <option>Apartamento</option>
            </select>
          </div>*/}
        </section>
        
      </section>

      <section className='SeccionPropiedades' id='seccion2'>
      
        <section className='contenedorPropiedades'>
          <p className='lineaH' style={{margin: '20px 0 0 0'}}></p>
          <h1 className='tituloProyectos'>Proyectos para tu Familia</h1>
          <p className='lineaH'></p>
          
          <div className='contenedorFamiliaProyectos'>
            {proyecto.map((proyecto) => (
              <div className='contenedorXProyecto' onClick={() => 
              {usuario ? editarProyecto(proyecto.idusuario, usuario.id, proyecto.id) : 
                goTo(`/Detalles-inmueble/${proyecto.id}`)}} key={proyecto.id}>
                <Proyecto
                    nombre={proyecto.nombre}
                    tipo={proyecto.tipo}
                    ciudad={proyecto.ciudad}
                    precio={proyecto.precio}
                    imagen={proyecto.imagen}
                    direccion={proyecto.direccion}
                    descripcion={proyecto.descripcion}
                    coincide={usuario ? (usuario.id === proyecto.idusuario ? true : false) : false}
                />
              </div>
            ))}
          </div>
        </section>

      </section>

      <section className='SeccionNosotros' id='seccion3'>
        
        <p className='contenidoParrafo'><h1 className='tituloParrafo' style={{margin: '0 0 5px 0'}}>Misión.</h1>
        Nuestra Misión es facilitar el acceso a hogares que reflejen 
        los sueños y necesidades únicas de cada individuo. En Home Hub, nos enorgullece ser agentes 
        de cambio en la vida de las personas, guiándolas hacia propiedades que no solo satisfacen 
        sus necesidades habitacionales, sino que también dan vida a sus aspiraciones.</p>

        <h1 className='tituloEmpresa'><br/>Home<br/>Hub</h1>
      
        <p className='contenidoParrafo'><h1 className='tituloParrafo' style={{margin: '0 0 5px 0'}}>Visión.</h1>
        Nuestra Visión es trascender las expectativas comunes de la 
        industria inmobiliaria. Nos visualizamos como líderes innovadores que redefinen la experiencia 
        de encontrar el hogar perfecto. Nuestra Visión va más allá de simples transacciones; aspiramos 
        a ser facilitadores de sueños, proporcionando soluciones habitacionales que marcan la 
        diferencia en la vida de las personas.</p>
        
      </section>

      <section className='SeccionServicios' id='seccion4'>
        
        <h1 className='tituloServicios'>Home Hub te ofrece Servicios como:</h1>
        <div className='contenedorServicios'>

          <div className='subcontenedorServicios'>
            <h1 className='subtituloServicio'>Compra de Propiedades</h1>
            <p className='parrafoServicios'  >Home Hub facilita el proceso de compra de propiedades, 
            conectando a compradores con las mejores opciones del mercado. Nuestro equipo de expertos 
            en bienes raíces se encarga de evaluar y presentar propiedades que se ajusten a tus criterios 
            y necesidades.</p>
          </div>
          <div className='subcontenedorServicios'>
            <h1 className='subtituloServicio'>Venta de Propiedades</h1>
            <p className='parrafoServicios'  >Si estás buscando vender tu propiedad, Home Hub ofrece 
            servicios de intermediación para maximizar la visibilidad de tu inmueble en el mercado. 
            Nos encargamos de promocionar tu propiedad, gestionar las negociaciones y cerrar acuerdos 
            beneficiosos para ti como vendedor.</p>
          </div>
          <div className='subcontenedorServicios'>
            <h1 className='subtituloServicio'>Gestion de Propiedades</h1>
            <p className='parrafoServicios'  >Para propietarios que desean ofrecer sus propiedades sin 
            preocupaciones, ofrecemos servicios de gestión de propiedades. Esto incluye mantenimiento 
            del inmueble, coordinación de pagos y solución de problemas cotidianos, permitiendo a los 
            propietarios disfrutar de sus inversiones sin complicaciones.</p>
          </div>
          <div className='subcontenedorServicios'>
            <h1 className='subtituloServicio'>Asesoramiento Financiero</h1>
            <p className='parrafoServicios'  >En Home Hub, entendemos que la inversión en bienes raíces 
            es una decisión financiera importante. Ofrecemos servicios de asesoramiento financiero 
            para ayudarte a tomar decisiones informadas sobre la compra, venta o inversión en propiedades.</p>
          </div>
        </div>

      </section>

      <footer className='piePagina'>
        <div className='contenedorPie'>
          <p className='textoPie'>Contactanos</p>
          <p className='rutaPie'>HomeHub@gmail.com</p>
        </div>
        <div className='lineaV'></div>
        <div className='contenedorPie'>
          <p className='textoPie'>Encuentranos</p>
          <p className='rutaPie'>Barrio Principe</p>
        </div>
        <div className='lineaV'></div>
        <div className='contenedorPie'>
          <p className='textoPie'>Siguenos En</p>
          <p className='rutaPie'>Facebook</p>
          <p className='rutaPie'>Instagram</p>
          <p className='rutaPie'>Twitter</p>
        </div>
      </footer>

    </div>
  );
}

export default App;