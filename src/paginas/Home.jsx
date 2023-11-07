import Encabezado from '../componentes/Encabezado.jsx';
import '../App.css';

function Home() {
  return (
    <div>
      <Encabezado />
        <div className='InicioLobby'>
          <h1>Bienvenido</h1>
        </div>  
    </div>
  );
}

export default Home;