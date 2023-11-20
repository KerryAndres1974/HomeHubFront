import Encabezado from './componentes/Encabezado.jsx';
import videoBg from './multimedia/videofondo.mp4';
import Proyecto from './componentes/Proyectos.jsx';
import './App.css';

export function App() {
  return (
    <div className='Página-Home'>
      <Encabezado />
      <video src={videoBg} autoPlay loop muted />

      <section className='contenedorApertura'>
        <div className='contenedor1'>
          <h1 className='textoBienvenida'>¡Bienvenido a Home Hub!</h1>
          <p className='textoApp'>Hacemos realidad tus metas 
          inmobiliarias con profesionalismo y dedicación. ¡Encuentra propiedades que se adaptan a tu 
          estilo de vida!</p>
        </div>
      </section>

      <section className='contenedorPropiedades'>
        <br/><p className='lineaH'></p>
        <h2 className='textoProyectos'>Proyectos para tu Familia</h2>
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