import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Clientes from './pages/Clientes';

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import { isAuthenticated, logout } from './service/AuthService';

import { useState } from 'react';
import NovoCliente from './pages/NovoCliente';
import TiposProcesso from './pages/TiposProcesso';
import NovoTipoProcesso from './pages/NovoTipoProcesso';
import Processos from './pages/Processos';
import NovoProcesso from './pages/NovoProcesso';


function App() {
  const [isLogged, setIsLogged] = useState(isAuthenticated);

  // logout()

  const routes = createBrowserRouter([
    {path:"/", element: isLogged ? <Navigate to="/clientes" replace={true} /> : <Navigate to="/login" replace={true} /> },
    {path:"/login", element: !isLogged ? <Login/> : <Navigate to="/" replace={true} /> },
    {path:"/clientes", element: isLogged ? <Clientes /> : <Navigate to="/login" replace={true} />},
    {path: "/novo_cliente", element: isLogged ? <NovoCliente /> : <Navigate to="/login" replace={true} />},
    {path: "/tipos_processo", element: isLogged ? <TiposProcesso /> : <Navigate to="/login" replace={true} /> },
    {path: "/novo_tipo_processo", element: isLogged ? <NovoTipoProcesso /> : <Navigate to="/login" replace={true} />},
    {path: "/processos", element: isLogged ? <Processos /> : <Navigate to="/login" replace={true} />},
    {path: "/novo_processo", element: isLogged ? <NovoProcesso /> : <Navigate to="/login" replace={true} />}
  ])

  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}

export default App
