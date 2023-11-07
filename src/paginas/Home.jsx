import Encabezado from '../componentes/Encabezado.jsx';
import '../App.css';

function Home() {
  return (
    <div>
      <Encabezado />
        <div className='InicioLobby'>
          <h1>Pagina de Inicio</h1>
        </div>  
    </div>
  );
}

export default Home;