import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './pages/Error'
import Home from './pages/Home'
import About from './pages/About'
import Register from './pages/Register'
import Login from './pages/Login'

import './App.css'
import Cars from './pages/Cars'

function App() {
  const router = createBrowserRouter([{
    path: "/",
    element: <Home />,
    errorElement: <Error />,
    
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/cars",
    element: <Cars />,
    errorElement: <Error />,
  },

])
  return (
    <>
    <RouterProvider router= {router} />
    </>
  )
}

export default App
