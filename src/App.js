import Proyecto from './componentes/Proyectos.jsx';
import { useAuth } from './Auth/AuthProvider.jsx';
import videoBg from './multimedia/videofondo.mp4';
import { Outlet, Link } from 'react-router-dom';
import './App.css';

export function App() {
  const auth = useAuth();
  const logeado = () => !!auth.login();

  const deslogeado = () => {
    auth.logout();
  };

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

  return (
    <div className='contenedorPrincipal'>
      <header>
        <nav className='navegador'>
          <div className='contenedor'>
            <div className='titulo'>Home Hub</div>
            <ul className='menu'>
              <li className='contPest'><a href='#seccion1' className='pestaña' onClick={handleClick}>Inicio</a></li>
              <li className='contPest'><a href='#seccion2' className='pestaña' onClick={handleClick}>Nosotros</a></li>
              <li className='contPest'><a href='#seccion3' className='pestaña' onClick={handleClick}>Servicios</a></li>
            </ul>
          </div>
          
          {logeado() === false && <div className='contenedor'>
            <ul className='menu'>
              <li className='contPest'><Link to="/Ingreso" className='pestaña' >Ingresar</Link></li>
              <li className='contPest'><Link to="/Registro" className='pestaña' >Registrarse</Link></li>
            </ul>
          </div>}
          
          {logeado() === true && <div className='contenedor'>
            <ul className='menu'>
              <li className='contPest'><Link to="/Miperfil" className='pestaña' >Mi perfil</Link></li>
              <li className='contPest'><Link to="/" className='pestaña' onClick={deslogeado}>Salir</Link></li>
            </ul>
          </div>}
        </nav>
        <Outlet />
      </header>

      <section className='SeccionHome' id='seccion1'>

        <section className='contenedorBienvenida'>
          <video src={videoBg} autoPlay loop muted className='videoHome'/>
          <div className='contenedorApertura'>
            <h1 className='tituloBienvenida'>¡Bienvenido a Home Hub!</h1>
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
            <Proyecto
              imagen='casa1'
              titulo='Casa en Venta'
              textos='En esta sección se muestran los proyectos que he 
              realizado en mi vida profesional y académica'
              precio='Por un precio de 120000000$'
            />
            <Proyecto
              imagen='casa2'
              titulo='Casa en Venta'
              textos='En esta sección se muestran los proyectos que he 
              realizado en mi vida profesional y académica'
              precio='Por un precio de 120000000$'
            />
            <Proyecto
              imagen='casa3'
              titulo='Casa en Venta'
              textos='En esta sección se muestran los proyectos que he 
              realizado en mi vida profesional y académica'
              precio='Por un precio de 120000000$'
            />
            <Proyecto
              imagen='casa4'
              titulo='Casa en Venta'
              textos='En esta sección se muestran los proyectos que he 
              realizado en mi vida profesional y académica'
              precio='Por un precio de 120000000$'
            />
            <Proyecto
              imagen='casa5'
              titulo='Casa en Venta'
              textos='En esta sección se muestran los proyectos que he 
              realizado en mi vida profesional y académica'
              precio='Por un precio de 120000000$'
            />
            <Proyecto
              imagen='casa6'
              titulo='Casa en Venta'
              textos='En esta sección se muestran los proyectos que he 
              realizado en mi vida profesional y académica'
              precio='Por un precio de 120000000$'
            />
          </div>
        </section>
        <p className='lineaH' style={{margin: '70px 0 0 0', border: '2px dashed #2c3e50'}}></p>
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
      <p className='lineaH' style={{border: '2px dashed #2c3e50'}}></p>
        <h1 className='tituloServicios'>Home Hub te ofrece Servicios como:</h1>
        <div className='contenedorServicios'>

          <div className='subcontenedorServicios'>
            <h1 className='subtituloServicio'>Compra de Propiedades</h1>
            <p className='parrafoServicios'>Home Hub facilita el proceso de compra de propiedades, 
            conectando a compradores con las mejores opciones del mercado. Nuestro equipo de expertos 
            en bienes raíces se encarga de evaluar y presentar propiedades que se ajusten a tus criterios 
            y necesidades.</p>
          </div>
          <div className='subcontenedorServicios'>
            <h1 className='subtituloServicio'>Venta de Propiedades</h1>
            <p className='parrafoServicios'>Si estás buscando vender tu propiedad, Home Hub ofrece 
            servicios de intermediación para maximizar la visibilidad de tu inmueble en el mercado. 
            Nos encargamos de promocionar tu propiedad, gestionar las negociaciones y cerrar acuerdos 
            beneficiosos para ti como vendedor.</p>
          </div>
          <div className='subcontenedorServicios'>
            <h1 className='subtituloServicio'>Gestion de Propiedades</h1>
            <p className='parrafoServicios'>Para propietarios que desean ofrecer sus propiedades sin 
            preocupaciones, ofrecemos servicios de gestión de propiedades. Esto incluye mantenimiento 
            del inmueble, coordinación de pagos y solución de problemas cotidianos, permitiendo a los 
            propietarios disfrutar de sus inversiones sin complicaciones.</p>
          </div>
          <div className='subcontenedorServicios'>
            <h1 className='subtituloServicio'>Asesoramiento Financiero</h1>
            <p className='parrafoServicios'>En Home Hub, entendemos que la inversión en bienes raíces 
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