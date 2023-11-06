import { Routes, Route, Outlet } from 'react-router-dom';
import Servicios from './paginas/Servicios.jsx';
import Registro from './paginas/Registro.jsx';
import Nosotros from './paginas/Nosotros.jsx';
import Ingreso from './paginas/Ingreso.jsx';
import Home from './paginas/Home.jsx';
import './App.css';

export function App() {
  return (
    <Routes>
      <Route path='/' element={<Outlet />}>
        <Route index element={<Home />}></Route>
        <Route path='Nosotros' element={<Nosotros />}></Route>
        <Route path='Servicios' element={<Servicios />}></Route>
        <Route path='Ingreso' element={<Ingreso />}></Route>
        <Route path='Registro' element={<Registro />}></Route>
      </Route>
    </Routes>
  );
}

export default App;