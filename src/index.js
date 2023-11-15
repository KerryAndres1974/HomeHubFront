import React from 'react';
import ReactDOM from 'react-dom/client';
import Recuperar from './paginas/Recuperar.jsx';
import Servicios from './paginas/Servicios.jsx';
import Registro from './paginas/Registro.jsx';
import Nosotros from './paginas/Nosotros.jsx';
import Ingreso from './paginas/Ingreso.jsx';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ConRegistro from './paginas/ConRegistro.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/Nosotros',
    element: <Nosotros />,
  },
  {
    path: '/Servicios',
    element: <Servicios />,
  },
  {
    path: '/Ingreso',
    element: <Ingreso />,
  },
  {
    path: '/Registro',
    element: <Registro />,
  },
  {
    path: '/Recuperar',
    element: <Recuperar />,
  },
  {
    path: '/Registro/ConRegistro',
    element: <ConRegistro />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);