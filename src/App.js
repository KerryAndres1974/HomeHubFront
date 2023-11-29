import Proyecto from './componentes/Proyectos.jsx';
import { useAuth } from './Auth/AuthProvider.jsx';
import videoBg from './multimedia/videofondo.mp4';
import { Outlet, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

export function App() {
  const auth = useAuth();
  const logeado = () => !!auth.login();
  const [usuario, setUsuario] = useState(null);
  const [proyecto, setProyecto] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);

  const deslogeado = () => {
    window.location.reload();
    setMenuVisible(false);
    auth.logout();
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

  const handleClick = (event) => {
    event.preventDefault();

    // Obtiene el hash de la URL del enlace
    const targetId = event.currentTarget.getAttribute('href').substring(1);

    // Encuentra el elemento con el id correspondiente
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Realiza el desplazamiento suave
      targetElement.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    const cargarProyectos = async () => {
        try {
            const response = await fetch(`http://localhost:8000/all-proyectos-activos`);

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

    cargarProyectos(); // Llama a la función aquí

  }, []);

  useEffect(() => {}, [proyecto]);

  return (
    <div className='contenedorPrincipal'>
      <header>
        <nav className='navegador'>
          <div className='contenedor'>
            <div className='titulo'>Home Hub</div>
            <ul className='menu'>
              <li className='contenidoPestaña'><a href='#seccion1' className='pestaña' onClick={handleClick}>Inicio</a></li>
              <li className='contenidoPestaña'><a href='#seccion2' className='pestaña' onClick={handleClick}>Nosotros</a></li>
              <li className='contenidoPestaña'><a href='#seccion3' className='pestaña' onClick={handleClick}>Servicios</a></li>
            </ul>
          </div>
          
          {logeado() === false && <div className='contenedor'>
            <ul className='menu'>
              <li className='contenidoPestaña'><Link to="/Ingreso" className='pestaña' >Ingresar</Link></li>
              <li className='contenidoPestaña'><Link to="/Registro" className='pestaña' >Registrarse</Link></li>
            </ul>
          </div>}
          
          {logeado() === true && <div className='contenedor'>
            <img
              src={require('./multimedia/menu.png')}
              alt='menu'
              className='imagenMenu'
              onClick={toggleMenu}
            />
          </div>}
          
        </nav>

        {menuVisible && <ul className='menuVertical'>
          <Link to="/Editar-perfil" className='pestaña'>Editar Perfil</Link>
          <Link to="/Completar-perfil" className='pestaña'>Completar Perfil</Link>
          <Link to="/Mis-publicaciones" className='pestaña'>Mis Publicaciones</Link>
          <Link to="/Publicar-inmueble" className='pestaña'>Publicar Inmueble</Link>
          <Link to="/" onClick={deslogeado} className='pestaña'>Salir</Link>
        </ul>}

        <Outlet />
      </header>

      <section className='SeccionHome' id='seccion1'>
        
        <section className='contenedorBienvenida'>
          <video src={videoBg} autoPlay loop muted className='videoHome'/>
          <div className='contenedorApertura'> 
            <h1 className='tituloBienvenida'>{usuario ? `¡Bienvenido a Home Hub ${usuario.userId.username}!` : 
            '¡Bienvenido a Home Hub!'}</h1>
            <p className='textoBienvenida'>Hacemos realidad tus metas 
            inmobiliarias con profesionalismo y dedicación.<br/>¡Encuentra propiedades que se adaptan a tu 
            estilo de vida!</p>
          </div>
        </section>

        <section className='contenedorPropiedades'>

          <p className='lineaH' style={{margin: '20px 0 0 0'}}></p>
          <h1 className='tituloProyectos'>Proyectos para tu Familia</h1>
          <p className='lineaH'></p>
          
          <div className='contenedorProyectos'>
            {proyecto.map((proyecto) => (
              <Proyecto
                  key={proyecto.id}
                  tipo={proyecto.tipo}
                  ciudad={proyecto.ciudad}
                  precio={proyecto.precio}
                  imagen='casa1'
                  direccion={proyecto.direccion}
                  descripcion={proyecto.descripcion}
                  coincide={usuario ? (usuario.userId.id === proyecto.idusuario ? true : false) : false}
              />
            ))}
          </div>
        </section>
        
      </section>

      <section className='SeccionNosotros' id='seccion2'>
        
        <h1 className='tituloEmpresa'><br/>Home<br/>Hub</h1>
        <div className='contenedorNosotros'>

          <p className='textoNosotros'>Somos una empresa inmobiliaria comprometida en hacer realidad tus 
          sueños de hogar a través de una amplia selección de propiedades y un equipo apasionado. Nuestra 
          Misión y Visión nos guían en esta travesía hacia la creación de experiencias inolvidables. Únete 
          a nosotros para descubrir cómo transformamos tus aspiraciones de hogar en una realidad tangible.</p>
          <div className='contenedorMV'>

            <div className='parrafo'>
              <h1 className='tituloParrafo'>Misión.</h1>
              <p className='contenidoParrafo'>Nuestra Misión es facilitar el acceso a hogares que reflejen 
              los sueños y necesidades únicas de cada individuo. En Home Hub, nos enorgullece ser agentes 
              de cambio en la vida de las personas, guiándolas hacia propiedades que no solo satisfacen 
              sus necesidades habitacionales, sino que también dan vida a sus aspiraciones.</p></div>
            <div className='parrafo'>
              <h1 className='tituloParrafo'>Visión.</h1>
              <p className='contenidoParrafo'>Nuestra Visión es trascender las expectativas comunes de la 
              industria inmobiliaria. Nos visualizamos como líderes innovadores que redefinen la experiencia 
              de encontrar el hogar perfecto. Nuestra Visión va más allá de simples transacciones; aspiramos 
              a ser facilitadores de sueños, proporcionando soluciones habitacionales que marcan la 
              diferencia en la vida de las personas.</p></div>
          </div>
        </div>
      </section>

      <section className='SeccionServicios' id='seccion3'>
        
        <h1 className='tituloServicios'>Home Hub te ofrece Servicios como:</h1>
        <div className='contenedorServicios'>

          <div className='subcontenedorServicios'>
            <h1 className='subtituloServicio'>Compra de Propiedades</h1>
            <p className='parrafoServicios' style={{background: '#94a7b9'}} >Home Hub facilita el proceso de compra de propiedades, 
            conectando a compradores con las mejores opciones del mercado. Nuestro equipo de expertos 
            en bienes raíces se encarga de evaluar y presentar propiedades que se ajusten a tus criterios 
            y necesidades.</p>
          </div>
          <div className='subcontenedorServicios'>
            <h1 className='subtituloServicio'>Venta de Propiedades</h1>
            <p className='parrafoServicios' style={{background: '#7a8f9f'}} >Si estás buscando vender tu propiedad, Home Hub ofrece 
            servicios de intermediación para maximizar la visibilidad de tu inmueble en el mercado. 
            Nos encargamos de promocionar tu propiedad, gestionar las negociaciones y cerrar acuerdos 
            beneficiosos para ti como vendedor.</p>
          </div>
          <div className='subcontenedorServicios'>
            <h1 className='subtituloServicio'>Gestion de Propiedades</h1>
            <p className='parrafoServicios' style={{background: '#61778a'}} >Para propietarios que desean ofrecer sus propiedades sin 
            preocupaciones, ofrecemos servicios de gestión de propiedades. Esto incluye mantenimiento 
            del inmueble, coordinación de pagos y solución de problemas cotidianos, permitiendo a los 
            propietarios disfrutar de sus inversiones sin complicaciones.</p>
          </div>
          <div className='subcontenedorServicios'>
            <h1 className='subtituloServicio'>Asesoramiento Financiero</h1>
            <p className='parrafoServicios' style={{background: '#475a6d'}} >En Home Hub, entendemos que la inversión en bienes raíces 
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