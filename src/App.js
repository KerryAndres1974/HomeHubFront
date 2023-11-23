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
        <video src={videoBg} autoPlay loop muted />

        <section className='contenedorBienvenida'>
          <div className='contenedorApertura'>
            <h1 className='tituloBienvenida'>¡Bienvenido a Home Hub!</h1>
            <p className='textoBienvenida'>Hacemos realidad tus metas 
            inmobiliarias con profesionalismo y dedicación.<br/>¡Encuentra propiedades que se adaptan a tu 
            estilo de vida!</p>
          </div>
        </section>

        <section className='contenedorPropiedades'>
          <br/><p className='lineaH'></p>

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
      </section>

      <section className='SeccionNosotros' id='seccion2'></section>

      <section className='SeccionServicios' id='seccion3'></section>

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