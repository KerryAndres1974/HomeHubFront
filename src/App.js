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
          <h1>¡Bienvenido a Home Hub!</h1>
          <p>Hacemos realidad tus metas 
          inmobiliarias con profesionalismo y dedicación. ¡Encuentra propiedades que se adaptan a tu 
          estilo de vida!</p>
        </div>
      </section>
      <section className='contenedorPropiedades'>
        <p className='linea'></p>
        <h2>Proyectos para tu Familia</h2>
        <p className='linea'></p>
        
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
    </div>
  );
}

export default App;