import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Mispublicaciones from './paginas/Mispublicaciones.jsx';
import Completarperfil from './paginas/Completarperfil.jsx';
import { AuthProvider } from './Auth/AuthProvider.jsx';
import Editarperfil from './paginas/Editarperfil.jsx';
import RutaProtegida from './RutasProtegidas.js';
import Recuperar from './paginas/Recuperar.jsx';
import Registro from './paginas/Registro.jsx';
import Publicar from './paginas/Publicar.jsx';
import Ingreso from './paginas/Ingreso.jsx';
import ReactDOM from 'react-dom/client';
import Editarinmueble from './paginas/Editarinmueble.jsx';
import React from 'react';
import App from './App';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
    path: '/',
    element: <RutaProtegida />,
    children: [
      {
        path: '/Editar-perfil',
        element: <Editarperfil />,
      },
      {
        path: '/Completar-perfil',
        element: <Completarperfil />,
      },
      {
        path: '/Publicar-inmueble',
        element: <Publicar />,
      },
      {
        path: '/Editar-inmueble/:idProyecto',
        element: <Editarinmueble />,
      },
      {
        path: '/Mis-publicaciones',
        element: <Mispublicaciones />,
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