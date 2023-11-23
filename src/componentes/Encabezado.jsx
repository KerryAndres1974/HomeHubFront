import '../hojasEstilos/Encabezado.css';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider.jsx';

function Encabezado() {
    const auth = useAuth();

    const logeado = () => {
        if (auth.Estalogeado === true) {
            return true;
        } else {
            return false;
        }
    }

    return <header>
        <nav className='navegador'>
            <div className='contenedor'>
                <div className='titulo'>Home Hub</div>
                <ul className='menu'>
                    <li className='pestaña' ><Link to="/" >Inicio</Link></li>
                    <li className='pestaña' ><Link to="/Nosotros" >Nosotros</Link></li>
                    <li className='pestaña' ><Link to="/Servicios" >Servicios</Link></li>
                </ul>
            </div>
            
            {logeado() === false && <ul className='contenedor'>
                <li><Link to="/Ingreso" className='pestaña' >Ingresar</Link></li>
                <li><Link to="/Registro" className='pestaña' >Registrarse</Link></li>
            </ul>}

            {logeado() === true && <ul className='contenedor'>
                <li><Link to="/Miperfil" className='pestaña' >Mi perfil</Link></li>
            </ul>}
        </nav>
        <Outlet />
    </header>;
}

export default Encabezado;