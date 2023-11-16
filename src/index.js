import React from 'react';
import ReactDOM from 'react-dom/client';
import Recuperar from './paginas/Recuperar.jsx';
import Servicios from './paginas/Servicios.jsx';
import Registro from './paginas/Registro.jsx';
import Nosotros from './paginas/Nosotros.jsx';
import Ingreso from './paginas/Ingreso.jsx';
import Miperfil from './paginas/Miperfil.jsx';
import RutaProtegida from './RutasProtegidas.js';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ConRegistro from './paginas/ConRegistro.jsx';
import { AuthProvider } from './Auth/AuthProvider.jsx';

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
  {
    path: '/',
    element: <RutaProtegida />,
    children: [
      {
        path: '/Miperfil',
        element: <Miperfil />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);