import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './Auth/AuthProvider.jsx';
import RutaProtegida from './RutasProtegidas.js';
import Recuperar from './paginas/Recuperar.jsx';
import Miperfil from './paginas/Miperfil.jsx';
import Registro from './paginas/Registro.jsx';
import Ingreso from './paginas/Ingreso.jsx';
import ReactDOM from 'react-dom/client';
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