import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import { isAuthenticated, logout } from './service/AuthService';

import { useState } from 'react';


function App() {
  const [isLogged, setIsLogged] = useState(isAuthenticated);

  // logout()

  const routes = createBrowserRouter([
    {path:"/", element: isLogged ? <Home/> : <Navigate to="/login" replace={true} /> },
    {path:"/login", element: !isLogged ? <Login/> : <Navigate to="/" replace={true} /> }
  ])

  return (
    <RouterProvider router={routes}></RouterProvider>
  )
}

export default App
