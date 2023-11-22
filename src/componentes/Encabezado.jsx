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
                    <li className='contPest'><Link to="/" className='pestaña' >Inicio</Link></li>
                    <li className='contPest'><Link to="/Nosotros" className='pestaña' >Nosotros</Link></li>
                    <li className='contPest'><Link to="/Servicios" className='pestaña' >Servicios</Link></li>
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
                </ul>
            </div>}
        </nav>
        <Outlet />
    </header>;
}

export default Encabezado;