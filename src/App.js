import Encabezado from './componentes/Encabezado.jsx';
import videoBg from './multimedia/videofondo.mp4';
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
          estilo de vida y objetivos!</p>
        </div>
      </section>
      <section className='contenedorPropiedades'>
        <h2>Proyectos para tu Familia</h2>
        <div className='contenedorProyectos'>
          
        </div>
      </section>
    </div>
  );
}

export default App;